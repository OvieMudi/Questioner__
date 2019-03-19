import MainController from './mainController';
import questionsModel from '../models/questionsModel';
import meetupsModel from '../models/meetupsModel';
import usersModel from '../models/usersModel';

class QuestionsController extends MainController {
  constructor(name = '', model = {}) {
    super(name, model);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }

  async create(req, res) {
    try {
      const meetup = await meetupsModel.getOne(req.body.meetup);
      if (!meetup) return this.errorResponse(res, 400, "meetup you're trying to comment on does not exist");
      const user = await usersModel.getOne(req.user.id);
      req.body.authorName = user.username;

      const row = await this.model.create(req.body);
      return this.successResponse(res, 201, row);
    } catch (error) {
      return this.errorResponse(res, 400, error.message);
    }
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
