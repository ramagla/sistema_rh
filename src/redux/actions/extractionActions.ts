export const extractFile = (fileName: string) => {
  return {
    type: 'EXTRACT_FILE',
    payload: `Dados extraídos do arquivo: ${fileName}`,
  };
};
