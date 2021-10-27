const  axios  = require('axios')
const express = require('express')
const router = express.Router()
const { Pokemon, Type } = require('../db.js')
const { v4: uuidv4 } = require('uuid');


router.get('/', async(req,res)=>{    
    const pApi =  (await axios.get('https://pokeapi.co/api/v2/pokemon')).data.results
    let pData = []
        for (let p of pApi) {  
            pData.push(axios.get(p.url))
        }
        let rApi = (await Promise.all(pData)).map(pok => {
            
            return ({
                id: pok.data.id,
                name: pok.data.name,
                type: pok.data.types.map(e => e.type.name),
                img: pok.data.sprites.other.dream_world.front_default,
                attack: pok.data.stats[1].base_stat,
                
            })
        })
    res.status(200).send(rApi)
})


router.get('/:id', async(req,res)=>{
    const {id}= req.params;
        const resPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        let poke = resPoke
        let obtenerId = {
            id: poke.data.id,
            name: poke.data.name}
            
            // type: poke.data.types.map(e => e.type.name),
            // img: poke.data.sprites.other.dream_world.front_default,
            // attack: poke.data.stats[1].base_stat,
    
        
    res.status(200).send(obtenerId)
});

router.get('/name/:name', async(req,res)=>{
    const {name}= req.params;
    const resPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    let poke = resPoke
    let obtenerName = {
        id: poke.data.id,
        name: poke.data.name,
        type: poke.data.types.map(e => e.type.name),
        img: poke.data.sprites.other.dream_world.front_default,
        attack: poke.data.stats[1].base_stat,

    }
    res.status(200).send(obtenerName)
});




module.exports = router;