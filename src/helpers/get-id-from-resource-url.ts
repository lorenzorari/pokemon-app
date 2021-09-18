export const getIdFromResourceUrl = (url: string) => {
  return +url.split('/').slice(-2)[0];
};
