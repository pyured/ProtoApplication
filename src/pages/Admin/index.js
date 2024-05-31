import "./style.scss"
import React, { useState,useEffect} from 'react';
import { users } from './UsersData'; 
import { useNavigate } from 'react-router-dom';

function Admin(){
    useEffect(() => {

        localStorage.setItem('user', "");
    
          }, []);

    const [userName, setUserName] = useState("");
    const [userPass, setUserPass] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const nav = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        // const data = (
        //     {
        //         username: userName,
        //         password: userPass
        //     }
        // )
        if(isChecked != false) {
            setUserName(userName);
            setUserPass(userPass);
            nav('/dashboard',{state:{login: true}});
        }
        const userCheck = users.find((value) => {return value.username === userName && value.password === userPass});
        if (userCheck!==undefined){
            setUserName("");
            setUserPass("");
            localStorage.setItem('user', userName);
            nav('/dashboard',{state:{login: true}});
        }else{
            localStorage.setItem('user', "");
            alert("Login failed.")
        }
    };
    
    return (
    <div className="login-container">
        <div className="form-container">
            <form id="signin-form" className="signin-form" onSubmit={handleSubmit}>
                <div className="logo-container">
                    <img src="https://www.schools.nyc.gov/images/default-source/logos-icons/logo-mobile.svg" alt="DOE Logo" />
                </div>
                <h2>Sign In</h2>
                <div className="form-group">
                    <label className="gap">
                        Username/Email
                    </label>
                    <input name="username" type="text" placeholder="Enter Username..." id="username" onInput={(e) => {
                        setUserName(e.target.value);
                    }}/>
                </div>
                <div className="form-group">
                    <label className="gap">
                        Password
                    </label>
                    <input name="password" type="password" placeholder="Enter Pin..." id="password" onInput={(e) => {
                        setUserPass(e.target.value);
                    }}/>
                </div>
                <div id="errorMessage" className="error-message"></div>
                <div>
                    <button className="enter" type="submit">Sign In</button>
                </div>
                <div>
                    <a className="forgot-pass" href="#">
                        Forgot Password
                    </a>
                </div>
                <label className="rememberMe">
                    <input type="checkbox" name="remember" value={isChecked} onChange={handleSubmit}/>
                    Remember Me
                </label>
            </form>
        </div>
    </div>
    );
}
export default Admin;

