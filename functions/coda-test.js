const coda = require('coda-js')

const coda = new Coda(process.env.CODA_AUTH);

exports.handler = async function(event, context, callback) { 
    const whoAmI = await coda.whoAmI();
    console.log(whoAmI);
}