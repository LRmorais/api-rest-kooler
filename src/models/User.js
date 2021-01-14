const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');


class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            password: DataTypes.STRING,
            email: DataTypes.STRING,
            islogged: DataTypes.BOOLEAN
        }, {
            sequelize,
            hooks: {
                // metodo que cria uma senha criptografada
                beforeCreate: (user) => {
                    const salt = bcrypt.genSaltSync();
                    user.password = bcrypt.hashSync(user.password, salt);
                },
            },
        })
    }
// associação 1 para muitos -> 1 user pode ter varios sensors
    static associate(models) {
        this.hasMany(models.Sensors, { foreignKey: 'user_id', as: 'sensors' });
    }
}
    
module.exports = User;
 