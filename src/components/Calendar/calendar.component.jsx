import React, { Component } from 'react'
import axios from 'axios';
import "./calendar.styles.scss"
export default class Calendar extends Component {
    constructor() {
        super()
        this.state = {
            listOfRooms: [],
            weekDays: [],
            listOfDays: ["Monday", "Tuesday", "Wendsday", "Thursday", "Friday", "Saturday"],
            listOfIntervals: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"]
        }
    }


    componentDidMount() {
        let urlAPI = 'http://localhost:3000';
        axios.get(urlAPI + "/rooms").then(res => {
            this.setState({
                listOfRooms: res.data
            }, () => console.log(this.state.listOfRooms))
        });
        axios.get(urlAPI + "/weekDays").then(res => {
            this.setState({
                weekDays: res.data
            }, () => console.log(this.state.weekDays))
        });
    }
    render() {
        const { listOfDays, listOfIntervals } = this.state
        return (
            <div className="calendar-container">

                <table>
                    <thead>
                        <tr>
                            <th>Week</th>
                            {

                                listOfDays.map((el, index) => {
                                    return <th className="columnWeekName">
                                        <span className="day">{index} </span>
                                        <span className="nameOfDay long">{el}</span>
                                        <span className="nameOfDay short">{el.substr(0, 3)}</span>
                                    </th>
                                })
                            }
                        </tr>

                    </thead>
                    <tbody>
                        {
                            listOfIntervals.map((hour, index2) => {
                                return listOfIntervals[index2 + 1] ? <tr className={index2 % 4 === 0 ? "rowHourName evenRow" : "rowHourName"}>
                                    <td className="hour"><p>{hour} | {listOfIntervals[index2 + 1]}</p></td>
                                    {
                                        listOfDays.map((el, index) => {

                                            return index2 % 2 === 0 ? <td className={index} rowSpan={index2 % 2 === 0 ? 2 : 1}>
                                                <div className="events-box">
                                                    <div className="eventContainer">
                                                        <div className="event">
                                                            <span>Practi...</span>
                                                            <i class="fas fa-eye"></i>

                                                            <div className="smallDetails">
                                                                <div class="blog-card">
                                                                    <div class="meta">
                                                                        <div class="photo" style={{ "background-image": "url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg" }}></div>
                                                                        <ul class="details">
                                                                            <li class="author"><a href="#">John Doe</a></li>
                                                                            <li class="date">Aug. 24, 2015</li>
                                                                            <li class="tags">
                                                                                <ul>
                                                                                    <li><a href="#">Learn</a></li>
                                                                                    <li><a href="#">Code</a></li>
                                                                                    <li><a href="#">HTML</a></li>
                                                                                    <li><a href="#">CSS</a></li>
                                                                                </ul>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                    <div class="description">
                                                                        <h1>Learning to Code</h1>
                                                                        <h2>Opening a door to the future</h2>
                                                                        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
                                                                        <p class="read-more">
                                                                            <a href="#">Read More</a>
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                                {/* <div className="event-container">
                                                   <span className="event-title">Title Here</span>
                                               </div>
                                               <div className="event-container">
                                                   <span className="event-title">Title Here</span>
                                               </div> */}
                                            </td> : null
                                        })
                                    }
                                </tr> : null
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
