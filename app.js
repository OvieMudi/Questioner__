/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import apiRouter from './server/api/apiRouter';


const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.text());
app.use('/api/v1', apiRouter);


app.get('/', (req, res) => res.status(200)
  .send('<h1>WELCOME TO QUESTIONER!</h1> Please explore the api routes!'));


app.listen(port, () => {
  console.log(`I'M LIVE ON PORT ${port}`);
});

export default app;
