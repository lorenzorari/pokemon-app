import humps from 'humps';

export const convertUnderscoreToCamelcase = (data: any) => {
  return humps.camelizeKeys(data);
};
