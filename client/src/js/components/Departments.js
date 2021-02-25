import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Department from "./Department"
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const HOST = process.env.REACT_APP_API_ENDPOINT;

class DepartmentInventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departments: [],
      departmentModal: false,
      name: "",
      snackMessage: "",
      isActive: false
    };

    this.handleNewDepartment = this.handleNewDepartment.bind(this);
    this.handleDeleteDepartment = this.handleDeleteDepartment.bind(this);
    this.handleEditDepartment = this.handleEditDepartment.bind(this);
    this.handleSnackbar = this.handleSnackbar.bind(this);

    this.handleState = this.handleState.bind(this);    
    this.handleName = this.handleName.bind(this);
  }

  componentDidMount() {
    var url = HOST + `/api/v1/department/departments`;
    axios.get(url).then(response => {
      this.setState({ departments: response.data });
    });
  }

  handleNewDepartment = e => {
    e.preventDefault();
    this.setState({ departmentModal: false });
    var newDepartment = {
      name: this.state.name,
      active: this.state.isActive
    };

    axios
      .post(HOST + `/api/v1/department/department`, newDepartment)
      .then(
        response =>
          this.setState({ snackMessage: "Department Added Successfully!" }),
        this.handleSnackbar()
      )
      .catch(err => {
        console.log(err),
          this.setState({ snackMessage: "Department failed to save" }),
          this.handleSnackbar();
      });
  };
  handleEditDepartment = editDepartment => {
    axios
      .put(HOST + `/api/v1/department/department`, editDepartment)
      .then(response => {
        this.setState({ snackMessage: "Department Updated Successfully!" });
        this.handleSnackbar();
        return true;
      })
      .catch(err => {
        console.log(err);
        this.setState({ snackMessage: "Department Update Failed!" }),
          this.handleSnackbar();
        return false;
      });
  };

  handleDeleteDepartment = departmentId => {
    axios
      .delete(HOST + `/api/v1/department/department/${departmentId}`)
      .then(response => {
        this.setState({ snackMessage: "Department Deleted Successfully!" });
        this.handleSnackbar();
        return true;
      })
      .catch(err => {
        console.log(err);
        this.setState({ snackMessage: "Department Delete Failed!" }),
          this.handleSnackbar();
        return false;
      });
  };

  handleSnackbar = () => {
    var bar = document.getElementById("snackbar");
    bar.className = "show";
    setTimeout(function() {
      bar.className = bar.className.replace("show", "");
    }, 3000);
  };

  handleName = e =>{
    this.setState({ name: e.target.value });
  };
  
  handleState = e => {
    this.setState({ active: e.target.checked });
  };

  render() {
    var { departments, snackMessage } = this.state;

    var renderDepartments = () => {
      if(departments.length === 0) {
        return <p>{departments}</p>
      } else {
        return departments.map(department => (
          <Department {...department} onEditDepartment={this.handleEditDepartment} onDeleteDepartment={this.handleDeleteDepartment} />
        ));
      }
    };
    return(
      <div>
        <Header />
        <div class="container">
        <a
          class="btn btn-success pull-right"
          onClick={() => this.setState({ departmentModal: true })}
        >
          <i class="glyphicon glyphicon-plus" /> Add New Item
        </a>
          <br />
          <br />

          <table class="table table-bordered table-responsive table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">State</th>
                <th />
              </tr>
            </thead>
            <tbody>{renderDepartments()}</tbody>
          </table>
        </div>

        <Modal show={this.state.departmentModal}>
          <Modal.Header>
            <Modal.Title>Add Department</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form class="form-horizontal" name="newDepartmentForm">
              <div class="form-group">
                  <label class="col-md-4 control-label" for="name">
                    Name
                  </label>
                  <div class="col-md-4">
                    <input
                      name="name"
                      placeholder="Name"
                      class="form-control"
                      onChange={this.handleName}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-4 control-label" for="state">
                    Is Active
                  </label>
                  <div class="col-md-4">
                    <input 
                      name="state"
                      placeholder=" Is Active"
                      class="form-check-input"
                      type="checkbox" 
                      onChange={this.handleState}
                      // checked={this.state.isActive}
                    />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ departmentModal: false })}>
                Close
              </Button>
              <Button onClick={this.handleNewDepartment} >Submit</Button>
          </Modal.Footer>
          </Modal>
        <div id="snackbar">{snackMessage}</div>
      </div>
    );
  }
}

export default DepartmentInventory;