const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Pedro')`
connection.query(sql)
connection.end()

app.get('/', (req, res) => {
    res.send('<h1>Running node in a container</h1>')
})

app.listen(port, () => {
    console.log('Running on port ' + port)
})