import sequelize from "./sequelize.mjs";
import User from "../models/user.entity.js";

const dbContext = async () => {
  // User.hasOne(Resume);
  // Resume.belongsTo(User);

  

  await sequelize.sync({ alter: true });
};

export default dbContext;
