/*
* Utiliza o Passport.js para criar a estratégia de Cadastro e Login criptografado
* de usuário
*/
var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

/*
* O serializeUser e o deserializeUser são responsáveis por manter a sessão do usuário
* enquanto ele estiver logado na página
*/
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

/*
* Estratégia de autenticação de usuário e senha do Passport para o cadastro do usuário
*/
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    req.checkBody('email', 'E-mail inválido').notEmpty().isEmail();
    req.checkBody('password', 'Senha inválida').notEmpty().isLength({ min: 4 });
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({ 'email': email }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, { message: 'E-mail já está em uso' });
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function (err, result) {
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));

/*
* Estratégia de autenticação de usuário e senha do Passport para o login do usuário
*/
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    req.checkBody('email', 'E-mail inválido').notEmpty().isEmail();
    req.checkBody('password', 'Senha inválida').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({ 'email': email }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'Usuário não encontrado' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Senha incorreta' });
        }
        return done(null, user);
    });
}));