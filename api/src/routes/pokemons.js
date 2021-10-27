const { axios } = require('axios')
const express = require('express')
const router = express.Router()
const { Pokemon, Type } = require('../db.js')
const { v4: uuidv4 } = require('uuid');


// router.get('/', async(req,res)=>{
    // try {
        // const pApi = await axios.get('https://pokeapi.co/api/v2/pokemon').data.results
        //     let pData = []
        //         for (let p of pApi) {  
        //             pData.push(axios.get(p.url))
        //         }
        //         let rApi = await Promise.all(pData).map(pok => {
                    
        //             return ({
        //                 id: pok.data.id,
        //                 name: pok.data.name,
        //                 type: pok.data.types.map(e => e.type.name),
        //                 img: pok.data.sprites.other.dream_world.front_default,
        //                 attack: pok.data.stats[1].base_stat,
                        
        //             })
        //         })
        //  res.status(200).json(rApi)
                
        
    // } catch (error) {
    //     res.status(404).json({ error})
    // }

// })

// let getPokemonApi = async () => {
// 	let info = [];
// 	for (let i = 1; i <= 40; i++) {
// 		info.push(axios.get('https://pokeapi.co/api/v2/pokemon/' + i));
// 	}
// 	return Promise.all(info).then((response) => {
// 		const pokemones = response.map((info) => {
// 			return (poke = {
// 				name: info.data.name,
// 				id: info.data.id,
// 				img: info.data.sprites.other.dream_world.front_default,
// 				types: info.data.types.map((e) => e.type.name),
// 				attack: info.data.stats[1].base_stat,
// 			});
// 		});
// 		return pokemones;
// 	});
// };

module.exports = router;