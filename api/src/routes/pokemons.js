const  axios  = require('axios')
const express = require('express')
const router = express.Router()
const { Pokemon, Type } = require('../db.js')
const { v4: uuidv4 } = require('uuid');


router.get('/', async(req,res)=>{    
    const pokeApi =  (await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')).data.results
    let pokeData = []
        for (let p of pokeApi) {  
            pokeData.push(axios.get(p.url))
        }
        let resulApi = (await Promise.all(pokeData)).map(poke => {
            return ({
                id: poke.data.id,
                name: poke.data.name,
                type: poke.data.types.map(e => e.type.name),
                img: poke.data.sprites.other.dream_world.front_default,
                attack: poke.data.stats[1].base_stat,
                defense: poke.data.stats[2].base_stat,
                
            })
        })
    res.status(200).send(resulApi)
})


router.get('/:id', async(req,res)=>{
    const {id}= req.params;
        const resPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        let poke = resPoke
        let obtenerId = {
            id: poke.data.id,
            name: poke.data.name,
            type: poke.data.types.map(e => e.type.name),
            img: poke.data.sprites.other.dream_world.front_default,
            life: poke.data.stats[0].base_stat,
            attack: poke.data.stats[1].base_stat,
            defense: poke.data.stats[2].base_stat,
            speed: poke.data.stats[5].base_stat,
            weight: poke.data.weight,
            height: poke.data.height,
        }
    
        
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

router.get('/dataBase', async(req,res)=>{
    const { name} = req.query;
try {
            
    const pBD = await Pokemon.findAll({
        where: {
            name: name
            },
        include: {
            model: Type
        }
    })
    if (pBD != 0) {         
        let respuesta = pBD.map(p=>{
            return ({
                id: p.id,
                name: p.name,
                life: p.life,
                attack: p.attack,
                defense: p.defense,
                speed: p.speed,
                weight: p.weight,
                height: p.height,
                img: p.image,
                type: p.types.map((p)=>p.name),
            })
        })
        res.status(200).send(respuesta)
    }
} catch (error) {
    return error.message.includes('404') 
    ? res.status(404).send('No se pudo encontrar al pokemon')
    : res.status(500).send(`Server error: ${error}`)
}
});

module.exports = router;