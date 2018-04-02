import React from "react";
import store from '../store';

class ActiveUserInfo extends React.Component{
    
    componentDidMount() {
        console.log("component mounted");
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }  

    render() {
        return (
            <div>
            <div>active userid: {store.getState().activeProfile.val.uid}</div>
            <div>active role: {store.getState().activeProfile.val.role}</div>
            <div>active course: {store.getState().activeProfile.val.course}</div>
            </div>
        )
    }
}

export default ActiveUserInfo;