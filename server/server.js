import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '..', 'build')));

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
