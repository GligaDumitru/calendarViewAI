import React, { Component, Fragment } from 'react'
import "./teacherForm.style.scss";
import { Link } from 'react-router-dom';
import SetUpIntervals from '../SetUpIntervals/setUpIntervals.component'
import axios from 'axios'
import GenerateProgram from './../GenerateProgram/generateProgram.component';
export default class TeacherForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: this.props.stage || "zero",
            email: "",
            fName: "",
            lName: "",
            teachers: [],
            idForTeacherSelected: 12345,
            stage1Complete: false,
            fullName: "",
            subjectForTeacher: [],
            numberOfCoursesForTeacher: [],
            numberOfSeminariesForTeacher: [],
            exactlyThisTeacher: {}
        }
    }

    componentDidMount() {
        let URI = "http://localhost:5000";
        axios.get(URI + "/teachers").then(res => {
            this.setState({
                teachers: res.data
            })
        })
    }

    handleOnChange = e => {

        let id = e.target.id;
        let value = e.target.value;
        this.setState({
            [id]: value,
        }, () => this.checkInputStage1())
    }
    checkInputStage1 = () => {
        this.setState({
            stage1Complete: this.state.email !== "" && this.state.fName !== "" && this.state.lName !== ""
        })
    }
    getTeacherFullName = id => {
        alert(id)
        this.state.teachers.map(teacher => {
            if (teacher.id === id) return this.state.teachers.fullName
        })
    }
    checkForTeacher = () => {
        this.state.teachers.map(teacher => {
            if (teacher.email === this.state.email && teacher.lName.toLowerCase() === this.state.lName.trim().toLowerCase()) {
                this.setState({
                    idForTeacherSelected: teacher.id,
                    fullName: teacher.fullName,
                    subjectForTeacher: teacher.subject,
                    numberOfSeminariesForTeacher: teacher.numberOfSeminaries,
                    numberOfCoursesForTeacher: teacher.numberOfCourses,
                    exactlyThisTeacher: teacher
                }, () => console.log("exactlyThisTeacher", this.state.exactlyThisTeacher))
            }
        })
    }



    render() {
        const { idForTeacherSelected, fullName } = this.state;
        return this.props.stage ? (
            <div className="teacherFormContainer">
                <form>
                    {/* {JSON.stringify(this.state)} */}
                    {
                        this.props.stage && this.props.stage === 10 &&
                        <div className="jumbotron">
                            <h2 className="display-4">Buna, dl/dn profesor!</h2>
                            <p className="lead">Acest site este conceput pentru a simplica munca, de a creea un orar optimizat cat mai usor posibil.</p>
                            <hr className="my-4" />
                            <p>Dorim sa fiti cat mai sincer dar totusi sa va ganditi si la ceilalti colegi cand veti alege intervalele orare.</p>
                            <p className="lead">
                                <Link className="btn btn-primary btn-lg" to="/stage1">
                                    Completeaza formularul!
                                </Link>
                            </p>
                        </div>
                    }
                    {
                        this.props.stage && this.props.stage === 99 &&
                        <Fragment>
                            <div className="jumbotron">
                                <h2 className="display-4">Generare Orar</h2>
                                <p className="lead">Se incarca....</p>
                                <hr className="my-4" />
                                <p>Dorim sa fiti cat mai sincer dar totusi sa va ganditi si la ceilalti colegi cand veti alege intervalele orare.</p>
                                <p className="lead">
                                    <Link className="btn btn-primary btn-lg" to="/stage1">
                                        Prima pagina
                                </Link>
                                </p>

                            </div>
                            <div className="row">
                                <GenerateProgram />
                            </div>
                        </Fragment>

                    }
                    {
                        this.props.stage && this.props.stage === 4 &&
                        <div className="jumbotron">
                            <h2 className="display-4">Multumim pentru raspuns.</h2>
                            <p className="lead">Acest site este conceput pentru a simplica munca, de a creea un orar optimizat cat mai usor posibil.</p>
                            <hr className="my-4" />
                            <p>Vom lua in considerare dorintele dvs.</p>
                            <p className="lead">
                                <Link className="btn btn-primary btn-lg" to="/stage1">
                                    Prima pagina
                                </Link>
                            </p>
                        </div>
                    }
                    {
                        this.props.stage && this.props.stage === 5 &&
                        <div className="jumbotron">
                            <h2 className="display-4">Error 500. Probleme conectare server.</h2>
                            <p className="lead">Acest site este conceput pentru a simplica munca, de a creea un orar optimizat cat mai usor posibil.</p>
                            <hr className="my-4" />
                            <p>Este posibil sa fie doar o problema de conexiune. Poti incerca din nou in cateva minute. Multumim pentru rabdare</p>
                            <p className="lead">
                                <Link className="btn btn-primary btn-lg" to="/stage1">
                                    Incearca din nou!
                                </Link>
                            </p>
                        </div>
                    }
                    {
                        this.props.stage && this.props.stage === 1 &&
                        <Fragment>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="">Acasa</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Informatii Generale</li>
                                </ol>
                            </nav>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <input required onChange={this.handleOnChange} value={this.state.email} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Nume</label>
                                <input required onChange={this.handleOnChange} value={this.state.lName} type="text" className="form-control" id="lName" name="lName" placeholder="Nume Familie" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="prenume">Prenume</label>
                                <input required onChange={this.handleOnChange} value={this.state.fName} type="text" className="form-control" id="fName" name="fName" placeholder="Nume Familie" />
                            </div>
                            {this.state.stage1Complete && (<Link className="btn btn-primary" onClick={this.checkForTeacher} to="/stage2">Urmatorul pas</Link>)}


                        </Fragment>
                    }
                    {
                        this.props.stage && this.props.stage === 2 &&
                        <Fragment>

                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Acasa</Link></li>
                                    <li className="breadcrumb-item"><Link to="/stage1">Informatii Generale</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Data</li>
                                </ol>
                            </nav>
                            {
                                idForTeacherSelected !== 12345 ? (
                                    <Fragment>
                                        <div className="form-group">
                                            <h3>Buna, {this.state.lName.toUpperCase()}</h3>
                                        </div>

                                        <div className="form-group">
                                            <h6>{fullName} -{
                                                this.state.subjectForTeacher.map((subject, index) => <span >{subject}</span>)
                                            }</h6>
                                        </div>
                                        <div className="form-group">
                                            Regulile Aplicatiei:
                                            <br />
                                            <span className="badge badge-secondary">Regula 1:</span><br />
                                            <label htmlFor="">Selectati fiecare interval orar in care sunteti disponibil/a.</label>
                                            <br />
                                            <span className="badge badge-secondary">Regula 2:</span><br />
                                            <label htmlFor="">Puteti modifica fiecare interval orar dupa preferinte.</label>

                                        </div>
                                        <div className="form-group" style={{ "display": "flex" }}>
                                            {
                                                this.state.subjectForTeacher.map((subject, index) => {
                                                    return (
                                                        <div className="card" style={{ "width": "18rem", "marginRight": "10px" }}>
                                                            <img src="https://miro.medium.com/max/5400/1*8db3pXwTgRCn-wTJYjrOIw.jpeg" className="card-img-top" alt="..." />
                                                            <div className="card-body">
                                                                <h5 className="card-title">Materie - {index + 1}.{subject}</h5>
                                                                <p className="card-text">{`Pentru aceasta materie aveti ${this.state.numberOfCoursesForTeacher[index]} cursuri si ${this.state.numberOfSeminariesForTeacher[index]} seminarii.`}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="form-group" style={{ "width": "25rem" }}>
                                            <br />
                                            <ul className="list-group">
                                                <li className="list-group-item list-group-item-danger"><i className="fas fa-battery-full" /> : Imi doresc neaparat aceest interval <br /></li>
                                                <li className="list-group-item list-group-item-primary"><i className="fas fa-battery-half" /> : Accept acest interval <br /></li>
                                                <li className="list-group-item list-group-item-secondary"><i className="fas fa-battery-empty" /> : Nu sunt disponibil in  aceest interval <br /></li>
                                            </ul>
                                        </div>

                                        <div className="form-group">

                                            <SetUpIntervals {...this.props} {...this.state} />
                                        </div>

                                    </Fragment>
                                ) : (
                                        <div className="form-group">
                                            <h6>Nu am gasit informatii care sa se potriveasca. Te rugam sa introduci din nou informatiile</h6>
                                            <Link className="btn btn-primary" to="/stage1">Inapoi</Link>
                                        </div>
                                    )
                            }

                        </Fragment>
                    }
                </form>
            </div>
        ) : null
    }
}
