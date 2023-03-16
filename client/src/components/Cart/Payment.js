import React, {Component} from "react"
import axios from "axios"
import {Redirect} from "react-router-dom"

import {SANDBOX_CLIENT_ID, SERVER_HOST} from "../../config/global_constants";
import PayPalMessage from "./PayPalMessage"
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import AppNavbar from "../AppNavbar";

export const Payment= class extends Component{
    constructor(props)
    {
        super(props)

        this.state = {redirectToPayPalMessage:false,
                      payPalMessageType:null,
                      payPalOrderID:null}

        console.log('data from cart: ', this.props.cartID, this.props.amount);
    }

    createOrder = (data, actions) => 
    {
        console.log('data before send to paypal: ', this.props.cartID, this.props.amount);
        return actions.order.create({purchase_units:[{amount:{value:this.props.amount}}]})
    }
    
    onApprove = paymentData =>
    {      
        axios.post(`${SERVER_HOST}/orders/${paymentData.orderID}`, undefined, { headers: { "authorization": localStorage.token}})
        .then(res => 
        {                   
            this.setState({payPalMessageType:PayPalMessage.messageType.SUCCESS, 
                           payPalOrderID:paymentData.orderID, 
                           redirectToPayPalMessage:true}) 
        })
        .catch(errorData =>
        {           
            this.setState({payPalMessageType:PayPalMessage.messageType.ERROR, 
                           redirectToPayPalMessage:true}) 
        })
    }
        
    onError = errorData => 
    {
        this.setState({payPalMessageType:PayPalMessage.messageType.ERROR, 
                       redirectToPayPalMessage:true})         
    }
    
    
    onCancel = cancelData => 
    {
        // The user pressed the Paypal checkout popup window cancel button or closed the Paypal checkout popup window
        this.setState({payPalMessageType:PayPalMessage.messageType.CANCEL, 
                       redirectToPayPalMessage:true})       
    }
       
    render()
    {
        return (
            <div>
                <AppNavbar></AppNavbar>
                {this.state.redirectToPayPalMessage ? <Redirect to= {`/PayPalMessage/${this.state.payPalMessageType}/${this.state.payPalOrderID}`}/> : null}            
            
                <PayPalScriptProvider options={{currency:"EUR", "client-id":SANDBOX_CLIENT_ID }}>
                    <PayPalButtons style={{layout: "horizontal"}} 
                        createOrder={this.createOrder} 
                        onApprove={this.onApprove} 
                        onError={this.onError} 
                        onCancel={this.onCancel}/>
                </PayPalScriptProvider>
            </div>
        )
    }
}
