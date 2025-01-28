import { getGenerations } from 'src/services/generations';
import { capitalize } from 'src/utils/capitalize';
import useSWR from 'swr';

export function useGenerations() {
  const { data, isLoading } = useSWR(`generations`, () => getGenerations());

  function formatGenerationName(name: string) {
    const template = new RegExp('^generation-.+$');

    if (!template.test(name)) {
      console.error('Invalid generation name', name);
      return 'Generation-???';
    }

    const [label, generationNumber] = name.split('-');

    return `${capitalize(label)} ${generationNumber.toUpperCase()}`;
  }

  return {
    generations: data,
    areGenerationsLoading: isLoading,
    formatGenerationName,
  };
}
