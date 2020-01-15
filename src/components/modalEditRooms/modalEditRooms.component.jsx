import React, { Component } from 'react'
import "./modalEditRooms.style.scss"
const checkHowManyClassesAreDisabled = (type,listOfClasses) =>{

    let nrOfElements = 0;
    listOfClasses.map(el => {
        if(el.includes(type)) nrOfElements++;
    })
    let nrOfDisabledEl = 0;
    listOfClasses.map(el => {
        if(el.includes("-off") &&el.includes(type)) nrOfDisabledEl++;
    })
    console.log(listOfClasses,nrOfElements,nrOfDisabledEl)
    return nrOfElements === (nrOfDisabledEl+1)
}
export default class ModalEditRooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursIsOn: this.props.cursIsOn,
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
                        {
                            this.state.cursIsOn ? (

                                <div className="modal-body">
                                    {
                                        tableColumsForClasses[modalPosInterval[0]][modalPosInterval[1]].map(classes => {
                                            if (classes.includes("curs")) {
                                                return this.props.rooms.map(room => {
                                                    if (classes.includes(`${room.id}${room.type}`)) {
                                                        return <div className="custom-control custom-checkbox">
                                                            <input disabled={checkHowManyClassesAreDisabled("curs",tableColumsForClasses[modalPosInterval[0]][modalPosInterval[1]]) && !classes.includes("-off")} onChange={this.props.handleOnChangeCheckboxRoomsOnModal} checked={!classes.includes("-off")} type="checkbox" className="custom-control-input" id={`customCheckCourse${room.id}-${modalPosInterval[0]}${modalPosInterval[1]}`} />
                                                            <label className="custom-control-label" htmlFor={`customCheckCourse${room.id}-${modalPosInterval[0]}${modalPosInterval[1]}`}>{room.name}</label>
                                                        </div>
                                                    }
                                                })
                                            }
                                        })
                                    }

                                </div>
                            ) : (
                                    <div className="modal-body">
                                        {
                                        tableColumsForClasses[modalPosInterval[0]][modalPosInterval[1]].map(classes => {
                                            if (classes.includes("seminar")) {
                                                return this.props.rooms.map(room => {
                                                    if (classes.includes(`${room.id}${room.type}`)) {
                                                        return <div className="custom-control custom-checkbox">
                                                            <input disabled={checkHowManyClassesAreDisabled("seminar",tableColumsForClasses[modalPosInterval[0]][modalPosInterval[1]]) && !classes.includes("-off")} onChange={this.props.handleOnChangeCheckboxRoomsOnModal} checked={!classes.includes("-off")} type="checkbox" className="custom-control-input" id={`customCheckSeminar${room.id}-${modalPosInterval[0]}${modalPosInterval[1]}`} />
                                                            <label className="custom-control-label" htmlFor={`customCheckSeminar${room.id}-${modalPosInterval[0]}${modalPosInterval[1]}`}>{room.name}</label>
                                                        </div>
                                                    }
                                                })
                                            }
                                        })
                                    }
                                    </div>
                                )
                        }

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
