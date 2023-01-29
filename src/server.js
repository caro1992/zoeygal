// llamo a las librerías
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//initializations
const app = express();
require('./config/passport');

//SETTINGS - lo que quiero que haga express basado en módulos 
app.set('port', process.env.PORT || 4000); // para usar un puerto desde un servidor (como heroku). Si nuestro sistema tiene una variable de entorno PORT, debe utilizarla, sino que utilice el 4000


app.set('views', path.join(__dirname, 'views')); // la carpeta views debería estar al inicio del proyecto, pero al estar dentro de src node no puede encontrarla. Se configura para establecer en dónde está views. dirname nos da la ruta de la carpeta. Nos sirve para renderizar las vistas.


// configuración de handlebars
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
})) // busca los directorios de las carpetas views y partials
app.set('view engine', '.hbs');


//MIDDLEWARES - se ejecutan a medida que van llegando peticiones
app.use(express.urlencoded({extended: false})); // Cada vez que lleguen datos de un formulario los convierte en json.
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize()); // este middleware tiene que ir siempre después de app.use(session)
app.use(passport.session());
app.use(flash());


//GLOBAL VARIABLES - todo el proyecto puede acceder a ellas
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


//ROUTES -> utiliza lo que requerimos desde el archivo index.routes dentro de la carpeta routes, busca las rutas en este archivo
app.use(require('./routes/index.routes'));
app.use(require('./routes/user.routes'));



//STATIC FILES - configuración de la carpeta public
// app.use(express.static(path.join(__dirname, 'public'))); // reconoce la carpeta public como carpeta de archivos estáticos
app.use('/js', express.static(__dirname + 'src/public/js'));
app.use(express.static("src/public"));


// se exporta para que se ejecute desde index

module.exports = app;

