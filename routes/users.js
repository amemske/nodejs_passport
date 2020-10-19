const express = require('express');
const router = express.Router();

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
    res.send('pass');
  }

})
  
  




module.exports = router;