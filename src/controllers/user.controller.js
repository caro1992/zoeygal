// al igual que en index.controller


const usersCtrl = {};

const passport = require('passport');

const User = require('../models/User')

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('signup');
}

usersCtrl.signup = async (req, res) => {
    const errors = [];
    const {name, surname, email, password, confirm_password} = req.body;
    if (password != confirm_password) {
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if (password.length < 7) {
        errors.push({text: 'La contraseña es demasiado corta'});
    }
    if (errors.length > 0) {
        res.render('signup', {
            errors,
            name,
            surname,
            email 
        })
    } else {
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            errors.push({text:'El email ingresado ya existe'});
            res.render('signup', {
                errors,
                name,
                surname,
                email 
            })
    } else {
       const newUser = new User({name, surname, email, password});
       newUser.password = await newUser.encryptPassword(password);
       await newUser.save();
       req.flash('success_msg', 'Usuario registrado correctamente');
       res.redirect('login');
       
    }
    }
};

usersCtrl.renderLogInForm = (req, res) => {
    res.render('login');
}

usersCtrl.login = passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
    failureFlash: true
})

usersCtrl.logout = (req, res) => {  
    req.logout( (err) => {
        if (err) { return next(err); }
        req.flash( "success_msg" , "Sesión cerrada" );
        res.redirect( "login" );
    });
}



module.exports = usersCtrl;