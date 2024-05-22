import React, { useState } from 'react';
import Layout from '../../Layout/Layout';
import authStyle from "../../Style/authStyle.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../Layout/BaseUrl';
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post(`${baseUrl}/api/v1/user/login`,{... loginData});
            if (res.data.success) {
                toast.success(res.data.message);
                // Add a delay before navigating
                setTimeout(() => {
                    navigate('/');
                }, 1000); 
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            // Check if the error response structure is as expected
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        }
    }

    return (
        <Layout title={'Register'}>
            <div className='form-containor'>
                <form onSubmit={handleSubmit}>
                    <h4 className='mb-3 title'>Login page</h4>
                    <div className="form-group mb-2">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleUserInput}
                            placeholder="Enter your email"
                        />
                    </div>


                    <div className="form-group mb-2">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleUserInput}
                            placeholder="Password"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Login;
