// import React, {Component} from 'react';
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
// import { keys } from 'material-ui/styles/createBreakpoints';
// import { filter } from '../actions/filter';

// class Assignments extends Component {
//     //map loops through the array
//     //when creating a list, we need to assign a key to each item
//     createListItems(){
//         // return this.props.acheivement.map((acheivement) => {
//         //     return (
//         //         <li key={acheivement.id} >
//         //             {acheivement.name} {acheivement.count}
//         //         </li>
//         //     );
//         // });
//         console.log("CreateListItem Acheive");
//         console.log(this.props.acheivement);
//         if(Object.keys(this.props.acheivement).length != 0){
//             var  acheivementObj = this.props.acheivement.val.assignments;
//             var assignments = [];
//             for (var key in acheivementObj){
//                 assignments.push(acheivementObj[key]);
//             }
//             console.log("List Acheive")
//             console.log(assignments)
//             var filteredData = this.props.filter(acheivementObj, "-L5cRRrocq1yfwzudZXG")
//             var result = []
//             console.log("List filteredData")
//             console.log(filteredData.payload)
//             console.log("List result")
//             for(var key in filteredData.payload){
//                 filteredData[0][key]['id'] = key
//                 result.push(filteredData[0][key])
//             }
//             console.log(result)
//             return result.map((assignment) => {
//                 return (
//                     <li key={assignment.id} >
//                         {assignment.name} {assignment.count}
//                     </li>
//                 );
//             });
//         }
//     }

//     render() {
//         return (
//             <ul> 
//                {this.createListItems()}
//             </ul>
//         );
//     }
// }

// function mapStateToProps(state){
//     return{
//         acheivement: state.acheivement
//     };
// }    

// function matchDispatchToProps(dispatch){
//     return bindActionCreators({filter: filter}, dispatch)
// }

// // passes pieces of the store as properties to the component
// // state refers directly to the store
// // export default UserList; exports dumb component 

// export default connect(mapStateToProps, matchDispatchToProps)(Assignments); 
// // we take the component make it aware of the application store/ user data and exporting it.