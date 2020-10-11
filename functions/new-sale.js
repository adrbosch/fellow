const { Coda } = require('coda-js');

const codajs = new Coda(process.env.GATSBY_CODA_AUTH);

exports.handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }
  
    // When the method is POST, the name will no longer be in the event’s
    // queryStringParameters – it’ll be in the event body encoded as a query string
    const params = querystring.parse(event.body);
    const orderCompleted = params.eventName || "nope";

    if (orderCompleted === "order.completed") {
        const userInfo = params.content.user;
        const itemInfo = params.content.items;

        const itemName = item.name;
        const itemQuantity = item.quantity;
        const itemPrice = item.price;
        const transactionUID = item.uniqueId;
        const transactionUser = item.email;
        //Get the table info
        const table = docs.getTable(process.env.GATSBY_CODA_TABLE);

        await table.insertRows([
            [
              { column: process.env.GATSBY_CODA_NOMBRE, value: itemName },
              { column: process.env.GATSBY_CODA_CANTIDAD, value: itemQuantity },
              { column: process.env.GATSBY_CODA_PRECIO, value: itemPrice },
              { column: process.env.GATSBY_CODA_UID, value: transactionUID },
              { column: process.env.GATSBY_CODA_USER, value: transactionUser },
              { column: 'Completed', value: true }
            ]
        ]);

        return {
            statusCode: 200,
            body: "order completed"
        }
    }
  
    return {
      statusCode: 200,
      body: "order NOT completed"
    };
  };