import React, { Component, isValidElement } from "react";
import { Modal, Button } from "react-bootstrap";

class Department extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        active: false,
        departmentModal: false
      };
    }
    componentDidMount() {

        this.setState({ name: this.props.name });
        this.setState({ active: this.props.active });
    };

    handleName = e => {
        this.setState({ newName: e.target.value });
    };
    handleState = () => {
        this.setState( activestate =>({
            active: !activestate.active
        }));
    };
    handleDepartment = e => {
        e.preventDefault();
        this.setState({ departmentModal: false });
        console.log("id", this.props._id);
        var editDepartment = {
            name: this.state.newName,
            _id: this.props._id,
            active: this.state.active
        };

        this.props.onEditDepartment(editDepartment);
        this.setState({ name: this.state.newName });
        this.setState({ active: this.state.newIsActive });
    };
    handleDeleteDepartment = e => {
        e.preventDefault();
        console.log("id", this.props._id);
        this.props.onDeleteDepartment(this.props._id);
    };

    render() {
        const{
            name,
            active,
            newName,
            newIsActive
        } = this.state;
        return(
            <tr>
                <td> {name} </td>
                <td> 
                    {active?"Active":"Disabled"}
                </td>
                <td>
                    <a
                        className="btn btn-info"
                        onClick={() => this.setState({ departmentModal: true })}
                    >
                        <i className="glyphicon glyphicon-pencil" />
                    </a>
                    <a
                        className="btn btn-info"
                        onClick={this.handleDeleteDepartment}
                    >
                        <i className="glyphicon glyphicon-trash" />
                    </a>
                </td>
                <Modal show={this.state.departmentModal}>
                    <Modal.Header>
                        <Modal.Title>Edit Departments</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form className="form-horizontal" name="newProductForm">
                       
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
                                    checked={this.state.active}
                                />
                            </div>
                        </div>
                        <br /> <br /> <br />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={() => this.setState({ departmentModal: false })}>
                    Close
                    </Button>
                    <Button onClick={this.handleDepartment}>Update</Button>
                    </Modal.Footer>
                </Modal>
            </tr>
        );
    }
}

export default Department;