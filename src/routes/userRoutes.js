const express = require('express');
const userRoutes = new express.Router();
const UserController = require('../controllers/UserController')

userRoutes.get('/user', UserController.read);
userRoutes.post('/user', UserController.create);
userRoutes.delete('/user/:login', UserController.delete);

module.exports = userRoutes;