import React, { Component } from 'react'

import TeacherForm from '../TeacherForm/teacherForm.component'

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
export default class Main extends Component {
    
    render() {
        console.log("sad", this.props)
        return <Router>
            <Switch>
                <Route exact path="/" render={(props) => (
                    <TeacherForm {...props} stage={10} />
                )} />
                <Route path="/stage1" render={(props) => (
                    <TeacherForm {...props} stage={1} />
                )} />
                <Route path="/stage2" render={(props) => (
                    <TeacherForm {...props}  stage={2} />
                )} />
                <Route path="/stage3" render={(props) => (
                    <TeacherForm {...props} stage={3} />
                )} />
                <Route path="/successResponse">
                    <TeacherForm  stage={4} />
                </Route>
                <Route path="/generateProgram">
                    <TeacherForm  stage={99} />
                </Route>
                <Route path="/errorResponse">
                    <TeacherForm stage={5} />
                </Route>
            </Switch>
        </Router>
    }
}
