const Sequelize = require("sequelize");
const { STRING } = Sequelize;
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme-react-redux"
);
const faker = require("faker");

// Model

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

// const car = faker.vehicle.model()
// console.log(car)

Model.belongsTo(Manufacturer);
Manufacturer.hasMany(Model);

const randomManufacturerId = () => {
  return Math.ceil(Math.random() * 4);
};

const syncAndSeed = async () => {
  await sequelize.sync({ force: true });
  // seeding Munufacturer
  await Promise.all(
    [
      faker.vehicle.manufacturer(),
      faker.vehicle.manufacturer(),
      faker.vehicle.manufacturer(),
      faker.vehicle.manufacturer(),
    ].map((name) => Manufacturer.create({ name }))
  );
  // Seeding Model
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
};

module.exports = {
  syncAndSeed,
  models: {Manufacturer, Model}
};
