import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import axios from "axios";
import { SERVER_HOST } from "../../config/global_constants";

export default class LoadProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToDisplayAllProducts: false,

        };
    }

    // test


    componentDidMount() {
        let url = `${process.env.PUBLIC_URL}/data.json`;
        fetch(url)
            .then((res) => res.json()) //.then( res =>res.data)
            .then((results) => {
                let data = JSON.parse(JSON.stringify(results));
                console.log(data[0]);
                axios.post(`${SERVER_HOST}/products`, data, {headers:{"authorization":localStorage.token}})
                    .then(res => {
                        if (res.data) {
                            if (res.data.errorMessage) {
                                console.log(res.data.errorMessage);
                            } else {
                                console.log("Records added");
                                this.setState({ redirectToDisplayAllProducts: true });
                            }
                        } else {
                            console.log("Record not added");
                        }
                    });
            });
    }

    render() {
        return (
            <div>
                <h5>hello again!</h5>
                {this.state.redirectToDisplayAllProducts ? <Redirect to="/Products"/> : <p>Records not added</p>}
            </div>
        );
    }
}
