//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const axios = require('axios');
const server = require('./src/app.js');
const { conn, Country, Activity } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({force: true}).then( () => {
  //agregar datos de "all countries" al db
  const datos = axios.get(`https://restcountries.com/v3/all`)
  datos
    .then(r => r.data)
    .then((data) => {
      //console.log(data[1])
      var lista = data.map(item => {
        return{
          id: item.cca3 || item.cioc,
          name: item.name.common,
          flag: item.flags[0] || item.flags[1],
          continent: item.continents[0],
          capital: item.capital? item.capital[0] : '',
          subregion: item.subregion,
          area: item.area,
          population: item.population
        }
      })
      return lista
    })
    .then(async (lis) => {
      let sentData = await Country.bulkCreate(lis);
      //console.log('yes')
    })
    .catch((err) => console.log('error:', err))
  server.listen(3001, () => {
    console.log('%s listening at 3001'); //eslint-disable-line no-console
  });
});
