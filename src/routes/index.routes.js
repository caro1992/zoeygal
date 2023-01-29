// llamo a express pero sólo al módulo de router y creo una variable router con este módulo
const { Router } = require('express');
const router = Router();

//importa desde index.controller.js
const { renderIndex, renderAros, renderCollaresYChokers, renderAnillos, renderPulseras, renderTheSunsetCollection, renderContacto } = require('../controllers/index.controller')

router.get('/', renderIndex);

router.get('/aros', renderAros);

router.get('/collaresychokers', renderCollaresYChokers);

router.get('/anillos', renderAnillos);

router.get('/pulseras', renderPulseras);

router.get('/thesunsetcollection', renderTheSunsetCollection);

router.get('/contacto', renderContacto);



// debemos exportarlo porque este router va a ser utilizado por server.js
module.exports = router;