export default class ArrayUtil {

  static find(array, compare) {
    for (const index in array) {
      if (compare(array[index], index, array)) {
        return { index, value: array[index] };
      }
    }
    return { index: null, value: null };
  }

}
