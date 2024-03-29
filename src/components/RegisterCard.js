import React from 'react';
import { useState } from 'react';
import NotifySuccess from './../utils/notifications/NotifySuccess';
import NotifyWarning from './../utils/notifications/NotifyWarning';
import NotifyError from './../utils/notifications/NotifyError';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ValidateEmail from '../utils/ValidateEmail';


const RegisterCard = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState({
            otp1: '',
            otp2: '',
            otp3: '',
            otp4: '',
            otp5: '',
            otp6: ''
        });
    const handleOtpInputChange = (e) => {
        const {name, value} = e.target;
        setOtp(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    }
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
        telephone:'',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!ValidateEmail(email)){
            setIsSubmitted(false);
            NotifyWarning('Email not valid');
        } else {
            setData({
                name: name,
                email: email,
                telephone: telephone,
                password: password
            });
    
            // POST request to server to send OTP to user
            const postOTP = async () => {
                try {
                    const res = await axios.post("http://localhost:5000/api/v1/send-otp", {email});
                    NotifySuccess(`${res.data.message}`);
                } catch (error) {
                    setIsSubmitted(false);
                    NotifyError(`${error.response.data.message}`);
                }
            }
            postOTP();
    
            setIsSubmitted(true);
        }
       
    }

    const handleRegistrationSubmit = (e) => {
        e.preventDefault();
        let otpString = "";
        for(const value of Object.values(otp)) {
            otpString += value;
        }
        data.otp = otpString;
        // POST request to create user
        const createUser = async () => {
            try {
                const res = await axios.post("http://localhost:5000/api/v1/signup", data);
                NotifySuccess(`${res.data.message}`);
                setIsSubmitted(false);
                navigate('/login', data);
            } catch (error) {
                NotifyError(`${error.response.data.message}`);
            }
        }
        createUser();
    }

  return (
    <div>
        <section className="bg-white mb-16 dark:bg-gray-900 dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
            <div className="flex justify-center items-center px-4 mx-auto max-w-screen-xl text-center relative">
                <div className="w-full max-w-md mb-16 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    {isSubmitted ? (
                        <form className="space-y-6"
                            method="POST"
                            onSubmit={handleRegistrationSubmit}
                        >
                            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                                Enter OTP 
                            </h5>
                            <div>
                                <label
                                    htmlFor="text"
                                    className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Enter code sent to {email}
                                </label>
                            </div>
                            <div className="flex flex-row">
                                <div className="px-2">
                                    <input
                                        type="text"
                                        name="otp1"
                                        value={otp.otp1}
                                        onChange={handleOtpInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        required="required"
                                        pattern="[0-9]"
                                        maxLength="1"
                                        autoFocus
                                    />
                                </div>
                                <div className="px-2">
                                    <input
                                        type="text"
                                        name="otp2"
                                        value={otp.otp2}
                                        onChange={handleOtpInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        required="required"
                                        pattern="[0-9]"
                                        maxLength="1"
                                    />
                                </div>
                                <div className="px-2">
                                    <input
                                        type="text"
                                        name="otp3"
                                        value={otp.otp3}
                                        onChange={handleOtpInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        required="required"
                                        pattern="[0-9]"
                                        maxLength="1"
                                    />
                                </div>
                                <div className="px-2">
                                    <input
                                        type="text"
                                        name="otp4"
                                        value={otp.otp4}
                                        onChange={handleOtpInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        required="required"
                                        pattern="[0-9]"
                                        maxLength="1"
                                    />
                                </div>
                                <div className="px-2">
                                    <input
                                        type="text"
                                        name="otp5"
                                        value={otp.otp5}
                                        onChange={handleOtpInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        required="required"
                                        pattern="[0-9]"
                                        maxLength="1"
                                    />
                                </div>
                                <div className="px-2">
                                    <input
                                        type="text"
                                        name="otp6"
                                        value={otp.otp6}
                                        onChange={handleOtpInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        required="required"
                                        pattern="[0-9]"
                                        maxLength="1"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Submit
                            </button>
                        </form>
                        ) : (
                            <form className="space-y-6"
                                method="POST"
                                onSubmit={handleSubmit}
                            >
                                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                                    Fill the form to create an account
                                </h5>
                                <div>
                                    <label
                                        htmlFor="text"
                                        className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Full name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="John Doe"
                                        required="required"
                                        autoFocus
                                        onChange={e => {setName(e.target.value)}}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="text"
                                        className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="johndoe@domain.com"
                                        required="required"
                                        value={email}
                                        onChange={e => {setEmail(e.target.value)}}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="tel"
                                        className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Phone number
                                    </label>
                                    <input
                                        type="tel"
                                        name="telephone"
                                        id="telephone"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="237672076995"
                                        required="required"
                                        value={telephone}
                                        onChange={e => {setTelephone(e.target.value)}}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        required="required"
                                        value={password}
                                        onChange={e => {setPassword(e.target.value)}}
                                    />
                                </div>
                                <div className="flex items-start">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                    <input
                                        id="policy"
                                        type="checkbox"
                                        defaultValue=""
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                        required="required"
                                    />
                                    </div>
                                    <label
                                        htmlFor="policy"
                                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        required="required"
                                        >
                                        I accept the Terms of Use & Privacy Policy
                                    </label>
                                </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Register
                                </button>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    Already registered?{" "}
                                    <a href="/login" className="text-blue-700 hover:underline dark:text-blue-500">
                                        Login
                                    </a>
                                </div>
                            </form>
                        )}
                </div>
            </div>
        </section>
    </div>
  )
}

export default RegisterCard