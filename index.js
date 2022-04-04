const express = require('express')
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())


app.post('/api/data', (req, res) => {
    console.log('save body on db')
})

app.get('/api/data', (req, res) => {
    console.log('retrieve data')
    res.send(200)
})

app.listen(8080, () => {
    console.log('Listening on 8080')
})