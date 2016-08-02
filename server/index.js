import path from 'path';
import express from 'express';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(`${__dirname}../public`));
app.get('/assets/:name', (req, res) => {
  const options = {
    root: `${__dirname}/../public/assets/`,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };
  res.sendFile(req.params.name, options);
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, '0.0.0.0', (err) => {
  if (err) console.log(err);

  console.info(`Listening on ${port} port`);
});
