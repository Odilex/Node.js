const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('./userdb');  // Your db connection
const mysql = require('mysql2');

// GET Routes
router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/dashboard', (req, res) => {
  if (req.session.loggedin) {
    res.render('dashboard', { username: req.session.username });
  } else {
    res.redirect('/login');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// POST Routes
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (results.length > 0) {
      bcrypt.compare(password, results[0].password, (err, match) => {
        if (match) {
          req.session.loggedin = true;
          req.session.username = username;
          res.redirect('/dashboard');
        } else {
          res.send('Incorrect password!');
        }
      });
    } else {
      res.send('User not found');
    }
  });
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err) => {
      if (err) {
        res.send('Error during registration');
      } else {
        res.redirect('/login');
      }
    });
  });
});

module.exports = router;
