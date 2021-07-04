const express = require('express')
const app = express();
import {db} from './MySQLConnect.js'
app.listen(3000);
console.log("Backend Listening on port 3000")

app.get('/', (req, res) =>{
    res.redirect('/api/customers')
})

app.get('/api/customers',async (req, res) =>{
    try{
    const [rows,] = await db.execute(`SELECT * FROM customers;`)
    res.json(rows)
    res.json(rows)
    } catch (err) {
        res.status(500).send("error fetching customers")
    }
}) 

app.get('/api/customer/:id',async (req, res)=>{
    try{
        const id = req.params.id
        const [rows,] = await db.execute(`SELECT * FROM customers WHERE id = ?;`,[id])
        if (rows.length===0) res.status(404).send(`No Such Customer with id ${id}`)
        res.json(rows)
        console.table(rows)
        } catch (err) {
            res.status(500).send(`error fetching customers, error:${err.message}`)
        }
})

app.post('/api/customer/add',async (req, res)=>{
    const value:string[] = []
    console.log(req.query)
    for (const key in req.query) {
        // console.log(req.params[key])
        value.push(req.query[key])
    }
    console.table(value)
    try {
        await db.execute(`INSERT INTO customers (first_name,last_name,phone,email,address,city,state) VALUES (?,?,?,?,?,?,?)`,value)
        res.send("Customer added")
    } catch(err) {
        res.status(500).send(`error inserting customers, error: ${err.message}`)
        console.error(err)
    }
})

app.post('/api/customer/update/:id',async (req, res)=>{
    const value:string[] = []
    console.log(req.query)
    for (const key in req.query) {
        // console.log(req.params[key])
        value.push(req.query[key])
    }
    value.push(req.params.id)
    console.table(value)
    try {
        await db.execute(`UPDATE customers SET first_name=?,last_name=?,phone=?,email=?,address=?,city=?,state=? WHERE id=?`,value)
        res.send(`Customer with id:${req.params.id} updated`)
    } catch(err) {
        res.status(500).send(`error updating customers, error: ${err.message}`)
        console.error(err)
    }
})

app.delete('/api/customer/delete/:id',async (req, res)=>{
    try{
        const id = req.params.id
        const [rows,] = await db.execute(`DELETE FROM customers WHERE id = ?;`,[id])
            res.send(`Customer with id: ${req.params.id} deleted`)
        } catch (err) {
            res.status(500).send(`error delete customer, error:${err.message}`)
        }
})