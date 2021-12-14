const express = require('express')
const dotenv = require('dotenv')
const multer = require('multer')
const http = require('http')

const storage = multer.diskStorage({
    destination: (req, file, cb) =>  cb(null, __dirname + '/uploads'),
    filename: (req, file, cb) => cb(null, require('crypto').randomBytes(16).toString('hex') + '.pdf')
})
const upload = multer({ storage: storage })

dotenv.config()
const app = express()
app.use(express.json())

app.use(express.static(__dirname + '/client/build'))
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/client/build')
})

app.get('/api', (req, res) => {
    res.json({ message: 'From api with love' })
})

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'File uploaded' })
})

const server = http.createServer(app)

server.listen(process.env.PORT, () => { console.log('Server Started') })