/**
 *
 * @param array Source array
 * @param currentPage 0 based. First page is 0
 * @param pageLength Amounts of items per page
 */
export function paginate<T>(
  array: T[],
  currentPage: number,
  pageLength: number
): T[] {
  const startPage = currentPage * pageLength;
  const endPage = currentPage * pageLength + pageLength;
  return array.slice(startPage, endPage);
}

/**
 * Joins an array with ", " with a special feature that when
 * there exists > 3 elements then it appends a "etc..." if not then
 * just end it there.
 * @param arr array of strings that will be formated in a certain way
 * @returns
 */
export function arrayToStringList(arr: string[]) {
  return arr.reduce((str, current, i, arr) => {
    if (i === 2)
      return str + (i + 1 < arr.length ? `${current}, etc...` : `${current}`);
    if (i > 2) return str;
    return str + (i + 1 < arr.length ? `${current}, ` : `${current}`);
  }, "");
}
