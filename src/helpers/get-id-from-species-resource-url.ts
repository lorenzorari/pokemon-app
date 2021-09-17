export const getIdFromSpeciesResourceUrl = (url: string) => {
  return +url.split('/').slice(-2)[0];
};
