const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//User model 
const User = require('../models/User');

//Login page
router.get('/login', function (req, res) {
    res.render('Login');
  })

//Register page
  router.get('/register', function (req, res) {
    res.render('Register');
  })

// Register handle
router.post('/register', (req, res) => {
  const { name, email, password, password2} = req.body;
  let errors = [];

  //check required fields
  if(!name || !email || !password || !password2) {
      errors.push({ msg: 'Please fill in all fields'});
  }

  //check passwords match
  if(password !== password2){
    errors.push({msg: 'Password does not match'})
  }

  if(errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    //validation pass
    User.findOne({ email:email})
      .then(user => {
        if(user) {
              //user exists
              errors.push({ msg: 'Email is already registered'});
              res.render('register', {
                errors,
                name,
                email,
                password,
                password2
              });
        } else {
          const newUser = new User ({
              name,
              email,
              password
          })

         //console.log(newUser);
         // res.send('hello');
          bcrypt.genSalt(10, (err, salt) =>
             bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              //Set password to hashed
              newUser.password = hash;
              //Save user
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/users/login');
                })
                .catch(err => co);

          }))


        }
        
      })
  }

})
  
  




module.exports = router;