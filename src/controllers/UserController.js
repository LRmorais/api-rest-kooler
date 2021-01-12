const User = require('../models/User');
// bcrypt usado para encripitar a senha em um hash
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth')

// gera o token usando metodos do jwt
// token vai se basear no id e no secret
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        // tempo de expiração do token em segundos -> 86400s = 1 dia
        expiresIn: 86400,
    });
}

module.exports = {

    // metodo de logun
    async login(req, res) {
        const { password, email, islogged } = req.body;
    // faz uma verificação para ver se o email e senha existem
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).send({
                status: 0,
                message: 'E-mail ou senha incorreto!',
                user: {}
            });
        }
        // verifica se as senhas são iguais(senha que vem do usuario e a senha que tem no banco)
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).send({
                status: 0,
                message: 'E-mail ou senha incorreto!',
                user: {}
            });
        }

        const user_id = user.id;

        await User.update({
            islogged
        }, {
            where: {
                id: user_id
            }
        });
        // não retorna a senha no response
        user.password = undefined

        // retorna o id como parametro
        const token = generateToken({ id: user.id });

        return res.status(200).send({
            status: 1,
            message: "Usuário logado com sucesso!",
            user, token
        });


    },

// buscar todos os dados
    async index(req, res) {

        const users = await User.findAll();
        
        if (users == "" || users == null) {
            return res.status(200).send({ message: "Nenhum usuário cadastrado" });

        }
        
        return res.status(200).send({ users });

    },
// inserir dados
    async store(req, res) {
        const { name, password, email } = req.body;
// metodo create do sequelize para inserir dados
        const user = await User.create({ name, password, email });

        const token = generateToken({ id: user.id });

        return res.status(200).send({
            status: 1,
            message: 'usuário cadastrado com sucesso!',
            user, token

        });

    },

    async update(req, res) {
        const { name, password, email } = req.body;
        const { user_id } = req.params;
         
        await User.update({
            name, password, email
        }, {
            where: {
                id: user_id
            }
        });

        return res.status(200).send({
            status: 1,
            message: "Usuário atualizado com sucesso!",
        });

    },

    async delete(req, res) {
        const { user_id } = req.params;

        await User.destroy({
            where: {
                id: user_id
            }
        });

        return res.status(200).send({
            status: 1,
            message: "Usuário deletado com sucesso!",
        });
        

    }

}