const Post = require('../models/post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
let admin = require("firebase-admin");
let serviceAccount = require('../config/key.json');

const storage = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://itaproject-e5f3d.firebaseio.com",
  storageBucket: 'itaproject-e5f3d.appspot.com'
});

let database = admin.database();

function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

module.exports = {

    async getImage (req, res) {
        const {image} = req.params;
        await database.ref(`pictures/${image}`).on('value', (response) => {
            if (response.val()) res.status(200).send(response.val())
            else res.status(404).send('image not found')
        })
    },

    async getAll (req, res) {
        const posts = await Post.find().sort('-createdAt');
        return res.json(posts);
    },

    async store (req, res) {

        const { title, description, author } = req.body;
        const { filename: image } = req.file;
        const [name] = image.split('.');
        const fileName = `${name}.jpg` 

        await sharp (req.file.path)
            .resize(800, 800)
                .jpeg({ quality: 100 })
                    .toFile(path.resolve(req.file.destination, 'resized', fileName))

        fs.unlinkSync(req.file.path);
                    
        const file64 = base64_encode(path.resolve(req.file.destination, 'resized', fileName))
        
        await database.ref(`pictures/${name}`).set({
            fileName: file64
        })

        fs.unlinkSync(path.resolve(req.file.destination, 'resized', fileName))

        const post = await Post.create ({
            author,
            title,
            description,
            image: name
        }).then((post)=>(
            res.json(post)
        )).catch((err)=>(
            res.status(500).send('error')
        ))

        req.io.emit('post', post);
        
        
    },

    async deleteOne (req, res) {
        const {id} = req.params;
        await Post.findByIdAndDelete(id)
        .then((post)=>{
            if (!post) {
                return res.status(404).send('Post não foi encontrado!');
            }
            console.log(`${post.title} foi deletado`)
            return res.status(200).send('O post foi deletado!')
        }).catch((err)=>{
            console.log(err);
        })
    }
}