import React from 'react';
import Recharts from '../containers/gridList';
import Dashboard from './dashboard';
import Login from './login'

const PageTwo = () => (
    <div>
        <h1>Welcome to page 2 of our app!</h1>
        {/* <Login /> */}
        <h2>Recharts Component:</h2>
        <Recharts/>
        <hr />
        <h2>Dashboard Component:</h2>
        <Dashboard />
    </div>
);

export default PageTwo;s