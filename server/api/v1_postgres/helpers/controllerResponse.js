export default {
  successResponse(res = {}, status = 200, data = {}) {
    return res.status(status).json({
      status,
      data,
    });
  },

  errorResponse(res = {}, status = 400, error = '') {
    return res.status(status).json({
      status,
      error,
    });
  },
};
