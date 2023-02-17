const { Router } = require('express');
const axios = require('axios');
const { Country, Activity, conn } = require('../db');


const {Op} = conn.Sequelize;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/countries', async (req, res, next) => {
    //chequear la implementacion
    var countryName = req.query.name;
    if(countryName !== undefined){
        countryName = countryName.toLowerCase();
        var busqueda = await Country.findAll({
            where: {
                name: {
                    [Op.substring]: countryName
                }
            }
        })
        if (busqueda.length === 0){
            return res.status(400).send('No matches found.')
        } else {
            acts = await Promise.all(
                busqueda.map(async item => {
                    return {
                        name: item.toJSON().name,
                        act: await item.getActivities()
                    }
                })
            )
            busqueda = busqueda.map(item => item.toJSON())
            res.status(200).send([busqueda, acts])
        }
    } else {next()}
})

router.get('/countries', async (req, res) => {
    const paises = await Country.findAll();
    acts = await Promise.all(
        paises.map(async item => {
            return {
                name: item.toJSON().name,
                act: await item.getActivities()
            }
        })
    )
    var resPaises = paises.map(item => item.toJSON());
    res.status(200).send([resPaises, acts]);
})


router.get('/countries/:id', async (req, res) => {
    const {id} = req.params;
    var searchById = await Country.findByPk(id);
    var acts = await searchById.getActivities();
    searchById = searchById.toJSON();
    if(acts.length > 0){
        searchById.acts = acts.map(item => {
            let data = item.toJSON();

            return {
                name: data.name,
                difficulty: data.difficulty,
                duration: data.duration,
                season: data.season
            }
        })
    }
    res.status(200).send(searchById)
})

router.post('/activities', async (req, res) => {
    const {name, difficulty, duration, season, listaPaises} = req.body;
    const act = await Activity.create({name, difficulty, duration, season})
    var busqueda = await Country.findAll({
        where: {
            name: {
                [Op.in]: listaPaises
            }
        }
    })
    busqueda = busqueda.map(item => item.toJSON());
    busqueda = busqueda.map(item => item.id);
    await act.setCountries(busqueda); //await act.addCountries(busqueda);
    res.status(200).send('Activity added to the database :D');
})

module.exports = router;

/*
GET https://restcountries.com/v3/all
GET https://restcountries.com/v3/name/{name}
GET https://restcountries.com/v3/alpha/{code}
*/
