const { Coda } = require('coda-js');

const coda = require('coda-js')

const codajs = new Coda(process.env.GATSBY_CODA_AUTH);

exports.handler = async function(event, context, callback) { 
    const whoAmI = await codajs.whoAmI();
    console.log(whoAmI);
}