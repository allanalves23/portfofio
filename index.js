const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')


app.use('/public', express.static('public'))

app.use('/vendor', express.static('vendor'))
app.use('/css', express.static('css'))
app.use('/img', express.static('img'))
app.use('/js', express.static('js'))

app.use(bodyParser.json({limit: '10mb'}))
app.use(cors())

app.route('/')
    .get((req, res) => {
        return res.sendFile('./index.html', {root: __dirname})
    })

app.route('/contato')
    .get((req, res) => res.sendFile('./contact.html', {root: __dirname}))

app.route('/projetos')
    .get((req, res) => res.sendFile('./projects.html', {root: __dirname}))

app.route('/projetos/aps-poo')
    .get((req, res) => res.sendFile('./projects/aps-poo.html', {root: __dirname}))

app.route('/projetos/coder-mind')
    .get((req, res) => res.sendFile('./projects/coder-mind.html', {root: __dirname}))


app.get('/curriculum', (req, res) => res.download('./public/pdf/Allan_Curriculo.pdf'))

app.route('/api/estudante-ti')
    .get((req, res) => res.sendFile('./docs/estudante-ti/index.html', {root: __dirname}))

app.post('/debugTest' , (req, res) => {
    const data = {...req.body}
    return res.json(data)
})


app.listen(3000, () => console.log('executando na porta 3000'))