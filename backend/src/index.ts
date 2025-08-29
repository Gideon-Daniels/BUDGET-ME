import express from 'express';

const app = express();

app.get('/', (req, res) => {
  console.log(req.method);
  console.log('hello');
  res.json({ message: 'hello' });
});

app.listen(300);
