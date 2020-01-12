import React, { Component, Fragment } from 'react'
import "./teacherForm.style.scss";
import { Link } from 'react-router-dom';
export default class TeacherForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: this.props.stage || "zero"
        }
    }
    componentDidMount() {

    }

    render() {
        const { stage } = this.props;
        return this.props.stage ? (
            <div className="teacherFormContainer">
                <form>
                    {JSON.stringify(this.props)}
                    {
                        this.props.stage && this.props.stage === 10 &&
                        <div class="jumbotron">
                            <h2 class="display-4">Buna, dl/dn profesor!</h2>
                            <p class="lead">Acest site este conceput pentru a simplica munca, de a creea un orar optimizat cat mai usor posibil.</p>
                            <hr class="my-4" />
                            <p>Dorim sa fiti cat mai sincer dar totusi sa va ganditi si la ceilalti colegi cand veti alege intervalele orare.</p>
                            <p class="lead">
                                <Link className="btn btn-primary btn-lg" to="/stage1">
                                    Completeaza formularul!
                                </Link>
                            </p>
                        </div>
                    }
                    {
                        this.props.stage && this.props.stage === 1 &&
                        <Fragment>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><Link to="">Acasa</Link></li>
                                    <li class="breadcrumb-item active" aria-current="page">Informatii Generale</li>
                                </ol>
                            </nav>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Nume</label>
                                <input type="text" className="form-control" id="name" name="name" placeholder="Nume Familie" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="prenume">Prenume</label>
                                <input type="text" className="form-control" id="prenume" name="prenume" placeholder="Nume Familie" />
                            </div>
                            <Link className="btn btn-primary" to="/stage2">Urmatorul pas</Link>
                            {/* <button type="submit" class="btn btn-primary">Urmatorul pas</button> */}
                        </Fragment>
                    }
                    {
                        this.props.stage && this.props.stage === 2 &&
                        <Fragment>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><Link to="">Acasa</Link></li>
                                    <li class="breadcrumb-item active" aria-current="page">Etapa 2</li>
                                </ol>
                            </nav>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to="/">Acasa</Link></li>
                                <li class="breadcrumb-item"><Link to="/stage1">Acasa</Link></li>
                                    <li class="breadcrumb-item active" aria-current="page">Data</li>
                                </ol>
                            </nav>
                            <div className="form-group">
                                <h3>Buna, Ioana</h3>
                                <h6>Colab. Ioana Popescu - Matematica</h6>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Nume</label>
                                <input type="text" className="form-control" id="name" name="name" placeholder="Nume Familie" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="prenume">Prenume</label>
                                <input type="text" className="form-control" id="prenume" name="prenume" placeholder="Nume Familie" />
                            </div>
                            <Link className="btn btn-primary" to="/stage2">Urmatorul pas</Link>
                            {/* <button type="submit" class="btn btn-primary">Urmatorul pas</button> */}
                        </Fragment>
                    }
                </form>
            </div>
        ) : null
    }
}
