const psqlArray = (string = '') => {
  // eslint-disable-next-line no-unused-vars
  let pArr = '{';
  const stringArr = string.toString().split(', ');
  const len = stringArr.length - 1;
  stringArr.forEach((el, idx) => {
    pArr += idx < len ? `${el}, ` : `${el}}`;
  });
  return pArr;
};

export default psqlArray;
