export function findNullIndexes(arr: (null | any)[]): number[] {
  return arr.reduce((indexes: number[], item, index) => {
    if (item === null) {
      indexes.push(index);
    }
    return indexes;
  }, []);
}
