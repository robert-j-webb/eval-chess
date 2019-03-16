import express from 'express';
import path from 'path';

const port: number = parseInt(process.env.port || '', 10) || 3001;
const app = express();

app.get('/', async (req, res) => {
  // render the index template
});

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});

export default app;
