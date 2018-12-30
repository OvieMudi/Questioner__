import express from 'express';
import bodyParser from 'body-parser';
import router from './api/v1/users';

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

app.get('/', (req, res) => {
  res.send('ROOT');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`I'M LIVE ON PORT ${port}`);
});

export default app;
