const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const authHelper = require('../../util/helpers/auth');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class AuthController {
  // [GET] /auth/login
  indexLogin(req, res, next) {
    res.render('authentication/login')
  }

  // [POST] /auth/login
  login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ email }).then((user) => {
      if (!user) {
        res.status(401).send({
          error: 'Unauthorized',
          message: 'User not found',
        })
        return;
      }

      bcrypt.compare(password, user.password, function (err, result) {
        if (!result) {
          res.status(401).send({
            error: 'Unauthorized',
            message: 'Incorrect password'
          });
          return;
        }
        const token = authHelper.createToken(user);
        res.status(200).send({ token });
      });
    })
      .catch(next);
  }

  // [GET] /auth/signup
  indexSignup(req, res, next) {
    res.render('authentication/signup')
  }

  // [POST] /auth/signup
  signup(req, res, next) {
    const { password } = req.body;

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        req.body.password = hash;

        const user = new User(req.body);
        user
          .save()
          .then(() => res.redirect('/auth/login'))
          .catch(next);
      });
    });
  }
}

module.exports = new AuthController();
