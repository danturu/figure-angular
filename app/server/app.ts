/// <reference path='../../lib/typings/bundle.d.ts' />

import * as express from "express"

let app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default app;
