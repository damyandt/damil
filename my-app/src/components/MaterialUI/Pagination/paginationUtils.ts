export function getCurrentPageItems<T>(
  array: T[],
  currentPage: number,
  itemsPerPage: number
): T[] {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  return array.slice(startIndex, endIndex);
}
