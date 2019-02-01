import app from 'express';

// ===== Data Structure Routes (DS) ====
// import usersRoutesDS from './v1/routes/users';
import meetupsRoutesDS from './v1/routes/meetups';
import questionsRoutesDS from './v1/routes/questions';

// Postgres Database Routes
import usersRoute from './v1_postgres/routes/users';

const Router = app.Router();

Router.use('/users', usersRoute);
Router.use('/meetups', meetupsRoutesDS);
Router.use('/questions', questionsRoutesDS);


Router.get('/', (req, res) => res.status(200).json({
  status: 200, message: 'Welcome to Questioner API',
}));

export default Router;
