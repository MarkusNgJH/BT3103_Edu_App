import React from 'react';
import store from '../store';

class InstructorPastAssignment extends React.Component {
    render() {
        const state = store.getState();

        return (
            <div>
                <h1> This is instructor {state.firebase.currentView}</h1>
            </div>
        )
    }
}

export default InstructorPastAssignment;

