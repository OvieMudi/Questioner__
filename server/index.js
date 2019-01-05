import express from 'express';
import bodyParser from 'body-parser';
import usersRouter from './api/v1/users';
import meetupsRouter from './api/v1/meetups';
import questionsRouter from './api/v1/questions';

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.text());
app.use('/', usersRouter);
app.use('/', meetupsRouter);
app.use('/', questionsRouter);

app.get('/', (req, res) => {
  res.send('ROOT');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`I'M LIVE ON PORT ${port}`);
});

export default app;
