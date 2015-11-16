import * as express from 'express'

export const router = express.Router();

router.use((req, res, next) => {
  if (req.path.startsWith('/assets')) {
    res.status(404).send(`Cannot GET ${req.path}`)
  } else {
    next()
  }
});

router.get('/home', (req, res) =>
  res.render('pages/home')
);

router.get("/*", (req, res) =>
  res.render('app', { layout: false })
);
