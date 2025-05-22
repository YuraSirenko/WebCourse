import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div className="home-container">
        <h1>Welcome to WebCourse SPA</h1>
        <p>
            Please <Link to="/login">login</Link> to continue.
        </p>
    </div>
);
export default Home;
