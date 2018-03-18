import React from 'react';
import UserList from '../containers/user-list';
import UserDetail from '../containers/user-details';
import Recharts from '../containers/recharts';

const TheNewBoston = () => (
    <div>
        <h2> Username List: </h2>
        <UserList />
        <hr />
        <h2> User Details:</h2>
        <UserDetail />
        <h2> Print Database:</h2>
        <hr />
        <Recharts/>
    </div>
);

export default TheNewBoston;