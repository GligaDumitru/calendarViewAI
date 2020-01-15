import React, { Component } from 'react'

import "./configureInterval.style.scss"
export default class ConfigureInterval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posX: this.props.posX,
            posY: this.props.posY,
            tableColumnsForIntervals: this.props.tableColumnsForIntervals,
            tableColumnsForRooms: this.props.tableColumnsForRooms
        }
    }
    handleOnChangeRadioInput = e => {
        this.props.handleOnChangeRadioInput(e)
    }
    handleOnCheckboxInput = e => {
        console.log(e.currentTarget.value)
        this.props.handleOnCheckboxInput(e)
    }

    render() {
        const {
            posX, posY, tableColumnsForIntervals, tableColumnsForRooms
        } = this.state
        return this.props.posX && this.props.posY && (
            <td id={`tableColumn${posX}${posY}`} className={`columTd ${tableColumnsForIntervals[posX - 1][posY - 1]}`}>
                <div>
                    <div className="setStatus">
                        <div className="form-check form-check-inline">
                            <input onChange={this.handleOnChangeRadioInput} className="form-check-input" type="radio" name={`inlineRadioOption${posX}${posY}`} id={`inlineRadio1${posX}${posY}`} value={`option1`} />
                            <label className="form-check-label" htmlFor={`inlineRadio1${posX}${posY}`} title="10/10 - Vreau neaparat acest interval"><i className="fas fa-battery-full"></i></label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input onChange={this.handleOnChangeRadioInput} className="form-check-input" type="radio" name={`inlineRadioOption${posX}${posY}`} id={`inlineRadio2${posX}${posY}`} value={`option2`} />
                            <label className="form-check-label" htmlFor={`inlineRadio2${posX}${posY}`} title="5/10 - Accept acest interval"><i className="fas fa-battery-half"></i></label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input onChange={this.handleOnChangeRadioInput} className="form-check-input" type="radio" name={`inlineRadioOption${posX}${posY}`} id={`inlineRadio3${posX}${posY}`} value={`option3`} />
                            <label className="form-check-label" htmlFor={`inlineRadio3${posX}${posY}`} title="1/10 - Nu pot in acest interval!"><i className="fas fa-battery-empty"></i></label>
                        </div>
                    </div>
                    <div className={tableColumnsForIntervals[posX - 1][posY - 1] === "option1" || tableColumnsForIntervals[posX - 1][posY - 1] === "option2" ? "collapse show" : "collapse"} id={`collapseSection${posX}${posY}`}>
                        <div className="containerForCoursesCheckbox">
                            <div className="custom-control custom-checkbox">
                                <input disabled={tableColumnsForIntervals[posX - 1][posY - 1] === "option2" || tableColumnsForRooms[posX - 1][posY - 1][1] === false} onChange={this.handleOnCheckboxInput} checked={tableColumnsForRooms[posX - 1][posY - 1][0] === true} type="checkbox" className="custom-control-input" id={`customCheckboxInputRooms0${posX}${posY}`} />
                                <label className="custom-control-label" htmlFor={`customCheckboxInputRooms0${posX}${posY}`}>Curs</label>
                                {tableColumnsForIntervals[posX - 1][posY - 1] === "option1" && tableColumnsForRooms[posX - 1][posY - 1][0] === true && (
                                    <div>
                                        <span onClick={this.props.toggleModal} id={`showRooms0${posX}${posY}`} className="badge badge-dark">Sali de curs <i className="fas fa-pencil-alt"></i></span>
                                    </div>
                                )}

                            </div>
                            <div className="custom-control custom-checkbox">
                                <input disabled={tableColumnsForIntervals[posX - 1][posY - 1] === "option2" || tableColumnsForRooms[posX - 1][posY - 1][0] === false} onChange={this.handleOnCheckboxInput} checked={tableColumnsForRooms[posX - 1][posY - 1][1] === true} type="checkbox" className="custom-control-input" id={`customCheckboxInputRooms1${posX}${posY}`} />
                                <label className="custom-control-label" htmlFor={`customCheckboxInputRooms1${posX}${posY}`}>Seminar</label>
                                {tableColumnsForIntervals[posX - 1][posY - 1] === "option1" && tableColumnsForRooms[posX - 1][posY - 1][1] === true && (
                                    <div>
                                        <span onClick={this.props.toggleModal} id={`showRooms1${posX}${posY}`} className="badge badge-dark">Sali seminar <i className="fas fa-pencil-alt"></i></span>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                    {
                        tableColumnsForIntervals[posX - 1][posY - 1] === "option1" && (
                        <div>
                            <button type="button" class="btn btn-outline-info"><i class="fas fa-comment-dots"></i> Comentarii</button>
                        </div>)
                    }

                </div>
            </td>

        )
    }
}
