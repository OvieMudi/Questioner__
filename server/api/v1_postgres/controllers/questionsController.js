import MainController from './mainController';
import questionsModel from '../models/questionsModel';


class QuestionsController extends MainController {
  constructor(name = '', model = {}) {
    super(name, model);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }

  async upvote(req, res) {
    try {
      const upvote = await this.model.upvote(req.params.id);
      if (!upvote) return this.errorResponse(res, 404, `${this.name} does not exist`);
      return this.successResponse(res, 200, upvote);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return this.errorResponse(res, 500, err.message);
    }
  }

  async downvote(req, res) {
    try {
      const downvote = await this.model.downvote(req.params.id);
      if (!downvote) return this.errorResponse(res, 404, `${this.name} does not exist`);
      return this.successResponse(res, 200, downvote);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return this.errorResponse(res, 500, err.message);
    }
  }
}


const questionsController = new QuestionsController('question', questionsModel);

export default questionsController;
