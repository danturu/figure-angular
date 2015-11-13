import * as express from 'express'

let router = express.Router();

export default router

router.get('/home', (req, res) =>
  res.render('pages/home')
);

router.get("/*", (req, res) =>
  res.render('app', { layout: false })
);
