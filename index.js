const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const conectionURI = process.env.CONNECTION_URI

mongoose.connect(conectionURI)

const Message = mongoose.model('Messages', {
    sender: String,
    message: String,
    country: String
})

const port = process.env.PORT

app.use(bodyParser.json())


app.post('/api/data', async (req, res) => {
    const hasSender = !!req.body.sender
    const hasMessage = !!req.body.message
    const hasCountry = !!req.body.country


    if(!hasSender || !hasMessage || !hasCountry)
        return res.statusCode(400).message({"error": "invalid body"})

    const message = new Message({
        sender: req.body.sender,
        message: req.body.message,
        country: req.body.country
    })
    
    const response = await message.save()
    console.log('save body on db')    
    res.send(response)
})

app.get('/api/data', async (req, res) => {
    console.log('retrieve data')
    const messages = await Message.find()
    res.send(messages)
})

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})