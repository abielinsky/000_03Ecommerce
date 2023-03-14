import React, { Component } from "react";
import ProductTableRow from "./ProductTableRow";

export default class ProductTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tempProducts: this.props.products,
        };
    }
    chunk(arr, size){
        let res = [];
        for(let i = 0; i < arr.length; i++) {
            if(i % size === 0){
                res.push({idx:i, group:[arr[i]]});
            }
            else{
                res[res.length-1].group.push(arr[i]);
            };
        };
        return res;
    }
    render() {
        return (
            <>
                { this.chunk(this.props.products, 5).map((groups) => (
                    <div className="card-deck" key={groups.idx}>
                        { groups.group.map((product, index)=>
                            <ProductTableRow
                                key={product._id}
                                product={product}
                                addToCart={this.props.addToCart} />
                        )}
                    </div>

                ))}

            </>
        );
    }
}