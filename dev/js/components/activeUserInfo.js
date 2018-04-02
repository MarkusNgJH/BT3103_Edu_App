import React from "react";
import store from '../store';

class ActiveUserInfo extends React.Component{
    render() {
        return (
            <div>active userid: {store.getState().activeProfile.val.uid}</div>
        )
    }
}

export default ActiveUserInfo;