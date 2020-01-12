import React, { Component } from 'react'

<<<<<<< HEAD
// import Calendar from '../Calendar/calendar.component';
import TeacherForm from '../TeacherForm/teacherForm.component'
=======
import Calendar from '../Calendar/calendar.component';
// import TeacherForm from '../TeacherForm/teacherForm.component'
>>>>>>> af0fbaac87cb50f77d8c052aebb7f55414dd8bff

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
export default class Main extends Component {
    render() {
        // return (
        //     <div>
        //         {
        //             /*
        //                 intervale orare:
        //                 luni : 08-20 , 1 - saptamanal
        //                 marti 08-20
        //                 etc
                        

        //             */
        //         }
        //         <p>
        //             Interfață web pentru configurarea orarului. Administratorul configurează intervale orare și săli disponibile, precum și o listă de materii și numărul de cursuri și seminarii. Utilizatorii văd evenimentele asociate lor și configurează restricții pentru fiecare privind sala și intervalele orare, cu posibilitatea de a marca restricții (constrângeri hard și soft). Utilizatorii pot vedea conflictele create în urma constrângerilor lor (de exemplu, suprapunerea unui eveniment în aceeași sală la aceeași oră). Utilizatorii pot adăuga și comentarii asociate cu restricțiile marcate. Restricțiile și comentariile utilizatorilor trebuie să poată fi exportate într-un fișier editabil (XML, XLS, CSV, JSON).
        //         </p>

        //         {/* <Calendar /> */}
        //         <TeacherForm />
        //     </div>
        // )

        return <Router>
            <Switch>
                <Route exact path="/">
                    <div>Stage 0</div>
<<<<<<< HEAD
                    {/* <Calendar/> */}
                    <TeacherForm stage={10}/>
=======
                    <Calendar/>
                    {/* <TeacherForm stage={10}/> */}
>>>>>>> af0fbaac87cb50f77d8c052aebb7f55414dd8bff
                </Route>
                <Route path="/stage1">
                <div>Stage 1</div>
                    {/* <TeacherForm stage={1}/> */}
                </Route>
                <Route path="/stage2">
                <div>Stage 2</div>
                    {/* <TeacherForm stage={2}/> */}
                </Route>
                <Route path="/stage3">
                <div>Stage 3</div>
                    {/* <TeacherForm stage={3}/> */}
                </Route>
            </Switch>
        </Router>
    }
}
