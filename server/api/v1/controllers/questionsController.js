import Questions from '../helpers/questions';

class questionsController {
  /**
   * Create new question object in db
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {JSON} - custom server response with error/success
   */
  static postQuestion(req, res) {
    try {
      const question = Questions.createQuestion(req.body);
      return res.status(201).json({
        status: 201, data: [question],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400, error: error.message,
      });
    }
  }

  /**
   * Get all questions objects in db
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {JSON} - custom server response with error/success
   */
  static getQuestions(req, res) {
    const questions = Questions.getQuestions();
    return res.status(200).json({
      status: 200, data: questions,
    });
  }

  /**
   * Get one question objects in db
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {JSON} - custom server response with error/success
   */
  static getQuestion(req, res) {
    const question = Questions.getQuestion(req.params.id);
    if (!question) {
      return res.status(404).json({
        status: 200, error: 'question does not exist',
      });
    }
    return res.status(200).json({
      status: 200, data: [question],
    });
  }

  /**
   * Update a question object in database using a unique id
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {JSON} - custom server response with error/success
   */
  static updateQuestion(req, res) {
    try {
      const updatedQuestion = Questions.updateQuestion(req.params.id, req.body);
      if (!updatedQuestion) {
        return res.status(404).json({
          status: 404, error: 'question does not exist',
        });
      }
      return res.status(200).json({
        status: 200, data: [updatedQuestion],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400, error: error.message,
      });
    }
  }

  /**
   * Delete a question object from db
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {JSON} - custom server response with error/success
   */
  static deleteQuestion(req, res) {
    const deleted = Questions.deleteQuestion(req.params.id);
    if (!deleted) {
      res.status(404).json({
        status: 404, error: 'question does not exist',
      });
    }
    return res.status(200).json({
      status: 200, message: 'question deleted',
    });
  }

  /**
   * Increment votes of a question object
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {JSON} - custom server response with error/success
   */
  static upvoteQuestion(req, res) {
    const upvoted = Questions.upvoteQuestion(req.params.id);
    if (!upvoted) {
      return res.status(404).json({
        status: 404, error: 'question does not exist',
      });
    }
    return res.status(200).json({
      status: 200, data: [upvoted],
    });
  }

/**
   * Decrement votes of a question object
   * @param {Object} req - server request
   * @param {Object} res - server response
   * @returns {JSON} - custom server response with error/success
   */
  static downvoteQuestion(req, res) {
    const downvoted = Questions.downvoteQuestion(req.params.id);
    if (!downvoted) {
      return res.status(404).json({
        status: 404, error: 'question does not exist',
      });
    }
    return res.status(200).json({
      status: 200, data: [downvoted],
    });
  }
}

export default questionsController;
