const fetch = require("node-fetch");

exports.handler = async function(event, context, callback) {   
    // Get request's body -- https://deploy-preview-11--upbeat-jones-648b6c.netlify.app/.netlify/functions/payment-methods

    if (event.body) {
        let cartRequest = event.body
    } else {
        cartRequest = {PublicToken: 'abcdefghijk'}
    }

    // Validate that the request is coming from Snipcart
    // const response = await fetch(`https://payment.snipcart.com/api/public/custom-payment-gateway/validate?publicToken=${request.PublicToken}`)
    // const response = await fetch(`https://payment.snipcart.com/api/public/custom-payment-gateway/validate?publicToken=${cartRequest.PublicToken}`)

    // // Return a 404 if the request is not from Snipcart
    // if (!response.ok) return {
    //     statusCode: 404,
    //     body: ""
    // }

    // Create a payment method list
    let paymentMethodList = [{
        id: 'mercado_pago',
        name: 'Mercado Pago',
        iconUrl: 'https://www.flaticon.es/premium-icon/icons/svg/1078/1078454.svg',
        checkoutUrl: 'https://google.com',
    }]

    // Return successful status code and available payment methods
    return {
        statusCode: 200,
        body: JSON.stringify(paymentMethodList)
    };
}