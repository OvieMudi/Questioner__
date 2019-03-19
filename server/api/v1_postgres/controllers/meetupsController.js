import MainController from './mainController';
import meetupsModel from '../models/meetupsModel';

class MeetupsController extends MainController {
  constructor(name = '', model = {}) {
    super(name, model);
    this.createRsvp = this.createRsvp.bind(this);
    this.getAllRsvps = this.getAllRsvps.bind(this);
  }

  async getAll(req, res) {
    if (req.query.scope === 'upcoming') {
      try {
        const rows = await this.model.getUpcoming();
        this.successResponse(res, 200, rows);
      } catch (error) {
        this.errorResponse(res, 500, error.message);
      }
    } else {
      try {
        const rows = await this.model.getAll();
        this.successResponse(res, 200, rows);
      } catch (error) {
        this.errorResponse(res, 500, error.message);
      }
    }
  }

  async createRsvp(req, res) {
    try {
      const row = await this.model.createRsvp(req);
      this.successResponse(res, 201, row);
    } catch (err) {
      this.errorResponse(res, 400, err.message);
    }
  }

  async getAllRsvps(req, res) {
    try {
      const rows = await this.model.getAllRsvps(req.params.id);
      this.successResponse(res, 200, rows);
    } catch (err) {
      this.errorResponse(res, 500, err.message);
    }
  }
}
const meetupsController = new MeetupsController('meetup', meetupsModel);

export default meetupsController;
