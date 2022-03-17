const router = require("express").Router();
const {
  models: { Manufacturer, Model },
} = require("./db");

router.delete("/models/:id", async (req, res, next) => {
  try {
    const model = await Model.findByPk(req.params.id);
    await model.destroy();
    res.sendStatus(204); //No content
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const manufacturers = await Manufacturer.findAll({
      include: [Model],
    });
    res.send(manufacturers);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Model.createRandom());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
