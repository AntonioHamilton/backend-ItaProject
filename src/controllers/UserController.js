const User = require('../models/user');

module.exports = {
    async create (req, res) {
        const { login, password } = req.body;
        await User.create ({
            login,
            password,
            ADMIN: true
        }).then((user)=>{
            return res.status(200).send('Usuário criado!')
        }).catch((err)=>{
            return res.status(500).send('usuário não pode ser criado!')
        })
    },

    async read (req, res) {
        const users = await User.find();
        return res.json(users);
    },

    async delete (req, res) {
        const { login } = req.params;
        await User.findOneAndDelete({ login })
        .then((user)=>{
            return res.status(200).send('Usuário deletado!');
        }).catch((err)=>{
            console.log(err);
            return res.status(500).send('erro interno do servidor');
        })
    }
}