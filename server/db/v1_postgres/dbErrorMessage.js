const dbErrorMessage = (error) => {
  if (!error) return new Error('Oops! Something weird happened.');
  return new Error(error.detail);
};

export default dbErrorMessage;
