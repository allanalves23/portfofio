const express = require('express')
const app = express()


app.use('/public', express.static('public'))

app.route('/')
    .get((req, res) => res.sendFile('./index.html', {root: __dirname}))

app.route('/api/estudante-ti')
    .get((req, res) => res.sendFile('./docs/estudante-ti/index.html', {root: __dirname}))

app.route('/test')
    .get((req, res) => res.status(200).send('Recurso test'))

app.listen(3000, () => console.log('executando na porta 3000'))