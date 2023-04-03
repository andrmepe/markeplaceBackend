var express = require('express');
var router = express.Router();



const mysql = require('mysql')

express().use(express.json())

const conectBD = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'marketplace'
})


router.post('/', (req, res) => {
  const {userName, password} = req.body

  const values = [userName, password]

  const sql = 'SELECT * FROM usuario where userName = ? and password = ?'
  conectBD.query(sql, values,(err, result) => {
    if (err) {
      res.status(500).send(err)
    } else {
      if (result.length > 0) {
        res.status(200).send(
          'usuario existe'
        )
      } else {
        res.status(400).send('Usuario no existe !')
      }
    }
  })
});

module.exports = router;