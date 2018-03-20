import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserList from '../containers/user-list';
import UserDetail from '../containers/user-details';
import firebase from 'firebase';
import AppFrame from './AppFrame';
import RechartsComp from './RechartsChart.js';

class RechartsChartComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
        this.chartsArr = [];

        var ind=0
        for(var key in props.newCharts){
            // console.log('within loop')
            // console.log(key, props.newCharts[key])
        if(this.props.newCharts[key].style =='recharts')
        {this.chartsArr[ind]=this.props.newCharts[key]
        ind=ind+1
        }

        }
    }

    componentDidMount() {
        const rootRef = firebase.database().ref('sampleData01');
        rootRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items){
                newState.push({
                    id: item,
                    level: items[item].level,
                    numPlayers: items[item].Players
                });
            }
            this.setState({
                items: newState
            });
        });
        // everytime data changes on valueRef, assign value to speed.   
    }

    componentWillReceiveProps(newProps) {
        if (newProps != this.props) {
          this.props = newProps
          var ind = 0
          for (var key in this.props.newCharts) {
            if (this.props.newCharts[key].style == 'recharts') {
            this.chartsArr[ind] = this.props.newCharts[key]
              ind = ind + 1
            }
          }
        }
      }

    render() {
        const output = this.state.items
        return (
            <div>
                <div> 
                    <ul>
                    {this.state.items.map((item) => {
                        return (
                            <li key={item.id}>
                                <h3>Level:{item.level}</h3>
                                <p>Players:{item.numPlayers}</p>
                            </li>
                        )
                    })} 
                    </ul>
                </div>

                <div>{
                    this.chartsArr.map(function(chart, index){
                    // Adding each chart from passed in data. 
                    return <RechartsComp key={index} charts={chart} />;
                    })
                }</div>
            </div>
            
        );
    }
}

const mapStateToProps = state => {
    return { newCharts: state.reCharts.val }
  }
  
const mapDispatchToProps = dispatch => { }
  
const Dashboard = connect(
    mapStateToProps,
)(RechartsChartComp)
  
export default Dashboard;