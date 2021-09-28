export const getGenerationSlices = (generationName: string) => {
  let startSlice = 0;
  let endSlice = 0;

  switch (generationName) {
    case 'generation-i':
      endSlice = 151;
      break;

    case 'generation-ii':
      startSlice = 151;
      endSlice = 251;
      break;

    case 'generation-iii':
      startSlice = 251;
      endSlice = 386;
      break;

    case 'generation-iv':
      startSlice = 386;
      endSlice = 493;
      break;

    case 'generation-v':
      startSlice = 493;
      endSlice = 649;
      break;

    case 'generation-vi':
      startSlice = 649;
      endSlice = 721;
      break;

    case 'generation-vii':
      startSlice = 721;
      endSlice = 802;
      break;

    case 'generation-viii':
      startSlice = 802;
      endSlice = 898;
      break;
  }

  return { startSlice, endSlice };
};
