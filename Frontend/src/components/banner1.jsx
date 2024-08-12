import React, { Component } from 'react';
import Banner from './Banner';

class Banner1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    handleIncrement = () => {
        this.setState({ count: this.state.count + 1 });
    };

    componentDidUpdate(prevProps, prevState) {
        console.log('Component updated');
        console.log('Previous state:', prevState);
        console.log('Current state:', this.state);
    }

    render() {
        return (
            <div>
                <h1>Banner</h1>
                <p>Count: {this.state.count}</p>
                <button onClick={this.handleIncrement}>Increment</button>
                <Banner />
            </div>
        );
    }
}

export default Banner1;
