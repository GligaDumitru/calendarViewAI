import React, { Component } from 'react'

export default class ModalComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentValue: "",
            commentTitle: ""
        }
    }

    handleOnChangeSubmitComment = e => {

        if (this.state.commentValue !== "") {
            this.setState({
                commentTitle: this.state.commentValue
            })
        }
        // this.props.handleOnChangeSubmitComment(e, this.state.commentValue)
    }
    handleInput = ({ target }) => {
        this.setState({
            commentValue: target.value
        })
    }
    render() {
        return this.props && (
            <div className="" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Adauga Comentarii</h5>
                            <button onClick={this.props.toggleModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body" style={{ "display": "block", "margin": "10px" }}>
                            <ul class="list-group" style={{ "marginBottom": "20px" }}>
                                <li class="list-group-item">{
                                    this.state.commentTitle === "" ? (<span>No comment...</span>) : (<span>{this.state.commentTitle}</span>)
                                }</li>
                            </ul>
                            <div class="input-group mb-3">
                                <input onChange={this.handleInput} value={this.state.commentValue} type="text" id="inputForComment" class="form-control" placeholder="Add Comment" />
                                <div class="input-group-append">
                                    <button id="12212" onClick={this.handleOnChangeSubmitComment} class="btn btn-outline-secondary" type="button">Adauga Comment</button>
                                </div>
                            </div>
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
