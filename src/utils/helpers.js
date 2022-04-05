import omitDeep from 'omit-deep';

export const omit = (object, name) => {
    return omitDeep(object, name);
};