import React from 'react';
import './style.css';
import { useHistory } from 'react-router-dom';
import { FiGithub, FiInstagram, FiUser, FiFacebook, FiLinkedin } from 'react-icons/fi';


export default function Header(){
    const history = useHistory();

    function backToHome(){
        history.push('/');
    }

    function goToLogin(){
        history.push('/login')
    }
    function goToInstagram(){
        window.open('https://www.instagram.com/raphacapeto/', '_blank')
    }
    function goToGit(){
        window.open('https://github.com/rcapeto', '_blank')
    }
    function goToFacebook(){
        window.open('https://pt-br.facebook.com/raphael.capeto.7', '_blank')
    }
    function goToLinkedin(){
        window.open('https://www.linkedin.com/in/raphael-capeto-07364a1a2/', '_blank')   
    }



    return(
        <div className="nav">
            <h2 onClick={backToHome}>To-Do-List</h2>
            <ul>
                <li onClick={goToGit}>
                    <FiGithub color="white" size={24}/>
                </li>
                <li onClick={goToLinkedin}>
                    <FiLinkedin color="white" size={24}/>
                </li>
                <li onClick={goToInstagram}>
                    <FiInstagram color="white" size={24}/>
                </li>
                <li onClick={goToFacebook}>
                    <FiFacebook color="white" size={24}/>
                </li>
            </ul>
            <ul>
            <li onClick={goToLogin}>
                    <FiUser size={24} color="white"/>
                </li>
            </ul>
        </div>
    )
}