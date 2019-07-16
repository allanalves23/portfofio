const express = require('express')()

express.route('/')
    .get((req, res) => res.sendFile('./index.html', {root: __dirname}))

express.route('/test')
    .get((req, res) => res.status(200).send('Recurso test'))

express.listen(3000, () => console.log('executando na porta 3000'))