import React, {PureComponent} from 'react';


class MercadoPagoCheckoutButton extends PureComponent {

    componentDidMount () {
        const script = document.createElement("script");

        script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
        script.setAttribute('data-preference-id', this.props.dataPreferenceId);
        script.async = true;

        this.mount.appendChild(script);
    }

  render () {
    return (
        <div className='ml-3' ref={ref => (this.mount = ref)}>
            {null}
        </div>
    );
  }
}

export default MercadoPagoCheckoutButton;


