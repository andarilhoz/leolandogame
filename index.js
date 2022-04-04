const express = require('express')
const app = express();
const bodyParser = require('body-parser')

const port = os.env.PORT

app.use(bodyParser.json())


app.post('/api/data', (req, res) => {
    console.log('save body on db')
})

app.get('/api/data', (req, res) => {
    console.log('retrieve data')
    res.send(200)
})

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})