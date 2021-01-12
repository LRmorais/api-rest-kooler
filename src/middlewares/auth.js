const jwt = require('jsonwebtoken');
// importando o secret
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
// verificando se existe um token
    if (!authHeader) {
        return res.status(401).send({ error: 'No token provider' });
    }
    const parts = authHeader.split(' ');
// verificando se o formato do token jwt está correto -> Bearer + hash aleatorio
    if (!parts.length == 2) {
        return res.status(401).send({ error: 'Token error!' });
    }
// desestruturando o array, primeira parte o bearer e a segunda o token
    const [scheme, token] = parts;
// verificando se tem bearer no token
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token malFormatted' });
    }
// verificação final do token
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token invalid' });

        req.userId = decoded.id;
        console.log(decoded.id)

        return next();
    });

};