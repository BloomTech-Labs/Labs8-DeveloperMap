const express = require('express');
const firebase = require('../firebase/firebase.js');
const rootRef = firebase.database().ref();
const router = express.Router();
