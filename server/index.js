const express = require('express')
const { spawn } = require( 'child_process' );
const app = express()
const port = 5000
app.use(
    express.urlencoded({
        extended: true
    })
)

app.get('/', async (req, res) => {
    const {cuisine,type,ingredients} = req.query
    console.log(cuisine,type,ingredients)

    const ls = spawn( 'python', [ 'index.py', cuisine, type, ingredients ] );

    dataNum = null
    ls.stdout.on( 'data', ( data ) => {
        console.log( `stdout: ${ data }` );
        dataNum = data
        res.json({output:dataNum.toString()})
    } );

    ls.stderr.on( 'data', ( data ) => {
        console.log( `stderr: ${ data }` );
    } );
    
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})