import { app } from './app';

let server = app.listen(process.env.PORT || 8000, () => {
  console.log(`Listening on port: ${server.address().port}`);
})
