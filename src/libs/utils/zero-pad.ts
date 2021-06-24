const zeroPad = (id: number, places: number) => {
  return String(id).padStart(places, '0');
};

export { zeroPad };
