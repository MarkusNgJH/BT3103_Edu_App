import React from 'react';
import Recharts from '../containers/recharts';
import Dashboard from './dashboard';

const PageTwo = () => (
    <div>
        <h1>Welcome to page 2 of our app!</h1>
        <h2>Recharts Component:</h2>
        <Recharts/>
        <hr />
        <h2>Dashboard Component:</h2>
        <Dashboard />
    </div>
);

export default PageTwo;