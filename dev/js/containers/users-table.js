import React, { Component }from 'react';
import {connect} from 'react-redux';
import {
      Table,
      TableBody,
      TableHeader,
      TableHeaderColumn,
      TableRow,
      TableRowColumn,
    } from 'material-ui/Table';
    
class UsersTable extends Component {
    generateUsersTable() {
        return this.props.allUsers.map((user) => {
            return (
                <tr>
                    <td>
                        {user.first}
                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
                <div>
                    <h1>This is the UsersTable.</h1>
                    <h3>Data from TheNewBoston</h3>
                    <table>
                        {this.generateUsersTable()}
                    </table>
                </div>
            );
        }
    }

function mapStateToProps(state){
    return{
        allUsers: state.users
    };
}    

export default connect(mapStateToProps)(UsersTable); 