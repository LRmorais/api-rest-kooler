const User = require('../models/User');
const Sensors = require('../models/Sensors');

module.exports = {
    async index(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id, {
            include: [
                { association: 'sensors'},
            ]
        });

        if (!user) {
            return res.status(400).send({
                status: 0,
                message: 'Sensors não encontrados'
            });
        }

        return res.status(200).send(user);
    },

    async store(req, res) {

      try {

          const { user_id } = req.params;
          const { apelido} = req.body;

          const user = await User.findByPk(user_id);

          if (!user) {
              return res.status(400).json({
                  status: 0,
                  message: 'Usuário não encontrado!'
              });
          }

          const sensors = await Sensors.create({
            apelido,
            user_id,
          });

          return res.status(200).json({
              status: 1,
              message: "Sensor cadastrado com sucesso!",
              sensors
          });

        } catch (err) {
          return res.status(400).json({ error: err });
      }
    },

    async delete(req, res) {
        const id = req.params.id;

        try {
            const sensors = await Sensors.findByPk(id);

            if (sensors) {
                await Sensors.destroy({ where: { id } });

                return res.status(200).json({
                    status: 1,
                    message: "Sensor apagado com sucesso!",
                });

            } else {
                return res.status(400).json({
                    status: 0,
                    message: 'Sensor não encontrado!'
                });
            }


        } catch (err) {
            return res.status(400).json({ error: err });
        }
    },

    async update(req, res) {
        const id = req.params.id;
        const { street, number, district, city } = req.body;

        try {
            const sensors = await Sensors.findByPk(id);

            if (address) {
                await Sensors.update({ street, number, district, city }, { where: { id } });

                return res.status(200).json({
                    status: 1,
                    message: "Address atualizado com sucesso!",
                });

            } else {
                return res.status(400).json({
                    status: 0,
                    message: 'Address não encontrado!'
                });
            }


        } catch (err) {
            return res.status(400).json({
                status: 0,
                message: 'Erro ao atualizar Address!'
            });
        }
    }
};