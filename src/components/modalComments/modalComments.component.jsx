import React, { Component } from 'react'
import "./modalEditRooms.style.scss"

export default class ModalComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const { tableColumsForClasses, modalPosInterval } = this.props;
        return this.props && tableColumsForClasses && (
            <div className="" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Editeaza Sali {this.state.cursIsOn ? "Curs" : "Seminar"}</h5>
                            <button onClick={this.props.toggleModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                   
                                <div className="modal-body">
                                    comments

                                </div>
                     

                        <div className="modal-footer">
                            <button onClick={this.props.toggleModal} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={this.props.toggleModal} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
