import React, { useState } from 'react'
import './LoginPage.css'
import BgVideo from '../../assets/login-background-vid.mp4'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useEffect } from 'react';

const LoginPage = () => {

    const navigate = useNavigate()

    const LoginResponseSuccess = async (res) => {
        var token = res.credential
        var decoded = jwt_decode(token);
        localStorage.setItem("user", JSON.stringify(decoded))
        if (localStorage.getItem("user")) {
            navigate('/main')
        } else navigate('/')
    }

    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate('/main')
        } else navigate('/')
    }, [])

    const LoginResponseError = (res) => {
        console.log(res);
    }

    return (
        <div className='LoginPage__container'>
            <div className="video">
                <video src={BgVideo} type="video/mp4" loop controls={false} muted autoPlay />
                <div className="back-overlay">
                    <div className="google-login">
                        <GoogleLogin
                            onSuccess={LoginResponseSuccess}
                            onError={LoginResponseError}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage