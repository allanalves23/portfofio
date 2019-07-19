const express = require('express')
const app = express()


app.use('/public', express.static('public'))

app.route('/')
    .get((req, res) => {
        console.log(req.ip)
        return res.sendFile('./index.html', {root: __dirname})
    })

app.route('/contato')
    .get((req, res) => res.sendFile('./contact.html', {root: __dirname}))

app.route('/projetos')
    .get((req, res) => res.sendFile('./projects.html', {root: __dirname}))

app.route('/projetos/aps-poo')
    .get((req, res) => res.sendFile('./projects/aps-poo.html', {root: __dirname}))

app.route('/projetos/code-char')
    .get((req, res) => res.sendFile('./projects/code-char.html', {root: __dirname}))


app.get('/curriculum', (req, res) => res.download('./public/pdf/Allan_Curriculo.pdf'))

app.route('/api/estudante-ti')
    .get((req, res) => res.sendFile('./docs/estudante-ti/index.html', {root: __dirname}))



app.listen(3000, () => console.log('executando na porta 3000'))