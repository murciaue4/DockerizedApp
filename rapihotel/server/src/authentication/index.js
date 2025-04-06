const jwt = require('jsonwebtoken');
config = require('../config');
const error = require('../middlewares/errors');



let secret = config.jwt.secret;

function asignaToken(data) {
    return jwt.sign(data, secret)
}; 
 
function verificarToken(data) {
    const decodedToken = jwt.verify(data, secret)
    console.log(decodedToken);
    if (!decodedToken.id) {
        throw error('Invalid token format', 401);
    }
    return decodedToken
};

function optenerToken(authorization) {
    if (!authorization) {
        throw error('Header authorization not exist', 401)
    } 
    if (authorization.indexOf('Bearer') === -1) {
        throw error('Invalid format of token', 401)
    }
    let token = authorization.replace('Bearer ', '');
    return token;
};

function decodificarCabecera(req) {
    const permiso = req.headers.authorization;
    const token = optenerToken(permiso);
    const verificado = verificarToken(token);

    let reqId = req.params.id || req.params.id_user
console.log('reqId', Number(reqId));
console.log('verificado.id', verificado.id);
    if (Number(verificado.id) !== Number(reqId)) {
        throw error('Invalid token for this user', 401);
    }

    return verificado;
};

const checkearToken = {
    confirmarToken: function (req) {
        const decodificado = decodificarCabecera(req);

        if (!decodificado) {
            throw error('Not authorized', 401)
        }
        return decodificado;
    }
};



module.exports = {
    asignaToken,
    checkearToken
};