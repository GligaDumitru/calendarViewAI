import React, { Component } from 'react'
import axios from 'axios'
import ShowEvent from './../ShowEvent/showEvent.component';
const getRoomsAvailableForInteval = (type, listOfRooms) => {

    let totalTypes = [];
    listOfRooms.map(room => {
        if (room.includes(type) && !room.includes("-off")) {
            totalTypes.push(room.substr(0, 4))
        }
    })

    return totalTypes
}

const checkIfUserIsNotAlreadyHere = (idTeacher, listOfRooms) => {
    console.log("ce am primit",idTeacher,listOfRooms)
    let result = true;

    listOfRooms.map(room => {
        if (room.profId === idTeacher) {
            result = false;
        }
    })

    return result;
}

const checkIfIdOfRoomIsNotUsedAlready = (listRooms, listOfObj) => {
    let tempRooms = [...listRooms]
    listOfObj.map(row => {
        if (tempRooms.indexOf(row.roomId) !== -1) {
            tempRooms.splice(tempRooms.indexOf(row.roomId), 1)
        }
    })
    return tempRooms[0]

}

const getSumList = (list) => {
    return list.reduce((a, b) => a + b, 0)
}

const getBackupArrayOfCourses = (listOfCourses) => {
    let sumOfCourses = getSumList(listOfCourses)
    let tempList = listOfCourses;
    if (sumOfCourses > 0) {
        let index1 = 1;
        listOfCourses.map((lt, index) => {
            if (lt > 0) {
                tempList[index] -= index1;
                index1 = 0;
            }
        })
        return tempList
    } else return false
}

