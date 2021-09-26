export const getGenerationSlices = (generationName: string) => {
  let startSlice = 0;
  let endSlice = 0;

  switch (generationName) {
    case 'generation-i':
      endSlice = 151;
      break;

    case 'generation-ii':
      startSlice = 152;
      endSlice = 251;
      break;

    case 'generation-iii':
      startSlice = 252;
      endSlice = 386;
      break;

    case 'generation-iv':
      startSlice = 387;
      endSlice = 493;
      break;

    case 'generation-v':
      startSlice = 494;
      endSlice = 649;
      break;

    case 'generation-vi':
      startSlice = 650;
      endSlice = 721;
      break;

    case 'generation-vii':
      startSlice = 722;
      endSlice = 802;
      break;

    case 'generation-viii':
      startSlice = 803;
      endSlice = 898;
      break;
  }

  return { startSlice, endSlice };
};
