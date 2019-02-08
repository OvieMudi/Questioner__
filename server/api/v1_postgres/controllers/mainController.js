import response from '../helpers/controllerResponse';

class Controller {
  constructor(name = '', model = {}) {
    this.name = name;
    this.model = model;
    this.successResponse = response.successResponse;
    this.errorResponse = response.errorResponse;
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      const row = await this.model.create(req.body);
      this.successResponse(res, 201, row);
    } catch (error) {
      this.errorResponse(res, 400, error.message);
    }
  }

  async getAll(req, res) {
    try {
      const rows = await this.model.getAll();
      this.successResponse(res, 200, rows);
    } catch (error) {
      this.errorResponse(res, 500, error.message);
    }
  }

  async getOne(req, res) {
    try {
      const row = await this.model.getOne(req.params.id);
      if (!row) return this.errorResponse(res, 404, `${this.name} does not exist`);
      return this.successResponse(res, 200, row);
    } catch (error) {
      return this.errorResponse(res, 500, error.message);
    }
  }

  async update(req, res) {
    try {
      const row = await this.model.update(req.params.id, req.body);
      if (!row) return this.errorResponse(res, 404, `${this.name} does not exist`);
      return this.successResponse(res, 200, row);
    } catch (error) {
      return this.errorResponse(res, 500, error.message);
    }
  }

  async delete(req, res) {
    try {
      const deleted = await this.model.delete(req.params.id);
      if (!deleted) return this.errorResponse(res, 404, `${this.name} does not exist`);
      return this.successResponse(res, 200, `${this.name} deleted`);
    } catch (err) {
      return this.errorResponse(res, 500, err.message);
    }
  }
}

export default Controller;
