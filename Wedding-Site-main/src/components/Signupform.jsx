import React, { useState } from 'react';
import './signup.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";

function Signupform() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        password2: ""
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });

        let error = "";

        switch (name) {
            case 'username':
                if (value.length < 3) {
                    error = 'Username must be at least 3 characters long';
                }
                break;
            case 'email':
                if (!/\S+@\S+\.\S+/.test(value)) {
                    error = 'Invalid email address';
                }
                break;
            case 'password':
                if (value.length < 8) {
                    error = 'Password must be at least 8 characters long';
                } else if (!/[A-Z]/.test(value)) {
                    error = 'Password must include at least one uppercase letter';
                } else if (!/[a-z]/.test(value)) {
                    error = 'Password must include at least one lowercase letter';
                } else if (!/[0-9]/.test(value)) {
                    error = 'Password must include at least one number';
                } else if (!/[^A-Za-z0-9]/.test(value)) {
                    error = 'Password must include at least one special character';
                }
                break;
            case 'password2':
                if (value !== user.password) {
                    error = 'Passwords do not match';
                }
                break;
            default:
                break;
        }

        setErrors({ ...errors, [name]: error });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (user.password !== user.password2) {
            setErrors({ ...errors, password2: 'Passwords do not match' });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    password2: user.password2,  // Send both passwords for backend validation
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration successful");
                setUser({
                    username: "",
                    email: "",
                    password: "",
                    password2: ""
                });
                setErrors({});
                navigate("/");
            } else if (response.status === 400) {
                setErrors(data);
                if (data.email) {
                    alert("Email already exists. Please use a different email.");
                }
            } else {
                alert("Registration failed. Please try again later.");
            }
        } catch (error) {
            console.error('Error registering:', error);
            alert("Registration failed. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reg">
            <div className="reg-form">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='username'
                        placeholder='Enter your username'
                        required
                        autoComplete='off'
                        value={user.username}
                        onChange={handleInput}
                        className={errors.username ? 'error' : ''}
                    />
                    {errors.username && <div className="error-message">{errors.username}</div>}

                    <input
                        type='email'
                        name='email'
                        placeholder='Enter your email'
                        required
                        autoComplete='off'
                        value={user.email}
                        onChange={handleInput}
                        className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}

                    <div className="password">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            placeholder='Enter your password'
                            required
                            autoComplete='off'
                            value={user.password}
                            onChange={handleInput}
                            className={errors.password ? 'error' : ''}
                        />
                        <span className="toggle-password" onClick={togglePasswordVisibility}>
                            {showPassword ? <TbEyeClosed /> : <FaEye />}
                        </span>
                    </div>
                    {errors.password && <div className="error-message">{errors.password}</div>}

                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password2'
                        placeholder='Confirm your password'
                        required
                        autoComplete='off'
                        value={user.password2}
                        onChange={handleInput}
                        className={errors.password2 ? 'error' : ''}
                    />
                    {errors.password2 && <div className="error-message">{errors.password2}</div>}

                    <button type='submit' disabled={loading}>
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                    <div className="signup-sec">
                        <p>Already have an account?</p>
                        <NavLink className='reglink' to="/login">Login</NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signupform;
