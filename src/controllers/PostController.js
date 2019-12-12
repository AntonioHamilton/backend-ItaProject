const Post = require('../models/post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
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
            .resize(1400, 800)
                .jpeg({ quality: 100 })
                    .toFile(path.resolve(req.file.destination, 'resized', fileName))

        fs.unlinkSync(req.file.path);

        const post = await Post.create ({
            author,
            title,
            description,
            image: fileName
        })

        req.io.emit('post', post);
        
        return res.json(post);
    },

    async deleteOne (req, res) {
        const {_id} = req.params;
        await Post.findOneAndDelete({_id})
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