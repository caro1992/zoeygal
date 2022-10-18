// Librerías
const express = require('express');
const path = require('path');
const hbs = require('hbs');

// Puerto y express
const PORT = 3000;
const app = express();

// Middlewares
app.use(express.json());

// Configuraciones para que tome hbs como motor de vistas, que encuentre la carpeta views y encuentre la carpeta partials
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));


// A partir de acá tengo que armar todas las rutas a las distintas páginas con el get
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/aros', (req, res) => {
    res.render('aros');
})

app.get('/collaresychokers', (req, res) => {
    res.render('collaresychokers');
})

app.get('/anillos', (req, res) => {
    res.render('anillos');
})

app.get('/pulseras', (req, res) => {
    res.render('pulseras');
})

app.get('/thesunsetcollection', (req, res) => {
    res.render('thesunsetcollection');
})

app.get('/contacto', (req, res) => {
    res.render('contacto');
})



// Confirmación de uso de puerto y error
app.listen(PORT, () => {
    console.log(`Aplicación activa y trabajando en el Puerto ${PORT}`);
});

app.on("Error", () => {
    console.log(`Tenemos un error`); 
});
