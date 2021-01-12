const express = require('express');

const UserController = require('./controllers/UserController');

const authMiddleware = require('./middlewares/auth');

const router = express.Router();

// rota de get dos usuarios, controle definido em UserController
// a rota sera interceptada pelo middleware 
router.get('/users', authMiddleware, UserController.index);
// rota de POST dos dados de um usuario, controle definido em UserController
router.post('/users', UserController.store);
// rota de update do usuario com o ID correspondente
router.put('/users/:user_id',UserController.update);
// rota de delete do usuario com ID correspondente
router.delete('/users/:user_id',UserController.delete);
// rota de login do usuario
router.post('/users/login', UserController.login);



module.exports = router;
