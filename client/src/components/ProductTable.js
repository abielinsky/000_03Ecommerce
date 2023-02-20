import React, { Component } from "react";
import ProductTableRow from "./ProductTableRow";

export default class ProductTable extends Component {
    render() {
        return (
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Weight</th>
                    <th>Image</th>
                    <th>Category</th>
                </tr>
                </thead>

            

                <tbody>
  {this.props.products.map((product) => (
    <ProductTableRow key={product.id} product={product} />
  ))}
</tbody>
            </table>
        );
    }
}