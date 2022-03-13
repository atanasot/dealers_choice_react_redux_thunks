const express = require('express');
const app = express();
const path = require('path');
const { syncAndSeed, models: {Manufacturer, Model} } = require('./db')

app.use('/dist', express.static(path.join(__dirname, 'dist')));

//returning 
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

const port = process.env.PORT || 3000;

const start = async() => {
    try {
        await syncAndSeed()
        app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch (err) {
        console.log(err)
    }
}

//Routes
app.get('/api/cars', async(req, res, next) => {
    try {
        const cars = await Manufacturer.findAll({
            include: [Model]
        })
        res.send(cars)
    } catch (err) {
        next(err)
    }
})


start()

