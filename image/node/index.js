const express = require('express')
const app = express()
const port = 3000

app.get('/', (req,res) => {
    res.send('<h1>Running node in a container</h1>')
})

app.listen(port, ()=>{
    console.log('Running on port ' + port)
})