const express = require('express')
const router = express.Router()
const {Type } = require('../db.js')
const { default: axios } = require('axios')
router.use(express.json())


router.get("/", async (req, res, next) => {
    try{
        const completo = await Type.count()
        if (completo === 0) {
            const types = await axios.get(`https://pokeapi.co/api/v2/type`)
            let typesApi = types.data.results
            if (typesApi) {
                typesApi = typesApi.map(y => {
                    return {
                        id: y.id,
                        name: y.name
                    }
                })
            }
            await Type.bulkCreate(typesApi)
            res.send(typesApi.map(p => p.name))
            
        } else {
            const typesBD = await Type.findAll()
            let typesBaseDatos = typesBD.map((e) => {
                return  {
                    id: e.id,
                    name: e.name
                }
            })
            res.send(typesBaseDatos)
            
        }
    } catch (error) {
        next(error)
    }
    
})

module.exports = router