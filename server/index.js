import express from 'express';
import bodyParser from 'body-parser';
import usersRouter from './api/v1/routes/users';
import meetupsRouter from './api/v1/routes/meetups';
import questionsRouter from './api/v1/routes/questions';

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.text());
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/meetups', meetupsRouter);
app.use('/api/v1/questions', questionsRouter);

app.get('/', (req, res) => {
  res.send('WELCOME TO QUESTIONER! Please explore the api routes!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`I'M LIVE ON PORT ${port}`);
});

export default app;
