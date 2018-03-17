import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectUser} from '../actions/index';

class UserList extends Component {
    //map loops through the array
    //when creating a list, we need to assign a key to each item
    createListItems(){
        return this.props.users.map((user) => {
            return (
                <li 
                    key={user.id} 
                    onClick={() => this.props.selectUser(user)}
                >
                    {user.first} {user.last}
                </li>
            );
        });
    }

    render() {
        return (
            <ul>
               {this.createListItems()}
            </ul>
        );
    }
}

function mapStateToProps(state){
    return{
        users: state.users
    };
}    
// passes pieces of the store as properties to the component
// state refers directly to the store
// export default UserList; exports dumb component 

function matchDispatchToProps(dispatch){
    return bindActionCreators({selectUser: selectUser}, dispatch)
}
// pass the function as a prop
// container is a smart component

export default connect(mapStateToProps, matchDispatchToProps)(UserList); 
// we take the component make it aware of the application store/ user data and exporting it.