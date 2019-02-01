export default {
  successResponse(res = {}, status = 200, data) {
    if (data === 'user deleted') {
      return res.status(status).json({
        status, message: data,
      });
    }
    return res.status(status).json({
      status, data,
    });
  },

  errorResponse(res = {}, status = 200, error) {
    return res.status(status).json({
      status, error,
    });
  },
};
