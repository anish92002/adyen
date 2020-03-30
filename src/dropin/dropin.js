// 0. Gets Origin Key and Gets Payment Methods  
getOriginKey().then(originKey => {
    getPaymentMethods().then(paymentMethodsResponse => {
        
        // 1. Create an instance of AdyenCheckout
        const checkout = new AdyenCheckout({
            //implemented Spanish localization
            locale: 'de-DE',
            environment: 'test',
            originKey: originKey, // Origin key
            paymentMethodsResponse,
            //removePaymentMethods: ['paysafecard', 'c_cash']
        });

        // 2. Create and mount the Component

        


        const dropin = checkout
            .create('dropin', {
                // Events
                onSelect: activeComponent => {
                    updateStateContainer(activeComponent.data); // Demo purposes only
                },
                onChange: state => {
                    updateStateContainer(state); // Demo purposes only
                },
                onSubmit: (state, component) => {
                    
                    makePayment(state.data);
                    dropin.setStatus('success', { message: 'Payment successful!' });
                    getPaymentDetails();
                    if (resultCode == 'RedirectShopper') {
                       
                        
                    } else {
                        message: 'Payment unsuccessful';
                    }
                }
            })
            .mount('#dropin-container');

    });
});
