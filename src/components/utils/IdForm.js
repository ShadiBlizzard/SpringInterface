import React from 'react';

class IdForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            baseURL: 'http://localhost:8080/'
        }

        this.handleId = this.handleId.bind(this);
        this.findById = this.findById.bind(this);
    }
    render() {
        return (
            <div>
                <form onSubmit={this.findById}>
                    <input required type="number" onChange={this.handleId} placeholder="Insert id"/>
                    <input type="submit" value="submit"/>
                </form>
            </div>
        );
    }

    handleId(event) {
        this.setState({
            value: event.target.value
        });

    }

    findById = event => {
        event.preventDefault();

        console.log("hello");
        fetch(this.state.baseURL + this.props.suffix +"/" + this.state.value)
            .then(
                (response) => response.json())
            .then(searchRes => {
                return searchRes.response;
            })
            .then(data => {
                if (this.props.onResult) {
                    this.props.onResult(data);
                    console.log(data);
                }
            })
            .catch(err => console.log(err));

    }

}

export default IdForm;