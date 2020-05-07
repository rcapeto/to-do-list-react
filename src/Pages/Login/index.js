import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './style.css';
import firebase from '../../firebase';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    useEffect(()=>{
        if(firebase.getCurrent()){
            history.push('/dashboard');
        } 
    },[]);

    async function login(e){
        e.preventDefault();

        if(email === '' || password === ''){
            alert('Por favor, digite todos os campos.');
            return;
        } 

        try{
            await firebase.login(email, password)
                .then(()=>{
                    history.push('/dashboard');
                })
                .catch(error =>{
    
                    if(error.code === 'auth/user-not-found'){
                        alert('Esté usuário não existe.');

                    } else if(error.code === 'auth/wrong-password'){
                        alert('Senha incorreta, por favor tente novamente.');

                    } else {
                        alert(`Error: ${error.code}`);
                    }
                    setPassword('');
    
                    return null;
                });
        

        } catch (error) {
            console.error(error.message);
        }
       
    }

    return(
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={login}>
                <label>E-mail:</label>
                <input
                    type="email"
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder="exemplo@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label>Senha:</label>
                <input
                    type="password"
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
            <Link to="/register">
                <FiLogIn size={16} color="#7159c1"/>
                Não possui uma conta?
            </Link>
        </div>
    )
}