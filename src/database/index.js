const Sequelize = require('sequelize');

const dbConfig = require('../config/database');

const User = require('../models/User');
const Sensors = require('../models/Sensors');

const connection = new Sequelize(dbConfig);

User.init(connection);
Sensors.init(connection);

Sensors.associate(connection.models);
User.associate(connection.models);

module.exports = connection;