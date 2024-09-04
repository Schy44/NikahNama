import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TbEyeClosed } from 'react-icons/tb';
import { FaEye } from "react-icons/fa";
import './forgot.css'

function Forgot() {
    const [user, setUser] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    
    const [showPassword, setShowPassword] = useState(false);
    
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
    };
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    return (
        <div>
            <div className="forgot-password">
                <div className="forgot-password-form">
                    <h2>Reset Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="password">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='newPassword'
                                    placeholder='Enter your new password'
                                    id='newPassword'
                                    required
                                    autoComplete='off'
                                    value={user.newPassword}
                                    onChange={handleInput}
                                />
                                <span 
                                    className="toggle-password"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <TbEyeClosed /> : <FaEye />}
                                </span>
                            </div>
                            <div className="password">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='confirmPassword'
                                    placeholder='Confirm your new password'
                                    id='confirmPassword'
                                    required
                                    autoComplete='off'
                                    value={user.confirmPassword}
                                    onChange={handleInput}
                                />
                                <span 
                                    className="toggle-password"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <TbEyeClosed /> : <FaEye />}
                                </span>
                            </div>
                            <button type='submit'>Reset Password</button>

                            <div className="login-sec">
                                <p>Remember your password?</p>
                                <NavLink className='loginlink' to="/login">Login</NavLink>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Forgot;
