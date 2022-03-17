const Sequelize = require("sequelize");
const { STRING } = Sequelize;
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme-react-redux"
);
const faker = require("faker");

const Manufacturer = sequelize.define("manufacturer", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

const Model = sequelize.define("model", {
  name: {
    type: STRING,
    allowNull: false,
  },
});

Model.belongsTo(Manufacturer);
Manufacturer.hasMany(Model);

const randomManufacturerId = () => {
  return Math.ceil(Math.random() * 4);
};

Model.createRandom = function () {
  return this.create({
    name: faker.vehicle.model(),
    manufacturerId: randomManufacturerId(),
  });
};

const syncAndSeed = async () => {
  try {
    await sequelize.sync({ force: true });
    await Promise.all(
      [
        faker.vehicle.manufacturer(),
        faker.vehicle.manufacturer(),
        faker.vehicle.manufacturer(),
        faker.vehicle.manufacturer(),
      ].map((name) => Manufacturer.create({ name }))
    );
    await Promise.all(
      Array(10)
        .fill(0)
        .map(() =>
          Model.create({
            name: faker.vehicle.model(),
            manufacturerId: randomManufacturerId(),
          })
        )
    );
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  syncAndSeed,
  models: { Manufacturer, Model },
};
