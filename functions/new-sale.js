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

    if (orderCompleted == "order.completed") {
        const userInfo = params.content.user;
        const itemInfo = params.content.items;

        const itemName = itemInfo.name;
        const itemQuantity = itemInfo.quantity;
        const itemPrice = itemInfo.price;
        const transactionUID = itemInfo.uniqueId;
        const transactionUser = userInfo.email;

                // {'column': process.env.GATSBY_CODA_NOMBRE, 'value': itemName},
                // {'column': process.env.GATSBY_CODA_CANTIDAD, 'value': itemQuantity},
                // {'column': process.env.GATSBY_CODA_PRECIO, 'value': itemPrice},
                // {'column': process.env.GATSBY_CODA_UID, 'value': transactionUID},
                // {'column': process.env.GATSBY_CODA_USER, 'value': transactionUser},

        //Get the table info
        const table = await codajs.getTable(process.env.GASTBY_CODA_DOC, process.env.GATSBY_CODA_TABLE);
        //Insert the data
        try {
          await table.insertRows([
            [
              { column: nameColumn, value: itemName },
              { column: quantityColumn, value: itemQuantity },
              // { column: priceColumn, value: itemPrice },
              // { column: UIDColumn, value: transactionUID },
              // { column: userColumn, value: transactionUser },
            ],
          ]);
        } catch (error) {
          console.log(error)
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
              result: "Completed"
            })
        }
    } else {
  
        return {
        statusCode: 200,
        body: "not an order"
        // body: JSON.stringify(orderCompleted)
        };
    }
  };