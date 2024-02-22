const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mysql.createConnection(config);

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL');

    const createTableQuery = `CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    )`;
    connection.query(createTableQuery, (err) => {
        if (err) {
            console.error('Erro ao criar tabela:', err);
            return;
        }
        console.log('Tabela criada com sucesso');

        const sql = `INSERT INTO people (name) VALUES ('Pedro')`;
        connection.query(sql, (err) => {
            if (err) {
                console.error('Erro ao inserir dados na tabela:', err);
                return;
            }
            console.log('Dados inseridos com sucesso');

            // Consulta SELECT
            const getNameQuery = `SELECT name FROM people`;
            connection.query(getNameQuery, (err, results) => {
                if (err) {
                    console.error('Erro ao executar consulta SELECT:', err);
                    return;
                }

                // Se os resultados forem retornados com sucesso como um array
                if (Array.isArray(results)) {
                    // Construir uma string HTML com base nos resultados da consulta
                    let html = `
                        <html>
                        <head>
                            <title>Lista de Pessoas</title>
                        </head>
                        <body>
                            <h1>Lista de Pessoas</h1>
                            <ul>
                    `;
                    results.forEach((person) => {
                        html += `<li>${person.name}</li>`;
                    });
                    html += `
                            </ul>
                        </body>
                        </html>
                    `;

                    // Enviar o HTML como resposta
                    app.get('/', (req, res) => {
                        res.send(html);
                    });
                } else {
                    console.error('Os resultados da consulta SELECT não foram retornados como um array.');
                }
            });
        });
    });
});

app.listen(port, () => {
    console.log('Running on port ' + port);
});
