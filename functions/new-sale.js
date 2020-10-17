const { Coda } = require('coda-js');
// const querystring = require('querystring');

const codajs = new Coda(process.env.GATSBY_CODA_AUTH);

exports.handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }
  
    // When the method is POST, the name will no longer be in the event’s
    // queryStringParameters – it’ll be in the event body encoded as a query string
    //const params = querystring.parse(event.body);
    const params = JSON.parse(event.body);
    const orderCompleted = params.eventName || "nope";
    const nameColumn = process.env.GATSBY_CODA_NOMBRE;
    const quantityColumn = process.env.GATSBY_CODA_CANTIDAD;
    const priceColumn = process.env.GATSBY_CODA_PRECIO;
    const UIDColumn = process.env.GATSBY_CODA_UID;
    const userColumn = process.env.GATSBY_CODA_USER;
    const imputableColumn = process.env.GASTBY_CODA_IMPUTABLE;
    const facturaColumn = process.env.GATSBY_CODA_FACTURA;
    const idPagoColumn = process.env.GATSBY_CODA_IDPAGO;
    const agenteColumn = process.env.GATSBY_CODA_AGENT;
    const ipColumn = process.env.GATSBY_CODA_IP;

    if (orderCompleted == "order.completed") {
        const userInfo = params.content.user;
        const itemInfo = params.content.items;
        const invoiceNumber = params.content.invoiceNumber;
        const paymentTransactionId = params.content.paymentTransactionId;
        const ipAddress = params.content.ipAddress;
        const userAgent = params.content.userAgent;

        const transactionUser = userInfo.email;

        const table = await codajs.getTable(process.env.GASTBY_CODA_DOC, process.env.GATSBY_CODA_TABLE);

        for (var i = 0; i < itemInfo.length; i++) {

        await table.insertRows([
          [
            { column: nameColumn, value: itemInfo[i].name },
            { column: userColumn, value: transactionUser },
            { column: priceColumn, value: itemInfo[i].totalPriceWithoutTaxes },
            { column: UIDColumn, value: itemInfo[i].uniqueId },
            { column: quantityColumn, value: itemInfo[i].quantity },
            { column: imputableColumn, value: itemInfo[i].taxable },
            // { column: facturaColumn, value: invoiceNumber },
            // { column: idPagoColumn, value: paymentTransactionId },
            // { column: agenteColumn, value: userAgent },
            // { column: ipColumn, value: ipAddress }
          ],
        ]);

        }

        return {
        statusCode: 200,
        body: `Hello, ${transactionUser}! Your info has been sent 👋`
        // body: JSON.stringify(orderCompleted)
        };
      
    } else {
  
        return {
        statusCode: 200,
        body: "not an order"
        // body: JSON.stringify(orderCompleted)
        };
    }
  };