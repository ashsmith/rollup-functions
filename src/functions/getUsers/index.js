import express from 'express';
import helpme from '../../helper/helpme';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  helpme();
  return res.send('Hello World!')
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))