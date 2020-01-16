import React, { Component } from 'react'
import ConfigureInterval from '../ConfigureInterval/configureInterval.component';
import "./setUpIntervals.style.scss"
import ModalEditRooms from '../modalEditRooms/modalEditRooms.component'
import axios from 'axios';
export default class SetUpIntervals extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tableColumnsForIntervals: (this.props.exactlyThisTeacher.tableColumnsForIntervals && this.props.exactlyThisTeacher.tableColumnsForIntervals.length && this.props.exactlyThisTeacher.tableColumnsForIntervals) || [
                ["", "", "", "", ""],
                ["", "", "", "", ""],
                ["", "", "", "", ""],
                ["", "", "", "", ""],
                ["", "", "", "", ""],
                ["", "", "", "", ""],
            ],
            tableColumnsForRooms: (this.props.exactlyThisTeacher.tableColumnsForRooms && this.props.exactlyThisTeacher.tableColumnsForRooms.length && this.props.exactlyThisTeacher.tableColumnsForRooms) || [ // 0 - curs, 1 - seminar
                [[true, true], [true, true], [true, true], [true, true], [true, true]],
                [[true, true], [true, true], [true, true], [true, true], [true, true]],
                [[true, true], [true, true], [true, true], [true, true], [true, true]],
                [[true, true], [true, true], [true, true], [true, true], [true, true]],
                [[true, true], [true, true], [true, true], [true, true], [true, true]],
                [[true, true], [true, true], [true, true], [true, true], [true, true]],
            ],
            posibleCourse: this.props.exactlyThisTeacher.posibleCourse || 0,
            posibleSeminaries: this.props.exactlyThisTeacher.posibleSeminaries || 0,
            showModal: false,
            showCurs: false,
            rooms: [],
            tableColumsForClasses: (this.props.exactlyThisTeacher.tableColumsForClasses && this.props.exactlyThisTeacher.tableColumsForClasses.length && this.props.exactlyThisTeacher.tableColumsForClasses) || [
                [[], [], [], [], []],
                [[], [], [], [], []],
                [[], [], [], [], []],
                [[], [], [], [], []],
                [[], [], [], [], []],
                [[], [], [], [], []]
            ],
            modalPosInterval: [-1, -1],
            totalSelectedInterval: this.props.exactlyThisTeacher.totalSelectedInterval || 0,
            totalSelectedIntervalEmpty: this.props.exactlyThisTeacher.totalSelectedIntervalEmpty || 0,
            totalSelectedIntervalFull: this.props.exactlyThisTeacher.totalSelectedIntervalFull || 0,
            totalSelectedIntervalHalf: this.props.exactlyThisTeacher.totalSelectedIntervalHalf || 0
        }
    }

    componentDidMount() {
        let URI = "http://localhost:";
        let PORT = 5000;
        let category = "rooms";
        axios.get(`${URI}${PORT}/${category}`).then(res => {
            this.setState({
                rooms: res.data
            }, () => {
                let tempTableColumsForClasses = this.state.tableColumsForClasses;
                let tempListClasses = []
                this.state.rooms.map(room => {
                    tempListClasses.push(`${room.id}${room.type}`)
                })

                tempTableColumsForClasses.map((classEl, iR) => {
                    classEl.map((coll, iC) => {
                        coll = coll.filter((item, index) => coll.indexOf(item) === index)
                        tempListClasses.map(el => {
                            let temp1 = true
                            this.state.rooms.map(room => {
                                if (`${room.id}${room.type}` === el && room.intervalDetails[iR][iC] === false) {
                                    temp1 = false
                                }
                            })
                            if (temp1 === true) {
                                coll.push(el)
                            }
                        })
                    })
                })

                this.setState({
                    tableColumsForClasses: tempTableColumsForClasses
                }, () => console.log("tableColumsForClasses", this.state.tableColumsForClasses))
            })
        })
    }


    handleOnChangeRadioInput = e => {
        let id = e.target.id;
        let tempPosX = id.substr(12, 1);
        let tempPosY = id.substr(13, 1);
        let tempTableColumnsForIntervals = this.state.tableColumnsForIntervals;
        let value = e.target.value;

        if (value === "option3") {
            let tempTableColumnsForRooms = this.state.tableColumnsForRooms;

            tempTableColumnsForRooms[tempPosX - 1][tempPosY - 1][0] = false;
            tempTableColumnsForRooms[tempPosX - 1][tempPosY - 1][1] = false;

            this.setState({
                tableColumnsForRooms: tempTableColumnsForRooms
            }, () => this.checkForPosibleCourses())
        }
        if (value === "option2") {
            let tempTableColumnsForRooms = this.state.tableColumnsForRooms;

            tempTableColumnsForRooms[tempPosX - 1][tempPosY - 1][0] = true;
            tempTableColumnsForRooms[tempPosX - 1][tempPosY - 1][1] = true;

            let tempTableColumsForClasses = [
                [[], [], [], [], []],
                [[], [], [], [], []],
                [[], [], [], [], []],
                [[], [], [], [], []],
                [[], [], [], [], []],
                [[], [], [], [], []]
            ];
            let tempListClasses = []
            this.state.rooms.map(room => {
                tempListClasses.push(`${room.id}${room.type}`)
            })

            tempTableColumsForClasses.map((classEl, iR) => {
                classEl.map((coll, iC) => {
                    // coll = coll.filter((item, index) => coll.indexOf(item) === index)
                    tempListClasses.map(el => {
                        let temp1 = true
                        this.state.rooms.map(room => {
                            if (`${room.id}${room.type}` === el && room.intervalDetails[iR][iC] === false) {
                                temp1 = false
                            }
                        })
                        if (temp1 === true) {
                            coll.push(el)
                        }
                    })
                })
            })
            this.setState({
                tableColumsForClasses: tempTableColumsForClasses,
                tableColumnsForRooms: tempTableColumnsForRooms
            }, () => {
                console.log("tableColumsForClasses",this.state.rooms)
                this.checkForPosibleCourses()
            })

        }
        if (value === "option1") {
            let tempTableColumnsForRooms = this.state.tableColumnsForRooms;

            if (tempTableColumnsForRooms[tempPosX - 1][tempPosY - 1][0] === false && tempTableColumnsForRooms[tempPosX - 1][tempPosY - 1][1] === false) {
                tempTableColumnsForRooms[tempPosX - 1][tempPosY - 1][0] = true;
                tempTableColumnsForRooms[tempPosX - 1][tempPosY - 1][1] = true;

                this.setState({
                    tableColumnsForRooms: tempTableColumnsForRooms
                }, () => this.checkForPosibleCourses())
            }
        }

        let totalSelectedInterval = 0;
        let totalSelectedIntervalEmpty = 0;
        let totalSelectedIntervalHalf = 0;
        let totalSelectedIntervalFull = 0;
        tempTableColumnsForIntervals[tempPosX - 1][tempPosY - 1] = value;

        tempTableColumnsForIntervals.map(interval => {
            interval.map(col => {
                if (col !== "") totalSelectedInterval++;
                if (col !== "option1") totalSelectedIntervalFull++;
                if (col !== "option2") totalSelectedIntervalHalf++;
                if (col !== "option3") totalSelectedIntervalEmpty++;
            })
        })
        this.setState({
            tableColumnsForIntervals: tempTableColumnsForIntervals,
            totalSelectedInterval: Math.round(totalSelectedInterval * 3.333),
            totalSelectedIntervalFull: 30 - totalSelectedIntervalFull,
            totalSelectedIntervalEmpty: 30 - totalSelectedIntervalEmpty,
            totalSelectedIntervalHalf: 30 - totalSelectedIntervalHalf
        }, () => this.checkForPosibleCourses())
    }

    checkForPosibleCourses = () => {
        let posibleCourse = 0;
        let posibleSeminaries = 0;
        this.state.tableColumnsForRooms.map(row => {
            row.map(col => {
                if (col[0] === true) posibleCourse++
                if (col[1] === true) posibleSeminaries++
            })
        })
        this.setState({
            posibleCourse: posibleCourse,
            posibleSeminaries: posibleSeminaries
        })
    }
    handleOnCheckboxInput = e => {

        let id = e.target.id;
        let tempTypeRoom = id.substr(24, 1);
        let tempPosX = id.substr(25, 1) - 1;
        let tempPosY = id.substr(26, 1) - 1;
        let tempTableColumnsForRooms = this.state.tableColumnsForRooms;


        tempTableColumnsForRooms[tempPosX][tempPosY][tempTypeRoom] = tempTableColumnsForRooms[tempPosX][tempPosY][tempTypeRoom] === false ? true : false

        this.setState({
            tableColumnsForRooms: tempTableColumnsForRooms
        }, () => this.checkForPosibleCourses())
    }
    toggleModal = (e) => {
        let id = e.currentTarget.id;
        let tempShowCurs = false;
        let tempPosX = id.substr(10, 1) - 1;
        let tempPosY = id.substr(11, 1) - 1;
        let tempArrPos = [tempPosX, tempPosY]
        if (id.includes("showRooms0")) {
            tempShowCurs = true;
        }
        if (id.includes("showRooms1")) {
            tempShowCurs = false;
        }
        this.setState({
            showModal: !this.state.showModal,
            showCurs: tempShowCurs,
            modalPosInterval: tempArrPos
        })
    }
    handleOnChangeCheckboxRoomsOnModal = e => {
        let id = e.target.id;
        // customCheckCourse9872-00
        if (id.includes("Course")) {
            let tempPosX = id.substr(22, 1);
            let tempPosY = id.substr(23, 1);
            let tempIdRoom = id.substr(17, 4);

            let tempTableColumsForClasses = this.state.tableColumsForClasses;

            let indexForId = tempTableColumsForClasses[tempPosX][tempPosY].indexOf(`${tempIdRoom}curs`)
            if (indexForId < 0) {
                indexForId = tempTableColumsForClasses[tempPosX][tempPosY].indexOf(`${tempIdRoom}curs-off`)
            }
            let elementIdRoom = tempTableColumsForClasses[tempPosX][tempPosY][indexForId]
            if (!elementIdRoom.includes("-off")) {
                tempTableColumsForClasses[tempPosX][tempPosY][indexForId] = tempIdRoom + "curs-off"
            }
            if (elementIdRoom.includes("-off")) {
                tempTableColumsForClasses[tempPosX][tempPosY][indexForId] = tempIdRoom + "curs"
            }
            this.setState({
                tableColumsForClasses: tempTableColumsForClasses
            }, () => console.log("tempTableColumsForClasses", this.state.tableColumsForClasses))
        }
        if (id.includes("Seminar")) {
            let tempPosX = id.substr(23, 1);
            let tempPosY = id.substr(24, 1);
            let tempIdRoom = id.substr(18, 4);

            let tempTableColumsForClasses = this.state.tableColumsForClasses;

            let indexForId = tempTableColumsForClasses[tempPosX][tempPosY].indexOf(`${tempIdRoom}seminar`)
            if (indexForId < 0) {
                indexForId = tempTableColumsForClasses[tempPosX][tempPosY].indexOf(`${tempIdRoom}seminar-off`)
            }
            let elementIdRoom = tempTableColumsForClasses[tempPosX][tempPosY][indexForId]
            if (!elementIdRoom.includes("-off")) {
                tempTableColumsForClasses[tempPosX][tempPosY][indexForId] = tempIdRoom + "seminar-off"
            }
            if (elementIdRoom.includes("-off")) {
                tempTableColumsForClasses[tempPosX][tempPosY][indexForId] = tempIdRoom + "seminar"
            }
            this.setState({
                tableColumsForClasses: tempTableColumsForClasses
            }, () => console.log("tempTableColumsForClasses", this.state.tableColumsForClasses))
        }
    }

    handleOnSave = () => {
        const config = { headers: { 'Content-Type': 'application/json' } };
        let teacherData = {}
        this.props.teachers.map(tch => {
            if (tch.id === this.props.idForTeacherSelected) {
                teacherData = tch
            }
        })
        let nrOfHoursForSeminaries = teacherData.numberOfSeminaries.reduce((a, b) => a + b, 0)
        let nrOfHoursForCourses = teacherData.numberOfCourses.reduce((a, b) => a + b, 0)


        const { lName, fName, email, fullName, subject, numberOfCourses, numberOfSeminaries } = teacherData;

        if (this.state.totalSelectedIntervalEmpty + this.state.totalSelectedIntervalFull + this.state.totalSelectedIntervalHalf === 30) {
            if (nrOfHoursForSeminaries <= this.state.posibleSeminaries) {
                if (nrOfHoursForCourses <= this.state.posibleCourse) {
                    if (30 - this.state.totalSelectedIntervalEmpty >= (nrOfHoursForSeminaries + nrOfHoursForCourses)) {

                        const teacher = {
                            completed: true,
                            lName,
                            fName,
                            email,
                            fullName,
                            subject,
                            numberOfCourses,
                            numberOfSeminaries,
                            posibleCourse: this.state.posibleCourse,
                            posibleSeminaries: this.state.posibleSeminaries,
                            totalSelectedInterval: this.state.totalSelectedInterval,
                            totalSelectedIntervalEmpty: this.state.totalSelectedIntervalEmpty,
                            totalSelectedIntervalFull: this.state.totalSelectedIntervalFull,
                            totalSelectedIntervalHalf: this.state.totalSelectedIntervalHalf,
                            tableColumnsForIntervals: this.state.tableColumnsForIntervals,
                            tableColumnsForRooms: this.state.tableColumnsForRooms,
                            tableColumsForClasses: this.state.tableColumsForClasses
                        }

                        axios.put("http://localhost:5000/teachers/" + this.props.idForTeacherSelected, teacher, config).then(res => {
                            this.props.history.push("/successResponse")
                        })
                    } else {
                        alert(`Sunt prea putine ore alocate pe saptamana. Necesare sunt :${nrOfHoursForSeminaries + nrOfHoursForCourses}`);
                    }
                } else {
                    alert(`Numarul de cursuri posibile este mai mic decat :${nrOfHoursForCourses}`);
                }
            } else {
                alert(`Numarul de seminarii posibile este mai mic decat :${nrOfHoursForSeminaries}`);
            }
        } else {
            alert(`Ai completat abia pentru ${this.state.totalSelectedIntervalEmpty + this.state.totalSelectedIntervalFull + this.state.totalSelectedIntervalHalf}/30 intervale.`);
        }


    }
    render() {
        return this.props.idForTeacherSelected && (
            <div className="setUpIntervalContainer">
                {this.state.totalSelectedInterval}
                {
                    this.state.showModal && (
                        <div className="containerForModalRooms">
                            <ModalEditRooms handleOnChangeCheckboxRoomsOnModal={this.handleOnChangeCheckboxRoomsOnModal} rooms={this.state.rooms} modalPosInterval={this.state.modalPosInterval} tableColumsForClasses={this.state.tableColumsForClasses} toggleModal={this.toggleModal} cursIsOn={this.state.showCurs} />
                        </div>
                    )
                }
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ "width": `${this.state.totalSelectedInterval}%` }} aria-valuenow={this.state.totalSelectedInterval} aria-valuemin="0" aria-valuemax="100">{this.state.totalSelectedInterval}%</div>
                </div>
                <div className="row">
                    <button type="button" class="btn btn-secondary" style={{ "margin": "20px" }}>
                        Indisponibil <span class="badge badge-light">{this.state.totalSelectedIntervalEmpty}</span>
                    </button>
                    <button type="button" class="btn btn-primary" style={{ "margin": "20px" }}>
                        Interval acceptabil <span class="badge badge-light">{this.state.totalSelectedIntervalHalf}</span>
                    </button>
                    <button type="button" class="btn btn-danger" style={{ "margin": "20px" }}>
                        Interval important <span class="badge badge-light">{this.state.totalSelectedIntervalFull}</span>
                    </button>
                </div>
                <div className="row">
                    <ul class="list-group list-group-horizontal-lg">
                        <li class="list-group-item">Total ore curs : <span class="badge badge-light">{
                            this.props.teachers.map(teacher => {
                                if (teacher.id === this.props.idForTeacherSelected) {
                                    let nrOfHoursForCourses = 0;
                                    teacher.numberOfCourses.map(course => {
                                        nrOfHoursForCourses += course * 2
                                    })

                                    return nrOfHoursForCourses
                                }
                            })
                        }</span></li>
                        <li class="list-group-item">Total ore seminar: <span class="badge badge-light">{
                            this.props.teachers.map(teacher => {
                                if (teacher.id === this.props.idForTeacherSelected) {
                                    let nrOfHoursForSeminaries = 0;
                                    teacher.numberOfSeminaries.map(course => {
                                        nrOfHoursForSeminaries += course * 2
                                    })

                                    return nrOfHoursForSeminaries
                                }
                            })
                        }</span></li>
                        <li class="list-group-item list-group-item-danger">Ore curs posibile: <span class="badge badge-light">{2 * this.state.posibleCourse}</span></li>
                        <li class="list-group-item list-group-item-danger">Ore seminar posibile: <span class="badge badge-light">{2 * this.state.posibleSeminaries}</span></li>
                    </ul>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Select Day</th>
                                    <th scope="col">Luni</th>
                                    <th scope="col">Marti</th>
                                    <th scope="col">Miercuri</th>
                                    <th scope="col">Joi</th>
                                    <th scope="col">Vineri</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        8:00-10:00
                                    </td>
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={1} posY={1} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={1} posY={2} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={1} posY={3} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={1} posY={4} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={1} posY={5} />
                                </tr>
                                <tr>
                                    <td>
                                        8:00-10:00
                                    </td>
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={2} posY={1} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={2} posY={2} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={2} posY={3} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={2} posY={4} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={2} posY={5} />
                                </tr>
                                <tr>
                                    <td>
                                        8:00-10:00
                                    </td>
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={3} posY={1} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={3} posY={2} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={3} posY={3} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={3} posY={4} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={3} posY={5} />
                                </tr>
                                <tr>
                                    <td>
                                        8:00-10:00
                                    </td>
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={4} posY={1} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={4} posY={2} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={4} posY={3} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={4} posY={4} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={4} posY={5} />
                                </tr>
                                <tr>
                                    <td>
                                        8:00-10:00
                                    </td>
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={5} posY={1} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={5} posY={2} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={5} posY={3} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={5} posY={4} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={5} posY={5} />
                                </tr>
                                <tr>

                                    <td>
                                        8:00-10:00
                                    </td>
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={6} posY={1} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={6} posY={2} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={6} posY={3} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={6} posY={4} />
                                    <ConfigureInterval rooms={this.state.rooms} toggleModal={this.toggleModal} handleOnCheckboxInput={this.handleOnCheckboxInput} tableColumnsForIntervals={this.state.tableColumnsForIntervals} tableColumnsForRooms={this.state.tableColumnsForRooms} handleOnChangeRadioInput={this.handleOnChangeRadioInput} posX={6} posY={5} />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="row">
                    <button onClick={this.handleOnSave} type="button" class="btn btn-primary">Finalizeaza</button>
                </div>
            </div>

        )
    }
}
