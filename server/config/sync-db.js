
const sequelize = require("./sequelize");

const syncDb = async (serverApp, serverPort) => {
  try {
    await sequelize.sync();

    console.log('Database connected and models synchronized.');

    await serverApp.listen(serverPort, () => {
      console.log(`Server is running on PORT: ${serverPort}`);
    });
  } catch (err) {
    console.error('Error connecting to the database:', err);
  };
};

module.exports = syncDb;