const checkIfRoomIsAvailable = (idRoom, listObj) => {
    let res = false;
    if (listObj && listObj.length) {
        listObj.map(objL => {
            if (objL.roomId === idRoom) res = true;
        })
    } else {
        return true
    }

    return res;
}
export default class GenerateProgram extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teachers: [],
            teachersBackup: [],
            result: [
                [[], [], [], [], []],
                [[], [], [], [], []],
                [[], [], [], [], []],
                [[], [], [], [], []],
                [[], [], [], [], []],
                [[], [], [], [], []]
            ]
        }
    }

    generateScheduleForOption1JustCurs = () => {
        const { teachers, teachersBackup } = this.state;

        teachers.map(teacher => {
            // select now just those who has option 1 , only course selected
            teacher.tableColumnsForIntervals.map((rowIntervalsArr, rowIndex) => {
                rowIntervalsArr.map((colIntervals, colIndex) => {
                    if (colIntervals === "option1") {
                        let statusForCursOnInterval = teacher.tableColumnsForRooms[rowIndex][colIndex][0];
                        let statusForSeminarOnInterval = teacher.tableColumnsForRooms[rowIndex][colIndex][1];

                        if (statusForCursOnInterval === true && statusForSeminarOnInterval === false) {
                            // now will insert in result matrix those "cursuri"
                            let arrOfRoomsForInterval = teacher.tableColumsForClasses[rowIndex][colIndex];
                            let roomsAvailable = getRoomsAvailableForInteval("curs", arrOfRoomsForInterval);
                            let numberOfRoomsAvailable = roomsAvailable.length;

                            if (numberOfRoomsAvailable === 1) {
                                let tempResult = this.state.result;

                                let backupTeacher = {}


                                teachersBackup.map(tB => {
                                    if (tB.id === teacher.id) {
                                        backupTeacher = tB
                                    }
                                })

                                if (getSumList(backupTeacher.numberOfCourses) > 0 && checkIfRoomIsAvailable(roomsAvailable[0], this.state.result[rowIndex][colIndex]) && checkIfUserIsNotAlreadyHere(backupTeacher.id, this.state.result[rowIndex][colIndex])) {
                                    let listOfTotalCourses = getBackupArrayOfCourses(backupTeacher.numberOfCourses)
                                    if (listOfTotalCourses !== false) {

                                        let tempObj = {
                                            roomId: roomsAvailable[0],
                                            profId: teacher.id,
                                        }
                                        tempResult[rowIndex][colIndex].push(tempObj)
                                        backupTeacher.numberOfCourses = listOfTotalCourses
                                        teachersBackup.map(tB => {
                                            if (tB.id === teacher.id) {
                                                tB.numberOfCourses = backupTeacher.numberOfCourses
                                            }
                                        })
                                        this.setState({
                                            result: tempResult,

                                        })
                                    }

                                }
                            }
                        }
                    }
                })
            })
        })
    }
    generateScheduleForOption1JustCursMultipleRooms = () => {
        const { teachers, teachersBackup } = this.state;

        teachers.map(teacher => {
            // select now just those who has option 1 , only course selected
            teacher.tableColumnsForIntervals.map((rowIntervalsArr, rowIndex) => {
                rowIntervalsArr.map((colIntervals, colIndex) => {
                    if (colIntervals === "option1") {
                        let statusForCursOnInterval = teacher.tableColumnsForRooms[rowIndex][colIndex][0];
                        let statusForSeminarOnInterval = teacher.tableColumnsForRooms[rowIndex][colIndex][1];

                        if (statusForCursOnInterval === true && statusForSeminarOnInterval === false) {
                            // now will insert in result matrix those "cursuri"
                            let arrOfRoomsForInterval = teacher.tableColumsForClasses[rowIndex][colIndex];
                            let roomsAvailable = getRoomsAvailableForInteval("curs", arrOfRoomsForInterval);
                            let numberOfRoomsAvailable = roomsAvailable.length;

                            if (numberOfRoomsAvailable > 1) {
                                let tempResult = this.state.result;

                                let backupTeacher = {}


                                teachersBackup.map(tB => {
                                    if (tB.id === teacher.id) {
                                        backupTeacher = tB
                                    }
                                })
                                if (checkIfUserIsNotAlreadyHere(backupTeacher.id, this.state.result[rowIndex][colIndex])) {


                                    let listOfTotalCourses = getBackupArrayOfCourses(backupTeacher.numberOfCourses)

                                    if (listOfTotalCourses !== false && getSumList(backupTeacher.numberOfCourses) > 0) {
                                        let roomId = checkIfIdOfRoomIsNotUsedAlready(roomsAvailable, this.state.result[rowIndex][colIndex]);
                                        if (roomId !== 0) {
                                            let tempObj = {
                                                roomId,
                                                profId: teacher.id,
                                            }
                                            tempResult[rowIndex][colIndex].push(tempObj)
                                            backupTeacher.numberOfCourses = listOfTotalCourses
                                            teachersBackup.map(tB => {
                                                if (tB.id === teacher.id) {
                                                    tB.numberOfCourses = backupTeacher.numberOfCourses
                                                }
                                            })
                                            this.setState({
                                                result: tempResult,

                                            })
                                        }

                                    }
                                }
                            }
                        }
                    }
                })
            })
        })
    }
    generateScheduleForOption1JustSeminar = () => {

        const { teachers, teachersBackup } = this.state;

        teachers.map(teacher => {
            // select now just those who has option 1 , only seminar selected
            teacher.tableColumnsForIntervals.map((rowIntervalsArr, rowIndex) => {
                rowIntervalsArr.map((colIntervals, colIndex) => {
                    if (colIntervals === "option1") {
                        let statusForCursOnInterval = teacher.tableColumnsForRooms[rowIndex][colIndex][0];
                        let statusForSeminarOnInterval = teacher.tableColumnsForRooms[rowIndex][colIndex][1];

                        if (statusForCursOnInterval === false && statusForSeminarOnInterval === true) {
                            // now will insert in result matrix those "seminarii"
                            let arrOfRoomsForInterval = teacher.tableColumsForClasses[rowIndex][colIndex];
                            let roomsAvailable = getRoomsAvailableForInteval("seminar", arrOfRoomsForInterval);
                            let numberOfRoomsAvailable = roomsAvailable.length;

                            if (numberOfRoomsAvailable === 1) {
                                let tempResult = [...this.state.result];
                                let backupTeacher = {}
                                let tempObj = {
                                    roomId: roomsAvailable[0],
                                    profId: teacher.id,
                                }

                                teachersBackup.map(tB => {
                                    if (tB.id === teacher.id) {
                                        backupTeacher = tB
                                    }
                                })

                                if (getSumList(backupTeacher.numberOfSeminaries) > 0 && checkIfRoomIsAvailable(roomsAvailable[0], tempResult[rowIndex][colIndex]) !== false && checkIfUserIsNotAlreadyHere(backupTeacher.id, this.state.result[rowIndex][colIndex])) {
                                    let listOfTotalCourses = getBackupArrayOfCourses(backupTeacher.numberOfSeminaries)
                                    if (listOfTotalCourses !== false) {
                                        tempResult[rowIndex][colIndex].push(tempObj)
                                        backupTeacher.numberOfSeminaries = listOfTotalCourses
                                        teachersBackup.map(tB => {
                                            if (tB.id === teacher.id) {
                                                tB.numberOfSeminaries = backupTeacher.numberOfSeminaries
                                            }
                                        })
                                        this.setState({
                                            result: tempResult,
                                        })
                                    }

                                }
                            } else {

                            }

                        }
                    }
                })
            })
        })
    }

    generateScheduleForOption1BothMultipleRooms = () => {
        const { teachers, teachersBackup } = this.state;
        teachers.map(teacher => {
            // select now just those who has option 1 , both seminar and curs
            teacher.tableColumnsForIntervals.map((rowIntervalsArr, rowIndex) => {
                rowIntervalsArr.map((colIntervals, colIndex) => {
                    if (colIntervals === "option1" || colIntervals === "option2") {
                        let statusForCursOnInterval = teacher.tableColumnsForRooms[rowIndex][colIndex][0];
                        let statusForSeminarOnInterval = teacher.tableColumnsForRooms[rowIndex][colIndex][1];

                        if (statusForCursOnInterval === true && statusForSeminarOnInterval === true) {
                            let arrOfRoomsForInterval = teacher.tableColumsForClasses[rowIndex][colIndex];
                            let roomsAvailableForCourse = getRoomsAvailableForInteval("curs", arrOfRoomsForInterval);
                            let roomsAvailableForSeminar = getRoomsAvailableForInteval("seminar", arrOfRoomsForInterval);
                            let numberOfRoomsAvailable = [roomsAvailableForCourse, roomsAvailableForSeminar];

                            let tempResult = [...this.state.result];
                            let backupTeacher = {}


                            teachersBackup.map(tB => {
                                if (tB.id === teacher.id) {
                                    backupTeacher = tB
                                }
                            })

                            if (getSumList(backupTeacher.numberOfCourses) > 0) {
                                let roomId = checkIfIdOfRoomIsNotUsedAlready(roomsAvailableForCourse, this.state.result[rowIndex][colIndex]);
                                if (roomId && checkIfUserIsNotAlreadyHere(backupTeacher.id, this.state.result[rowIndex][colIndex])) {
                                    let listOfTotalCourses = getBackupArrayOfCourses(backupTeacher.numberOfCourses)
                                    if (listOfTotalCourses !== false) {
                                        let tempObj = {
                                            roomId: roomId,
                                            profId: teacher.id,
                                        }
                                        tempResult[rowIndex][colIndex].push(tempObj)
                                        backupTeacher.numberOfCourses = listOfTotalCourses
                                        teachersBackup.map(tB => {
                                            if (tB.id === teacher.id) {
                                                tB.numberOfCourses = backupTeacher.numberOfCourses
                                            }
                                        })
                                        this.setState({
                                            result: tempResult,
                                        })
                                    }
                                }

                            } else
                                if (getSumList(backupTeacher.numberOfSeminaries) > 0) {
                                    let roomId = checkIfIdOfRoomIsNotUsedAlready(roomsAvailableForSeminar, this.state.result[rowIndex][colIndex]);
                                    if (roomId) {
                                        let listOfTotalCourses = getBackupArrayOfCourses(backupTeacher.numberOfSeminaries)
                                        if (listOfTotalCourses !== false) {
                                            let tempObj = {
                                                roomId: roomId,
                                                profId: teacher.id,
                                            }
                                            tempResult[rowIndex][colIndex].push(tempObj)
                                            backupTeacher.numberOfSeminaries = listOfTotalCourses
                                            teachersBackup.map(tB => {
                                                if (tB.id === teacher.id) {
                                                    tB.numberOfSeminaries = backupTeacher.numberOfSeminaries
                                                }
                                            })
                                            this.setState({
                                                result: tempResult,
                                            })
                                        }
                                    }
                                }
                        }
                    }
                })
            })
        })
    }

    generateScheduleForOption1JustSeminarMultipleRooms = () => {
        const { teachers, teachersBackup } = this.state;

        teachers.map(teacher => {
            // select now just those who has option 1 , only course selected
            teacher.tableColumnsForIntervals.map((rowIntervalsArr, rowIndex) => {
                rowIntervalsArr.map((colIntervals, colIndex) => {
                    if (colIntervals === "option1") {
                        let statusForCursOnInterval = teacher.tableColumnsForRooms[rowIndex][colIndex][0];
                        let statusForSeminarOnInterval = teacher.tableColumnsForRooms[rowIndex][colIndex][1];

                        if (statusForCursOnInterval === false && statusForSeminarOnInterval === true) {
                            // now will insert in result matrix those "cursuri"
                            let arrOfRoomsForInterval = teacher.tableColumsForClasses[rowIndex][colIndex];
                            let roomsAvailable = getRoomsAvailableForInteval("seminar", arrOfRoomsForInterval);
                            let numberOfRoomsAvailable = roomsAvailable.length;

                            if (numberOfRoomsAvailable > 1) {
                                let tempResult = this.state.result;

                                let backupTeacher = {}


                                teachersBackup.map(tB => {
                                    if (tB.id === teacher.id) {
                                        backupTeacher = tB
                                    }
                                })
                                if (checkIfUserIsNotAlreadyHere(backupTeacher.id, this.state.result[rowIndex][colIndex])) {


                                    let listOfTotalCourses = getBackupArrayOfCourses(backupTeacher.numberOfSeminaries)

                                    if (listOfTotalCourses !== false && getSumList(backupTeacher.numberOfSeminaries) >= 0) {
                                        let roomId = checkIfIdOfRoomIsNotUsedAlready(roomsAvailable, this.state.result[rowIndex][colIndex]);
                                        if (roomId !== 0) {
                                            let tempObj = {
                                                roomId,
                                                profId: teacher.id,
                                            }
                                            tempResult[rowIndex][colIndex].push(tempObj)
                                            backupTeacher.numberOfSeminaries = listOfTotalCourses
                                            teachersBackup.map(tB => {
                                                if (tB.id === teacher.id) {
                                                    tB.numberOfSeminaries = backupTeacher.numberOfSeminaries
                                                }
                                            })
                                            this.setState({
                                                result: tempResult,

                                            })
                                        }

                                    }
                                }
                            }
                        }
                    }
                })
            })
        })
    }
    componentDidMount() {
        let URI = "http://localhost:5000";
        axios.get(URI + "/rooms")
            .then(res => {
                this.setState({
                    rooms: res.data
                })
            })
        axios.get(URI + "/teachers")
            .then(res => {
                this.setState({
                    // get from DB just those teachers who complete the form
                    teachers: res.data.filter(t => t.completed === true),
                    teachersBackup: res.data.filter(t => t.completed === true),
                })
            })
            .then(r => {
                this.generateScheduleForOption1JustCurs();
                this.generateScheduleForOption1JustSeminar();
                this.generateScheduleForOption1JustCursMultipleRooms();
                this.generateScheduleForOption1JustSeminarMultipleRooms();
                this.generateScheduleForOption1BothMultipleRooms();

            })
    }

    render() {
        const { teachers } = this.state;
        return this.state.teachers && (
            <div>

                {
                    teachers.map(teacher => {
                        return <div>
                            <p>{teacher.lName}</p>
                            {teacher.subject.map((sbj, index) => {
                                return <p>{sbj.toUpperCase()} : C = {teacher.numberOfCourses[index]},S = {teacher.numberOfSeminaries[index]}</p>
                            })}
                        </div>
                    })
                }


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
                                    {
                                        this.state.result[0].map(cols => {
                                            return <td>
                                                {cols.map(rezervation => {
                                                    return <ShowEvent rooms={this.state.rooms} teachers={this.state.teachers} rezervation={rezervation} />
                                                })}
                                            </td>

                                        })
                                    }

                                </tr>
                                <tr>
                                    <td>
                                        10:00-12:00
                                    </td>

                                    {
                                        this.state.result[1].map(cols => {
                                            return <td>
                                                {cols.map(rezervation => {
                                                    return <ShowEvent rooms={this.state.rooms} teachers={this.state.teachers} rezervation={rezervation} />
                                                })}
                                            </td>

                                        })
                                    }
                                </tr>
                                <tr>
                                    <td>
                                        12:00-14:00
                                    </td>
                                    {
                                        this.state.result[2].map(cols => {
                                            return <td>
                                                {cols.map(rezervation => {
                                                    return <ShowEvent rooms={this.state.rooms} teachers={this.state.teachers} rezervation={rezervation} />
                                                })}
                                            </td>

                                        })
                                    }
                                </tr>
                                <tr>
                                    <td>
                                        14:00-16:00
                                    </td>
                                    {
                                        this.state.result[3].map(cols => {
                                            return <td>
                                                {cols.map(rezervation => {
                                                    return <ShowEvent rooms={this.state.rooms} teachers={this.state.teachers} rezervation={rezervation} />
                                                })}
                                            </td>

                                        })
                                    }
                                </tr>
                                <tr>
                                    <td>
                                        16:00-18:00
                                    </td>
                                    {
                                        this.state.result[4].map(cols => {
                                            return <td>
                                                {cols.map(rezervation => {
                                                    return <ShowEvent rooms={this.state.rooms} teachers={this.state.teachers} rezervation={rezervation} />
                                                })}
                                            </td>

                                        })
                                    }
                                </tr>
                                <tr>

                                    <td>
                                        18:00-20:00
                                    </td>
                                    {
                                        this.state.result[5].map(cols => {
                                            return <td>
                                                {cols.map(rezervation => {
                                                    return <ShowEvent rooms={this.state.rooms} teachers={this.state.teachers} rezervation={rezervation} />
                                                })}
                                            </td>

                                        })
                                    }
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}
