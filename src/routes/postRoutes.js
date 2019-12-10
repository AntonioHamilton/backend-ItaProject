const express = require('express')
const PostController = require('../controllers/PostController');
const multer = require('multer');
const uploadConfig = require('../config/Upload');
const LikeController = require('../controllers/LikeController');

const postRoutes = new express.Router();
const upload = multer(uploadConfig);

postRoutes.get('/posts', PostController.getAll);
postRoutes.post('/posts', upload.single('image'), PostController.store);
postRoutes.post('/posts/:title/like', LikeController.store)
postRoutes.delete('/posts/:title', PostController.deleteOne);

module.exports = postRoutes;