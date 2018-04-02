import React from 'react';
import store from '../store';
import Dashboard from './dashboard';

class InstructorHighLowPerformance extends React.Component {
    render() {
        const state = store.getState();

        return (
            <div>
                <h1> This is instructor {state.activeView.currentView}</h1>
                <Dashboard/>
            </div>
        )
    }
}

export default InstructorHighLowPerformance
