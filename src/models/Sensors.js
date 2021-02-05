const { Model, DataTypes } = require('sequelize');

class Sensors extends Model {
    static init(sequelize) {
        super.init({
            apelido: DataTypes.STRING,
            
        }, {
            sequelize
        })
    }
// associação 1 para 1 belongsTo
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      this.hasMany(models.Datas, { foreignKey: 'sensors_id', as: 'data' });
    }
}

module.exports = Sensors;