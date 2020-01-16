import React, { Component } from 'react'
import axios from 'axios'
export default class ShowEvent extends Component {


    render() {
        return this.props.rooms && (
            <div class="card bg-light mb-3" style={{ "maxWidth": "18rem" }}>
                {/* {JSON.stringify(this.props.rezervation)} */}
                <div class="card-header">{
                    this.props.rooms.map(room => {
                        //   return <span>{room.name}.{this.props.rezervation.roomId}</span> 
                        if (room.id == this.props.rezervation.roomId) {
                            return <span>{room.type.toUpperCase()}:{room.name.toUpperCase()} la etajul {room.floor}</span>
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
