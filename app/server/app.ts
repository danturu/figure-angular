import * as express from 'express'
import * as handlebars from 'express-handlebars'

export const app = express();

// Views

app.engine('.hbs', handlebars.create({ extname: '.hbs', layoutsDir: './app/server/views', defaultLayout: 'static' }).engine);

app.set('view engine', '.hbs');
app.set('views', './app/server/views');

// Helpers

app.locals = {
  development: app.get('env') === 'development'
};

// Assets

['./dist/public', './dist/client'].forEach(path => {
  app.use('/assets', express.static(path));
});

if (app.get('env') === 'development') {
  app.use('/node_modules', express.static('./node_modules'));
}

// Routes

import { router } from './config/routes'

app.use('/', router);
