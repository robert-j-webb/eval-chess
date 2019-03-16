import express from 'express';
import path from 'path';

const port: number = parseInt(process.env.port || '', 10) || 3001;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// define a route handler for the default home page
app.get('/', async (req, res) => {
  // render the index template
  const h: string = 'a' + 2;
});

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});

export default app;
