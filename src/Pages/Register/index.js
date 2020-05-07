import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import firebase from '../../firebase';
import './style.css';

export default function Register(){
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(()=>{
        if(firebase.getCurrent()){
            history.push('/dashboard');
        }
    },[]);

    async function register(e){
        e.preventDefault();

        try{
            await firebase.register(name,email, password).then(()=>{
                localStorage.setItem('userName', name);

                history.push('/dashboard');

            }).catch(error =>{
                if(error.code === 'auth/weak-password'){
                    alert('Por favor, para sua segurança digite uma senha mais forte.');
                } else{
                    alert(`Error: ${error.code}`);
                }
                setName('');
                setEmail('');
                setPassword('');
            });

        } catch(error){
            console.error(error.message);
        } 
    }

    return(
        <div className="register">
            <h1>Novo usuário</h1>
            <form onSubmit={register}>
                <label>Nome:</label>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoFocus
                    placeholder="Digite o seu nome"
                />
                <label>E-mail:</label>
                <input
                    type="email"
                    autoComplete="off"
                    autoCorrect="off"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                />
                <label>Senha:</label>
                <input
                    type="password"
                    autoComplete="off"
                    autoCorrect="off"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                />
                <button type="submit">Cadastrar</button>
            </form>
            <Link to="/login">
                <FiArrowLeft size={16} color="#7159c1"/>
                Voltar para login
            </Link>

        </div>
    )
}