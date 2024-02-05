// ref: https://lodash.com/docs/#chunk
export const chunk = (array: any[], size = 1) => {
  const result: any[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
