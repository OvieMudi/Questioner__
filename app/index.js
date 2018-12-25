import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('ROOT');
});

app.listen(port, () => {
  console.log(`I'M LIVE ON PORT ${port}`);
});
