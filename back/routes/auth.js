const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
      console.log(theUser)
      if (err) {
          res.status(500).json({ message: 'Something went wrong authenticating user' });
          return;
      }
  
      if (!theUser) {
          res.status(401).json(failureDetails);
          return;
      }

      req.login(theUser, (err) => {
          if (err) {
              res.status(500).json({ message: 'Session save went bad.' });
              return;
          }
          res.status(200).json(theUser);
      });
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }

  if(password.length < 4){
    res.status(400).json({ message: 'Please make your password at least 3 characters long for security purposes.' });
    return;
}

User.findOne({ username }, (err, foundUser) => {
  
  if(err){
      res.status(500).json({message: "Username check went bad."});
      return;
  }

  if (foundUser) {
      res.status(400).json({ message: 'Username taken. Choose another one.' });
      return;
  }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      username: username,
      password: hashPass
    });

    aNewUser.save(user => {
      
      if (err) {
          res.status(400).json({ message: 'Saving user to database went wrong.' });
          return;
      }

      req.login(aNewUser, (err) => {
        console.log("despues login"+err)
        if (err) {
            res.status(500).json({ message: 'Login after signup went bad.' });
            return;
        }
        res.status(200).json(user);
      })
    })
  })
})

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});

router.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});
    
module.exports = router;
