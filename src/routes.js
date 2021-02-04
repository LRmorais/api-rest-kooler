const express = require('express');

const UserController = require('./controllers/UserController');

const SensorsController = require('./controllers/SensorsController');

const DataController = require('./controllers/DataController');

const authMiddleware = require('./middlewares/auth');

const router = express.Router();

// rota de get dos usuarios, controle definido em UserController
// a rota sera interceptada pelo middleware 
router.get('/users', UserController.index);
// rota de login do usuario
router.post('/users/login', UserController.login);
// rota de POST dos dados de um usuario, controle definido em UserController
router.post('/users', UserController.store);

//router.use(authMiddleware);

// rota de update do usuario com o ID correspondente
router.put('/users/:user_id',UserController.update);
// rota de delete do usuario com ID correspondente
router.delete('/users/:user_id',UserController.delete);



router.get('/users/:user_id/sensors', SensorsController.index);
router.post('/users/:user_id/sensors', SensorsController.store);
router.delete('/users/:id/sensors', SensorsController.delete);
router.put('/users/:id/sensors', SensorsController.update);

router.get('/users/:sensors_id/data', DataController.index);
router.post('/users/:sensors_id/data', DataController.store);
router.post('/users/:sensors_id/datas', DataController.storeBulk);


module.exports = router;

