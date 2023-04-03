var express = require('express');
var router = express.Router();
const mysql = require('mysql')


const conectBD = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'marketplace'
})

/* GET home page. */
router.get('/', (req, res) => {
    const {user, password} = req.body
    const values = [user, password]
    const sql = 'select * from providers'

    conectBD.query(sql, values,(err,result) => {
        if(err) {
            res.status(500).send(err)
        } else {
            if (result.length > 0) {
                res.status(200).send(result)
            } else {
                res.status(400).send('No hay proveedores registrados.')
            }
        }
    })
});

router.post('/create-provider', (req, res) => {
    const sql = 'INSERT INTO providers SET ?'

    const providerObj = {
        nombre: req.body.nombre,
        usuario: req.body.usuario,
        rol: req.body.rol
    }

    conectBD.query(sql, providerObj, error  => {
        if (error) throw error

        res.send('El proveedor fue creado con exito')
    })
});

router.put('/update-provider/:providerId', async(req,res) =>{
    console.log('req.params',req.params)
    const id = req.params.providerId

    const {nombre,usuario,rol} = req.body

    const sql = `UPDATE providers SET nombre = '${nombre}', usuario = '${usuario}', rol = '${rol}'
        where idproviders = ${id}
    `
    await conectBD.query(sql, error => {
        if (error) throw error

        res.send(`Usuario con el id: ${id}, fue actualizado con exito.`)
    })
})

router.put('/delete-provider/:providerId', async(req,res) =>{
    console.log('req.params',req.params)
    const id = req.params.providerId

    const sql = `DELETE FROm providers  where idproviders = ${id}
    `
    await conectBD.query(sql, error => {
        if (error) throw error

        res.send(`Usuario con el id: ${id}, fue eliminado con exito.`)
    })
})

module.exports = router;