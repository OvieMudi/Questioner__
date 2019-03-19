import app from 'express';

// ===== Data Structure Routes (DS) ====
// import usersRoutesDS from './v1/routes/users';
// import meetupsRoutesDS from './v1/routes/meetups';
// import questionsRoutesDS from './v1/routes/questions';

// Postgres Database Routes
import usersRoute from './v1_postgres/routes/users';
import meetupsRoute from './v1_postgres/routes/meetups';
import questionsRoute from './v1_postgres/routes/questions';
import authRoute from './v1_postgres/routes/auth';


const Router = app.Router();

Router.use('/auth', authRoute);
Router.use('/users', usersRoute);
Router.use('/meetups', meetupsRoute);
Router.use('/questions', questionsRoute);


Router.get('/', (req, res) => res.status(200).json({
  status: 200, message: 'Welcome to Questioner API',
}));

export default Router;
