const express = require("express");
const app = express();
const path = require("path");
const {
  syncAndSeed,
  models: { Manufacturer, Model },
} = require("./db");

//Middleware
app.use("/dist", express.static(path.join(__dirname, "dist")));


//returning html file
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await syncAndSeed();
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

//Routes

app.delete('/api/manufacturers/models/:id', async(req, res, next) => {
    try {
        //console.log(req.params)
        const model = await Model.findByPk(req.params.id)
        await model.destroy()
        res.sendStatus(204)  //No content
    } catch (err) {
        next (err)
    }
})

app.get("/api/manufacturers", async (req, res, next) => {
  try {
    const manufacturers = await Manufacturer.findAll({
      include: [Model],
    });
    res.send(manufacturers);
  } catch (err) {
    next(err);
  }
});

app.post("/api/cars", async (req, res, next) => {
  try {
    res.status(201).send(await Model.createRandom());
  } catch (err) {
    next(err);
  }
});

start();
