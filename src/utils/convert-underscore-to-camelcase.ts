import humps from 'humps';

export const convertUnderscoreToCamelcase = <T>(data: unknown): T => {
  return humps.camelizeKeys(data) as T;
};
