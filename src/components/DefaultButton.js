import React, { Component, Fragment } from 'react'
import { Button, Typography } from 'antd'
import { ShoppingCart } from 'react-feather'

  //new button

  const buttonProps = {
    style: { marginBottom: 5, width: '100px', background: "var(--primary)", borderColor: "var(--primary)" },
    shape: 'round',
    block: 'false',
    size: 'large',
    type: 'primary'
  };
  
  class DefaultButton extends Component {
    constructor(props) {
      super(props)
      this.state = { showPopup: false }
    }
  
    togglePopup() {
      this.setState({
        showPopup: !this.state.showPopup
      })
    }
  
    render() {
      const { children } = this.props
      return (
            <Button {...buttonProps} icon={<ShoppingCart />} onClick={this.togglePopup.bind(this)}>
            </Button>
      )
    }
  }

  export default DefaultButton