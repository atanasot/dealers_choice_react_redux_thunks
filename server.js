const express = require('express');
const app = express();
const path = require('path');
const { syncAndSeed } = require('./db')

app.use('/dist', express.static(path.join(__dirname, 'dist')));
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

start()

