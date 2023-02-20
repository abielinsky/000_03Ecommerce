import React, {Component} from "react"
import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants"


export default class ProductTableRow extends Component
{
    render()
    {
        return (
            <tr>
                <td>{this.props.product.id}</td>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.description}</td>
                <td>{this.props.product.price}</td>
                <td>{this.props.product.weight}</td>
                <td>{this.props.product.image}</td>
                <td>{this.props.product.category}</td>
                <td>
                    {localStorage.accessLevel > ACCESS_LEVEL_GUEST ? <Link className="green-button" to={"/EditProduct/" + this.props.product._id}>Edit</Link> : null}

                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/DeleteProduct/" + this.props.product._id}>Delete</Link> : null}
                </td>
            </tr>
        )
    }
}
