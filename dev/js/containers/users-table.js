// import React, { Component }from 'react';
// import {connect} from 'react-redux';
// import store from "../store";
// import {
//       Table,
//       TableBody,
//       TableHeader,
//       TableHeaderColumn,
//       TableRow,
//       TableRowColumn,
// } from 'material-ui/Table';
    
// class UsersTable extends Component {
//     generateUsersTable() {
//         console.log("store.getState().allUsers:");
//         console.log(store.getState().allUsers.val);
//         return store.getState().allUsers.val.map((user) => {
//             return (
//                 <tr>
//                     <td>{user.key}</td>
//                     <td>{user.userDisplayName}</td>
//                 </tr>
//             )
//         })
//     }
//     render() {
//         return (
//                 <div>
//                     <h1>This is the UsersTable.</h1>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>User ID</th>
//                                 <th>Display Name</th>
//                                 <th>Course</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {this.generateUsersTable()}
//                         </tbody>
//                     </table>
//                 </div>
//             );
//         }
//     }

// function mapStateToProps(state){
//     console.log("mapStateToProps called");
//     // console.log(UsersTable.props.allUsers);
//     return {
//         allUsers: state.allUsers
//     };
// }    

// export default connect(mapStateToProps)(UsersTable); 