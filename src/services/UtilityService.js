const replaceNullWithEmptyString = data => {
  Object.keys(data).forEach(p => {
    if (data[p] === null) {
      data[p] = "";
    }
  });
};

const replaceEmptyStringsWithNull = data => {
  Object.keys(data).forEach(p => {
    if (data[p] === "") {
      data[p] = null;
    }
  });
};

export { replaceEmptyStringsWithNull, replaceNullWithEmptyString };
