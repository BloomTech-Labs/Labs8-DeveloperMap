import React from 'react';
import Checkout from '../../Stripe/Checkout';
import {ModalContainer} from '../../../styles/ModalGlobalStyle';

class EmployerBilling extends React.Component {
    render() {
        return (
            <ModalContainer>
              <Checkout 
                name={'Pay Me Money'}
                description={'All of it'}
                amount={1}
              />
            </ModalContainer>
        )
    }
}

export default EmployerBilling;