const coda = require('coda-js')

const coda = new Coda(process.env.CODA_AUTH);

// trick for using async in a script
(async () => {
    const whoAmI = await coda.whoAmI();
    console.log(whoAmI);
  })().catch((error) => console.log(error));