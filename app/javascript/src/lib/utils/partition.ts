/**
 * Partitions an array of items into an object with keys based on the result of the where function
 *
 * @param items an array of items to partition
 * @param where a function that returns a key for each item
 * @returns an object with keys based on the result of the where function
 */
export const partition = <T>(
  items: T[],
  where: (item: T) => number | string,
) => {
  return items.reduce(
    (acc, item) => {
      let key = where(item);
      (acc[key] = acc[key] || []).push(item);

      return acc;
    },
    {} as Record<string | number, T[]>,
  );
};
