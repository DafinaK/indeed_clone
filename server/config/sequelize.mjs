import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('indeed_clone', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

export default sequelize;