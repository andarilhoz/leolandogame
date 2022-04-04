const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const conectionURI = process.env.CONNECTION_URI

mongoose.connect(conectionURI, { useNewUrlParser: true, useUnifiedTopology: true })
console.log(conectionURI)
const Message = mongoose.model('Messages', {
    sender: String,
    message: String,
    country: String
})

const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json())


app.post('/api/data', async (req, res) => {
    const hasSender = !!req.body.sender
    const hasMessage = !!req.body.message
    const hasCountry = !!req.body.country

    console.log(req.body)

    if(!hasSender || !hasMessage || !hasCountry){
        res.status(400).json({error: "invalid body"})
        return
    }
        

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