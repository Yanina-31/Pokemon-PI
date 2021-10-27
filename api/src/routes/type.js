const express = require('express')
const router = express.Router()
const axios = require('axios');
require('dotenv').config();
const {Type} = require('../db')
// const { v4: uuidv4 } = require('uuid');


router.get('/', async (req, res) => {
    try {
        let types = await axios.get('https://pokeapi.co/api/v2/type')
        types = types.data.results;

        const mapTypes = types.map(e => {
            return {
                idPoke:e.id,
                name: e.name
            }
        })
        mapTypes.forEach((e) => {
            Type.findOrCreate({
                where: {
                    idPoke:e.id,
                    name: e.name
                }
            })
        })
        
        res.json(mapTypes)
    }
    catch(e){
        res.send(e)
    }
})

module.exports = router;