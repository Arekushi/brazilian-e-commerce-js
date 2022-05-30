export const clean = (obj: any) => {
    Object.entries(obj).forEach(([key, val])  =>
      (val && typeof val === 'object') && clean(val) ||
      (val === null || val === '' || val === undefined) && delete obj[key]
    );

    return obj;
};

export const keys = (obj: any) => {
  return Object.entries(obj).map(([key, value]) => {
    if (value instanceof Object) {
      return keys(value);
    }

    return { key, value };
  });
};

/*
* Recursively merge properties of two objects
*/
export const merge = (target: any, source: any) => {
  for (const key of Object.keys(source)) {
    try {
      if (source[key] instanceof Object) {
        target[key] = merge(target[key], source[key]);
      } else if (!target[key]) {
        target[key] = source[key];
      }
    } catch (e) {
      target[key] = source[key];
    }
  }

  return target;
};
