/// <reference path='../../lib/typings/bundle.d.ts' />

import * as express    from 'express'
import * as handlebars from 'express-handlebars'

import ROUTES from './config/routes'

let app = express();

// Engines

app.engine('.hbs', handlebars.create({ extname: '.hbs', layoutsDir: `${__dirname}/views`, defaultLayout: 'pages' }).engine);

app.set('view engine', '.hbs');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/../../public`));

// Routes

app.use('/', ROUTES);

export default app;
