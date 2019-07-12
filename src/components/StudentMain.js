import React from 'react';
import IdForm from './utils/IdForm.js';

class StudentMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            result: '',
            called: false
        }
    }
    render() {
        return (
            <div className="content">
                <h3 className="titles">Find Student by ID</h3> <br />
                <IdForm
                    onResult={data => {
                        this.setState({
                            result: data,
                            called: true
                        });
                        console.log("sbiri");
                    }}
                    suffix="students" />
                <StudentResult value={this.state.result} called={this.state.called} caller="single_id" /> <br />

                <h3 className="titles">Retrieve all students list</h3>

            </div>
        );
    }


}


class StudentResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            called: false
        }
    }

    componentWillUpdate() {
        if (!this.state.called)
            this.setState({
                called: true
            });
    }

    render() {
        if (!this.props.called)
            return null;
        if (this.props.caller === "single_id")
            return (
                <table border="1">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Actions</th>
                        </tr>
                        <StudentItem value={this.props.value} />
                    </tbody>
                </table>);
        return (
            <table border="1">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                    {
                        this.props.value.map(function (item, index) {
                            return (
                                <StudentItem value={item} key={index} />
                            );

                        })

                    }
                </tbody>
            </table>
        );


    }

}

function StudentItem(props) {
    return (
        <tr key={props.index}>
            <td>
                {props.value.id}
            </td>
            <td>
                {props.value.name}
            </td>
            <td>
                {props.value.surname}
            </td>
            <td>
                {
                    <DetailsButton student={props.value.id} />
                    //<CareerDetails student={props.value.id} />
                }
            </td>
        </tr>
    );
}

function DetailsButton(props) {
    return (
        <button className="buttons" student={props.student}>See career</button>
    );
}
export default StudentMain;