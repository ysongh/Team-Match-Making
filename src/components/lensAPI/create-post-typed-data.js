import { utils, ethers } from 'ethers';
import { gql } from '@apollo/client';

import { apolloClient } from './apollo-client';
import { omit } from '../../utils/helpers';
import { LENS_HUB_ABI } from '../../utils/abis';

const LENS_HUB_CONTRACT = "0xd7B3481De00995046C7850bCe9a5196B7605c367";

const CREATE_POST_TYPED_DATA = `
  mutation($request: CreatePublicPostRequest!) { 
    createPostTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
            name
            type
          }
        }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        collectModule
        collectModuleInitData
        referenceModule
        referenceModuleInitData
      }
    }
   }
 }
`

export const createPostTypedData = (createPostTypedDataRequest) => {
   return apolloClient.mutate({
    mutation: gql(CREATE_POST_TYPED_DATA),
    variables: {
      request: createPostTypedDataRequest
    },
  })
}

export const createPost = async (signer, profileId) => {
  const signedTypeData = async (domain, types, value) => {
    return await signer._signTypedData(
      omit(domain, '__typename'),
      omit(types, '__typename'),
      omit(value, '__typename')
    );
  };

  const createPostRequest = {
    profileId: profileId,
    contentURI: "ipfs://QmZJTaXfWxRVX33drEYHjKUksrahFdzgZ5pevd94sskLwn.json",
    collectModule: {
      // For more info about post modules:
      // https://docs.lens.dev/docs/create-post-typed-data
      //
      // feeCollectModule: {
      //   amount: {
      //     currency: currencies.enabledModuleCurrencies.map(
      //       (c: any) => c.address
      //     )[0],
      //     value: '0.000001',
      //   },
      //   recipient: address,
      //   referralFee: 10.5,
      // },
      //
      // The Revert module works by disallowing all collects.
      // If someone tried to collect from the contract level, it would throw and revert.
      revertCollectModule: true,
    },
    referenceModule: {
      followerOnlyReferenceModule: false,
    },
  };

  const result = await createPostTypedData(createPostRequest);
  console.log('create post: createPostTypedData', result);

  const typedData = result.data.createPostTypedData.typedData;
  console.log('create post: typedData', typedData);

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value
  );
  console.log('create post: signature', signature);

  const splitSignature = signature => {
    return utils.splitSignature(signature);
  };

  const { v, r, s } = splitSignature(signature);

  const lensHub = new ethers.Contract(
    LENS_HUB_CONTRACT,
    LENS_HUB_ABI,
    await signer
  );

  const tx = await lensHub.postWithSig({
    profileId: typedData.value.profileId,
    contentURI: typedData.value.contentURI,
    collectModule: typedData.value.collectModule,
    collectModuleData: typedData.value.collectModuleData,
    referenceModule: typedData.value.referenceModule,
    referenceModuleData: typedData.value.referenceModuleData,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  console.log('create post: tx hash', tx.hash);
  return tx.hash;
};