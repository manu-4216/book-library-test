import React, { Component, Fragment } from 'react';
import './style.css';

class Expandable extends Component {
    constructor() {
        super();

        this.state = { expanded: false };

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    render() {
        const { expanded } = this.state;
        const { content } = this.props;

        return (
            <div className={'Expandable' + (expanded ? ' Expanded' : '')}>
                <Fragment>
                    <div className="Expandable-Content">
                        {content}
                        <div
                            className="Expandable-Less-Text"
                            onClick={this.handleToggle}
                        >
                            Less
                        </div>
                    </div>

                    <span className="Expandable-More-Area">
                        <span className="Expandable-More-Area-Dots">...</span>
                        <span
                            className="Expandable-More-Area-Text"
                            onClick={this.handleToggle}
                        >
                            More
                        </span>
                    </span>
                </Fragment>
            </div>
        );
    }
}

export default Expandable;
