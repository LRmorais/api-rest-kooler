const { Model, DataTypes } = require('sequelize');

class Sensors extends Model {
    static init(sequelize) {
        super.init({
            street: DataTypes.STRING,
            number: DataTypes.STRING,
            district: DataTypes.STRING,
            city: DataTypes.STRING,
        }, {
            sequelize
        })
    }
// associação 1 para 1 belongsTo
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}

module.exports = Sensors;