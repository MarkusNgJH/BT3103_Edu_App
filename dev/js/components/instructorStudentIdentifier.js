import React from 'react';
import store from '../store';

class instructorStudentIdentifier extends React.Component {
    render() {
        const state = store.getState();

        return (
            <div>
                <h1> This is instructor {state.firebase.activeView.currentView}</h1>
            </div>
        )
    }
}

export default instructorStudentIdentifier;


