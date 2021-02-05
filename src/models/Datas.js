const { Model, DataTypes } = require('sequelize');

class Datas extends Model {
    static init(sequelize) {
        super.init({
            lat: DataTypes.FLOAT,
            lng: DataTypes.FLOAT,
            temp: DataTypes.FLOAT,
        }, {
            sequelize
        })
    }
// associação 1 para 1 belongsTo
    static associate(models) {
        this.belongsTo(models.Sensors, { foreignKey: 'sensors_id', as: 'data' });
    }
}

module.exports = Datas;