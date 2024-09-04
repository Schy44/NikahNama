import React, { useState } from 'react';
import './login.css';
import { FaEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";
import { NavLink, useNavigate } from 'react-router-dom';

function Loginform() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    password: user.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {

                if (data.tokens) {
                    localStorage.setItem('access_token', data.tokens.access);
                    localStorage.setItem('refresh_token', data.tokens.refresh);
                }
                alert("Login successful");
                setUser({
                    email: "",
                    password: ""
                });
                setErrors({});
                navigate("/");
            } else if (response.status === 400) {
                setErrors(data);
                if (data.detail) {
                    alert(data.detail);
                } else {
                    alert("Login failed. Please check your credentials.");
                }
            } else {
                alert("Login failed. Please try again later.");
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert("Login failed. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type='email'
                        name='email'
                        placeholder='Enter your email'
                        required
                        autoComplete='off'
                        value={user.email}
                        onChange={handleInput}
                    />
                    <div className="password">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            placeholder='Enter your password'
                            required
                            autoComplete='off'
                            value={user.password}
                            onChange={handleInput}
                        />
                        <span className="toggle-password" onClick={togglePasswordVisibility}>
                            {showPassword ? <TbEyeClosed /> : <FaEye />}
                        </span>
                    </div>
                    <button type='submit' disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <div className="signup-sec">
                        <p>Don't have an account?</p>
                        <NavLink className='reglink' to="/signup">Signup</NavLink>
                    </div>
                    <div className="forgot">
                        <NavLink className='forgot' to="/forgot_pass">Forgot Password?</NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Loginform;
