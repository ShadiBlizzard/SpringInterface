import React from 'react';
import Button from './utils/Button.js';
import Basic from './Basic.js';
import StudentMain from './StudentMain.js';
import CoursesMain from './CoursesMain.js';
import ExamsMain from './ExamsMain';
import CareersMain from './CareersMain.js';

class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            window: Basic
        };
        this.changeInterface = this.changeInterface.bind(this);

    }

    render() {
        return(
            <div id = "navmenu">
                <Button id="studentsButton" name="Students" click = {this.changeInterface} caller = {StudentMain}/>
                <Button id="coursesButton" name="Courses" click = {this.changeInterface} caller = {CoursesMain}/>
                <Button id="examsButton" name="Exams" click = {this.changeInterface} caller = {ExamsMain}/>
                <Button id="careerButton" name="Careers" click = {this.changeInterface} caller = {CareersMain}/>
                <br/><br/>
                <this.state.window/>
            </div>
        );
    }

    changeInterface(Comp) {
        this.setState({
            window: Comp
            
        });
    }

    

}

export default Content;