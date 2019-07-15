import React from 'react';

class Button extends React.Component {
 

    render() {
        const name = this.props.name;
        return (
            <span className ="customButton" id = {this.props.id} onClick = {() => this.props.click(this.props.caller)}>
                {name}
            </span>
        );
    }
}

export default Button;