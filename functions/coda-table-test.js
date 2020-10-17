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

        // const table = await codajs.getTable(process.env.GASTBY_CODA_DOC, process.env.GATSBY_CODA_TABLE);

        const orderBody = {
          ColumnNameID: nameColumn,
          ColumnQuantityID: quantityColumn,
          ColumnPriceID: priceColumn,
          ColumnUID: UIDColumn,
          ColumnUser: userColumn,
          test: itemName,
          test2: itemQuantity,
          test3: transactionUID,
          test4: transactionUser,
          test5: itemPrice
        };

        return {
          statusCode: 200,
          body: JSON.stringify(orderBody)
        };
      
    } else {
  
        return {
        statusCode: 200,
        body: "not an order"
        // body: JSON.stringify(orderCompleted)
        };
    }
  };