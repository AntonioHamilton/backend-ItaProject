const Post = require('../models/post');

module.exports = {
    async store (req, res) {
        const post = await Post.findOne({_id: req.params.id});
        post.likes += 1;
        await post.save();

        req.io.emit('like', post);
        
        return res.json(post)
    }
}