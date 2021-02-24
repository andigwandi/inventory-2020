import React, { Component } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";


const HOST = "http://localhost:8001";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barcode: 0,
      name: "",
      price: 0,
      quantity: 0,
      departments: [],
      department: "",
      expdate: "",
      productModal: false,
      items: 0
    };

    this.handleDepartment = this.handleDepartment.bind(this);
  }
  componentDidMount() {
    this.setState({ barcode: this.props.barcode });
    this.setState({ newBarCode: this.props.barcode });
    this.setState({ name: this.props.name });
    this.setState({ newName: this.props.name });
    this.setState({ price: this.props.price });
    this.setState({ newPrice: this.props.price });
    this.setState({ quantity: this.props.quantity });
    this.setState({ newQuantity: this.props.quantity });
    this.setState({ expdate: this.props.expdate });
    this.setState({ newexpdate: this.props.expdate });
    this.setState({ department: this.props.department });
    this.setState({ newdepartment: this.props.department });
    this.setState({ items: this.props.items });
    this.setState({ newditems: this.props.items });

    var url = HOST + `/api/v1/department/departments/active`;
    axios.get(url).then(response => {
      this.setState({ departments: response.data });
    });

  };

  handleBarcode = e => {
    this.setState({ newBarCode: e.target.value });
  };
  handleName = e => {
    this.setState({ newName: e.target.value });
  };
  handlePrice = e => {
    this.setState({ newPrice: e.target.value });
  };
  handleExpDate = e => {
    this.setState({ newexpdate: e.target.value });
  };
  handleQuantity = e => {
    this.setState({ newQuantity: e.target.value });
  };
  handleDepartment = e => {
    this.setState({ newdepartment: e.target.value });
  };

  handleItems = e => {
    this.setState({ newditems: e.target.value });
  };

  handleProduct = e => {
    e.preventDefault();
    this.setState({ productModal: false });
    console.log("id", this.props._id);
    var editProduct = {
      barcode: this.state.newBarCode,
      name: this.state.newName,
      quantity: this.state.newQuantity,
      price: this.state.newPrice,
      _id: this.props._id,
      expdate: this.state.newexpdate,
      department: this.state.newdepartment,
      items: this.state.newditems
    };

    this.props.onEditProduct(editProduct);
    this.setState({ barcode: this.state.newBarCode });
    this.setState({ name: this.state.newName });
    this.setState({ quantity: this.state.newQuantity });
    this.setState({ price: this.state.newPrice });
    this.setState({ expdate: this.state.newexpdate });
    this.setState({ department: this.state.newdepartment });
    this.setState({ items: this.state.newditems });

  };

  handleDeleteProduct = e => {
    e.preventDefault();
    console.log("id", this.props._id);
    this.props.onDeleteProduct(this.props._id);
  };

  render() {
    const {
      newBarCode,
      newName,
      newPrice,
      newQuantity,
      newexpdate,
      newdepartment,
      barcode,
      name,
      price,
      department,
      expdate,
      quantity,
      items,
      newditems
    } = this.state;

    var { departments } = this.state;

    var renderDepartment = () => {
      if (departments.length === 0) {
        return <option>No department</option>
      } else {
        return departments.map(department => (
          <option key={department.name}>{department.name}</option>
        ));
      }
    };

    return (
      <tr>
        <td>
          <a href=""> {barcode} </a>
        </td>
        <td> {name}  </td>
        <td> € {price} </td> <td> {quantity} </td><td>{items}</td>
        <td>{department}</td>
        <td class={(expdate > moment().format("YYYY-MM-DD") ? "" : "quadrat")}> {expdate}</td>
        <td>
          <a
            className="btn btn-info"
            onClick={() => this.setState({ productModal: true })}
          >
            <i className="glyphicon glyphicon-pencil" />
          </a>
          <a
            className="btn btn-info"
            onClick={this.handleDeleteProduct}
          >
            <i className="glyphicon glyphicon-trash" />
          </a>
        </td>
        <Modal show={this.state.productModal}>
          <Modal.Header>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal" name="newProductForm">
              <div className="form-group">
                <label className="col-md-4 control-label" for="barcode">
                  Barcode
                </label>
                <div className="col-md-4">
                  <input
                    name="barcode"
                    placeholder="Barcode"
                    onChange={this.handleBarcode}
                    className="form-control"
                    value={newBarCode}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" for="name">
                  Name
                </label>
                <div className="col-md-4">
                  <input
                    name="name"
                    placeholder="Name"
                    onChange={this.handleName}
                    className="form-control"
                    value={newName}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" for="price">
                  Unit Price
                </label>
                <div className="col-md-4">
                  <input
                    name="price"
                    placeholder="Unit Price"
                    className="form-control"
                    onChange={this.handlePrice}
                    value={newPrice}
                    type="number"
                    step="any"
                    min="0"
                  />
                </div>
              </div>
              <div className="form-group">
                <label
                  className="col-md-4 control-label"
                  for="quantity_on_hand"
                >
                  Quantity On Hand
                </label>
                <div className="col-md-4">
                  <input
                    name="quantity_on_hand"
                    placeholder="Quantity On Hand"
                    onChange={this.handleQuantity}
                    value={newQuantity}
                    className="form-control"
                    type="number"
                    step="any"
                    min="0"
                  />
                </div>
              </div>
              <div className="form-group">
                <label
                  className="col-md-4 control-label"
                  for="items_per_box"
                >
                  Items Per Box
                </label>
                <div className="col-md-4">
                  <input
                    name="items_per_box"
                    placeholder="Items Per Box"
                    onChange={this.handleItems}
                    value={newditems}
                    className="form-control"
                    type="number"
                    step="any"
                    min="0"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" for="expdate">
                  Date Exp
                </label>
                <div className="col-md-4">
                  <input
                    name="expdate"
                    placeholder="Date Exp"
                    className="form-control date"
                    onChange={this.handleExpDate}
                    value={newexpdate}
                    type="date"
                  />
                </div>
              </div>
              <div className="form-group">
                <label
                  className="col-md-4 control-label"
                  for="departments"
                >
                  Department
                </label>
                <div className="col-md-4">
                  <select id="departments" onChange={this.handleDepartment} value={department}>
                    {renderDepartment()}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" for="image">
                  Upload Image
                </label>
                <div className="col-md-4">
                  <input type="file" name="image" />
                </div>
              </div>
              <br /> <br /> <br />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ productModal: false })}>
              Close
            </Button>
            <Button onClick={this.handleProduct}>Update</Button>
          </Modal.Footer>
        </Modal>
      </tr>
    );
  }
}

export default Product;
