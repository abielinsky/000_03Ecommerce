import React, { Component } from "react";
import ProductTableRow from "./ProductTableRow";

export default class ProductTable extends Component {
    render() {
        return (
        
                <tbody>
  {this.props.products.map((product) => (
    <ProductTableRow key={product.id} product={product} />
  ))}
</tbody>
          
        );
    }
}