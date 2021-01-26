const { Model, DataTypes } = require('sequelize');

class Datas extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            size: DataTypes.INTEGER,
            key: DataTypes.STRING,
            url: DataTypes.STRING,
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