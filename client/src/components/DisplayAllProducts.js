import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductTable from "./ProductTable";
// import Filters from "./Filters";
import Logout from "../components/Logout";
import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants";

export default class DisplayAllProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      tempProducts: [],

    };
  }

  componentDidMount() {
    axios
      .get(`${SERVER_HOST}/products`, { headers: { "authorization": localStorage.token } })
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
          } else {
            console.log("Records read");
            this.setState({ products: res.data }, () => {
              this.setState({ tempProducts: this.state.products });
            });
          }
        } else {
          console.log("Record not found");
        }
      });
  }

  handleClick = (e) => {
    if (e.target.value === "Ascending") {
      /// SORT IN ASCENDING ORDER///
      this.setState({
        tempProducts: this.state.products.sort((a, b) =>
          a.name.localeCompare(b.name)
        ),
      });
    } else {
      /// SORT IN DESCENDING ORDER///
      this.setState({
        tempProducts: this.state.products.sort((a, b) =>
          b.name.localeCompare(a.name)
        ),
      });
    }
    console.log("sort by name");
  };


  handleDescClick = (e) => {
    if (e.target.value === "Ascending") {
      /// SORT IN ASCENDING ORDER///
      this.setState({
        tempProducts: this.state.products.sort(
          (a, b) => a.description.localeCompare(b.description)
        ),
      });
    } else {
      /// SORT IN DESCENDING ORDER///
      this.setState({
        tempProducts: this.state.products.sort(
          (a, b) => b.description.localeCompare(a.description)
        ),
      });
    }
  };


  handlePriceClick = (e) => {
    if (e.target.value === "Ascending") {
      /// SORT IN LOW PRICE///
      this.setState({
        tempProducts: this.state.products.sort(
          (a, b) => a.price - b.price
        ),
      });
    } else {
      /// SORT IN HIGH ORDER///
      this.setState({
        tempProducts: this.state.products.sort(
          (a, b) => b.price -a.price
        ),
      });
    }
  };


  handleCategoryClick = (e) => {
    if (e.target.value === "Ascending") {
      /// SORT IN ASCENDING ORDER///
      this.setState({
        tempProducts: this.state.products.sort((a, b) =>
          a.category.localeCompare(b.category)
        ),
      });
    } else {
      /// SORT IN DESCENDING ORDER///
      this.setState({
        tempProducts: this.state.products.sort((a, b) =>
          b.category.localeCompare(a.category)
        ),
      });
    }
    console.log("sort by category");
  };






  handleSearch = (e) => {
    const search = e.target.value.toLowerCase().trim();
    if (search == "") {
    
      return this.state.tempProducts;
    }
    else{
      this.setState({
        tempProducts: this.state.products.filter(
          (product) =>
            product.name.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search) ||
            product.price.toString().includes(search) ||
            product.category.toLowerCase().includes(search)
        ),
      });
    }
  }




  render() {
    return (

      <div>
        <header>                                                               
            <div className="topnav">
                <img className="hp" src="./Image/Callaghans-Butchers-logo-lrg.png" width="250"  alt=""/>
                <a href="Home">Home</a>
              </div>
        </header>
      

<main>

{localStorage.accessLevel > ACCESS_LEVEL_GUEST ? (
          <div className="logout">
            {localStorage.profilePhoto !== "null" ? (
              <img
                id="profilePhoto"
                src={`data:;base64,${localStorage.profilePhoto}`}
                alt=""
                style={{ width: "100px", height: "100px" }}
              />
            ) : null}
            <Logout />
          </div>
        ) : (
          <div>
            <Link className="green-button" to={"/Login"}>
              Login
            </Link>
            <Link className="blue-button" to={"/Register"}>
              Register
            </Link>
            <Link className="red-button" to={"/ResetDatabase"}>
              Reset Database
            </Link>
            <br />
            <br />
            <br />
          </div>
        )}

<input id="search" type="text" placeholder="  Search" onChange= {this.handleSearch}/>

     <div className="form-container">
     <div className="sort-container">
        <select id="alignFilter" onChange={this.handleClick}>
          <option value="Name list">Name List</option>
          <option value="Ascending">A-Z</option>
          <option value="Descending">Z-A</option>
        </select>
      </div>
       
      <select  id="alignFilter" onChange={this.handleDescClick}>
              <option value="Name list">Description List </option>
              <option value="Ascending">Ascending</option>
              <option value="Descending">Descending</option>
            </select>

            <select  id="alignFilter" onChange={this.handlePriceClick}>
              <option value="Name list">Price List </option>
              <option value="Ascending">Low</option>
              <option value="Descending">High</option>
            </select>

            <div className="form-container">
     <div className="sort-container">
        <select id="alignFilter" onChange={this.handleCategoryClick}>
          <option value="Name list">Category</option>
          <option value="Ascending">A-Z</option>
          <option value="Descending">Z-A</option>
        </select>
      </div>

</div>
        {/* <Filters products={this.state.products} /> */}

        <div className="table-container">
          <ProductTable products={this.state.tempProducts}/>

          {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? (
            <div className="add-new-product">
              <Link className="blue-button" to={"/AddProduct"}>
                Add New Product
              </Link>
            </div>
          ) : null}
        </div>
      </div>
</main>


<img  src={require(`../Image/bakery-53.png`)} className="imagen1"  alt=""/>
      <footer>
     
            <div class="row">
                <div class="column">
                    <h3><strong>Opening hours:</strong></h3>
                    <h5>Monday-Saturday: 9am - 6pm</h5>
                    <h5> Closed on Sunday</h5>
                </div>

                <div class="column">
                    <h3> <strong>Visit Us:</strong></h3>
                    <h5>Unit 4, The Anchorage</h5>
                    <h5> Bettystown, Co. Meath, A92 RK38</h5>
                    <h5>(041) 988 7885</h5>
                </div>

                <div class="column">
                    <h3><strong>Follow us:</strong></h3>
            
                    <a href="https://www.facebook.com/callaghan.bettystown/"><img src={require(`../Image/facebook.png`)}   class="icon-style" width="50" alt="facebook"/></a>
                    <a href="https://www.instagram.com/callaghanbutchers/"><img src={require(`../Image/instagram_grey_icon.png`)} class="icon-style"   width="50" alt="instagram"/></a>
                </div>  
            </div>
        </footer>


      </div>
    );
  }
}