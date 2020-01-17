import React, { Component } from 'react'
import axios from 'axios'
import "./showEvent.style.scss"
const getErrorClass = (list) => {
    console.log("list", list)
}
export default class ShowEvent extends Component {


    render() {
        return this.props.rooms && (
            <div class={`card bg-light mb-3 room${this.props.rezervation.roomId}-${this.props.posX}${this.props.posY}`} style={{ "maxWidth": "18rem" }}>
                <div class="card-header">{
                    this.props.rooms.map(room => {
                        //   return <span>{room.name}.{this.props.rezervation.roomId}</span> 
                        if (room.id == this.props.rezervation.roomId) {
                            return <span className={`${room.type}-${room.name}`} >{room.type.toUpperCase()}:{room.name.toUpperCase()} la etajul {room.floor}</span>
                        }
                    })
                }</div>
                <div class="card-body">
                    {
                        this.props.teachers.map(teacher => {
                            //   return <span>{room.name}.{this.props.rezervation.roomId}</span> 
                            if (teacher.id == this.props.rezervation.profId) {
                                return <h5 class="card-title">{teacher.fullName}</h5>
                            }
                        })
                    }
                </div>
            </div>
        )
    }
}
