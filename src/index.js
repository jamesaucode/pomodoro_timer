import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './components/Timer';

const Index = (props) => {
    return (
        <Timer />
    )
}
ReactDOM.render(<Index />, document.getElementById("app"));