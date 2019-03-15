const pg = require('pg'); 
const express = require('express')
const bodyParser = require('body-parser'); 
const cors = require('cors')

let app = express()
app.use(bodyParser.json())
app.use(cors())

const db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'Poo123318!',
      database : 'enis'
    }
  });

app.get('/en', (req,res) => { 
  db('users2').then(data => { 
    res.json(data)
  })
})

app.put('/update/:id', (req,res) => { 
  const {id} = req.params; 
  const {firstname, lastname, businessname} = req.body
  db('users2')
  .where('id', '=', id)
  .update({
    firstname: firstname, 
    lastname: lastname, 
    businessname: businessname
  }).then(data => {
    res.status(200).send(`user modified with ID: ${id}`)
  })

})

app.delete('/delete/:id', (req,res) => { 
  const {id} = req.params
  db('users2')
  .where('id', id).select('id')
  .del()
  .then(data=> {
    res.json(data)
    console.log(data)
  }).catch(err=> res.status(400).res.json('something went wrong'))
})
  
  app.post('/register', (req,res) => { 
    const {firstname,lastname,businessname} = req.body;
    const date = new Date() 
    db('users2').insert([{firstname:firstname, lastname: lastname, businessname: businessname}])
  .then(data => { 
      console.log(data)
      res.json(data)
  })
  })
  
 

  app.listen(3000, () => console.log('server running'))

 
