const deepEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true; // Same reference or primitive values
  if (obj1 == null || obj2 == null) return false; // One is null or undefined
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false; // Different types

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false; // Different number of keys

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
};

export default deepEqual;

