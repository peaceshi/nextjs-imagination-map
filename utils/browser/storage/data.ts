/**
 * localforage data
 * @url https://localforage.github.io/localForage/#data-api
 */
import localforage from "localforage";
/**
 * getItem
 * @description Gets an item from the storage library and supplies the result to a callback.
 *
 * **If the key does not exist, `getItem()` will return `null` always.**
 * @param key
 */
export const getItem = async (key: string): Promise<unknown> => {
  try {
    const value = await localforage.getItem(key);
    console.debug(value);
    return value;
  } catch (error) {
    console.error(error);
  }
};
type BaseItem = string | number | boolean | object | null;
type IterableItem = Iterable<[]>;
type BlobItem = Blob;
/**
 * setItem
 * @description Saves data to an offline store.
 *
 * When using localStorage and WebSQL backends, binary data will be serialized before being saved (and retrieved).
 *  This serialization will incur a size increase when binary data is saved.
 * @param key
 * @param value
 */
export const setItem = async (key: string, value: BaseItem | IterableItem | BlobItem) => {
  try {
    await localforage.setItem(key, value);
    console.debug(value);
  } catch (error) {
    console.error(error);
  }
};
/**
 * removeItem
 * @description Removes the value of a key from the offline store.
 * @param key
 */
export const removeItem = async (key: string) => {
  try {
    await localforage.removeItem(key);
    console.debug(`${key} is cleared!`);
  } catch (error) {
    console.error(error);
  }
};
/**
 * clearStorage
 * @description Removes every key from the database, returning it to a blank slate.
 *
 * **`localforage.clear()` will remove every item in the offline store. Use this method with caution.**
 */
export const clearStorage = async () => {
  try {
    await localforage.clear();
    console.debug("All data is cleared!");
  } catch (error) {
    console.error(error);
  }
};
/**
 * getNumberOfKeys
 * @description Gets the number of keys in the offline store.
 **/
export const getNumberOfKeys = async () => {
  try {
    const length = await localforage.length();
    console.debug(length);
    return length;
  } catch (error) {
    console.error(error);
  }
};
/**
 * getKeyNameByIndex
 * @description Get the name of a key based on its ID.
 * @param index
 */
export const getKeyNameByIndex = async (index: number) => {
  try {
    const key = await localforage.key(index);
    console.debug(key);
    return key;
  } catch (error) {
    console.error(error);
  }
};
/**
 * getKeyNames
 * @description Get an array of all the names of the keys in the offline store.
 * @returns `Promise<string[]>`
 */
export const getKeyNames = async () => {
  try {
    const keys = await localforage.keys();
    console.debug(keys);
    return keys;
  } catch (error) {
    console.error(error);
  }
};
/**
 * iterator
 * @description Iterate over all value/key pairs in datastore.
 * @param iteratee function
 */
export const iterator = async <T>(
  iteratee: (value: unknown, key: string, iterationNumber: number) => T
): Promise<Awaited<T> | undefined> => {
  try {
    const iterator = await localforage.iterate((value, key, iterationNumber) => {
      return iteratee(value, key, iterationNumber);
    });
    console.debug(iterator);
    return iterator;
  } catch (error) {
    console.error(error);
  }
};
