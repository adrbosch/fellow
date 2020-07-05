import { Component } from 'react'

export default class SetLanguageCart extends Component {
  render() {
    return (null)
  }
    
  componentDidMount() {
        window.Snipcart.api.session.setLanguage('es', {
            cart: {
              shipping_taxes_calculated_at_checkout: "Impuestos se incluyen en el precio."
            }
        });
    }
  }
