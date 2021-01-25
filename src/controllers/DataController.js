const Datas = require('../models/Datas');
const Sensors = require('../models/Sensors');


module.exports = {
    async index(req, res) {
        const { sensors_id } = req.params;

        const sensor = await Sensors.findByPk(sensors_id, {
            include: { association: 'data'}
        });

        if (!sensor) {
            return res.status(400).send({
                status: 0,
                message: 'Sensors não encontrados'
            });
        }

        return res.status(200).send(sensor.data);
    },

    async store(req, res) {

      try {

          const { sensors_id } = req.params;
          const { lat, lng, temp } = req.body;

          const sensor = await Sensors.findByPk(sensors_id);

          if (!sensor) {
              return res.status(400).json({
                  status: 0,
                  message: 'Usuário não encontrado!'
              });
          }

          const datas = await Datas.create({
            lat,
            lng,
            temp,
            sensors_id,
          });

          return res.status(200).json({
              status: 1,
              message: "dados cadastrado com sucesso!",
              datas
          });

        } catch (err) {
          return res.status(400).json({ error: err });
      }
    },
};