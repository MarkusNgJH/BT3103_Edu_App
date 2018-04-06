import React from "react";
import store from '../store';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';


// var divStyle = {
//     margin-right: "50px"
//   };

var nameToID = {R6nSbDVly8PUnC6jQFcseDS9sgJ3: 'Chris Boesch', g8odN87wiURjfhqbw1HiMoFIwxn1: 'Neo Ann Qi'}

class ActiveUserInfo extends React.Component{        

    componentDidMount() {
        console.log("component mounted");
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }  

    render() {
        return (
            <div style = {{marginRight:"50px", marginTop:"5px"}}>
                <div><strong>UserID: </strong>{nameToID[store.getState().activeProfile.val.uid]}</div>
                <div><strong>Role: </strong>{store.getState().activeProfile.val.role}</div>
                <div><strong>Course: </strong>{store.getState().activeProfile.val.course}</div>
            </div>
        )
    }
}

export default ActiveUserInfo;