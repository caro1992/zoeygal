// para funciones más complejas que rutas que rendericen páginas (validación, cifrar contraseñas, consultar base de datos, etc) se guardan estas dentro de los controllers
// se crea un objeto indexCtrl que contiene las funciones que renderizan a las páginas y al final se exporta para poder acceder desde cualquier otro archivo
const indexCtrl = { };

indexCtrl.renderIndex = (req, res) => {
    res.render('index') 
};

indexCtrl.renderAros = (req, res) => {
    res.render('aros') 
};

indexCtrl.renderCollaresYChokers = (req, res) => {
    res.render('collaresychokers') 
};

indexCtrl.renderAnillos = (req, res) => {
    res.render('anillos') 
};

indexCtrl.renderPulseras = (req, res) => {
    res.render('pulseras') 
};

indexCtrl.renderTheSunsetCollection = (req, res) => {
    res.render('thesunsetcollection') 
};

indexCtrl.renderContacto = (req, res) => {
    res.render('contacto') 
};




module.exports = indexCtrl;