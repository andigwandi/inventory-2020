// import React, { Component } from "react";
// import axios from "axios";
// import { Modal, Button } from "react-bootstrap";
// import moment, { now } from "moment";

// class ExpiredProduct extends Component{

//     constructor(props) {
//         super(props);
//         this.state = {
//             products: []
//         };
//     };
//     render(){
//         var { products } = this.state;

//         var renderExpiredProduct = () => {
//             if( products.length > 0){
//                 var list = products.map().filter(x => x.expdate < moment().format("YYYY-mm-dd"));
//                 return <p>ExpiredProduct: {list}</p>;
//             }
//         };

//         return(
//             <div>someeging{renderExpiredProduct()}</div> 
//         );
//     }
// }

// export default ExpiredProduct;