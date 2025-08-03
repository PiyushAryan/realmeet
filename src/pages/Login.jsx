import React from 'react'
import FormComp from '../components/forms/FormComp'
import Navbar from '../components/common/Navbar'

const Login = () => {
    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            <FormComp />
        </div>
    );
};

export default Login