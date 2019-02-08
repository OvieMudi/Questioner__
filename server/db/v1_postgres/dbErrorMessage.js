const dbErrorMessage = (err) => {
  if (err.code === '23502') return new Error(err.message);
  if (err.code === '23505') return new Error(err.detail);
  return new Error('Oops! Something weird happened.');
};

export default dbErrorMessage;
