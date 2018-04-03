import React from 'react';
import store from '../store';

class instructorAssignmentCat extends React.Component {
    render() {
        const state = store.getState();

        return (
            <div>
                <h1> This is instructor {state.firebase.activeView}</h1>
            </div>
        )
    }
}

export default instructorAssignmentCat;

