import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import firebase from '../../firebase';
import './style.css';
import { FiArrowLeft } from 'react-icons/fi';


export default function New(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();


    useEffect(()=>{
        if(!firebase.getCurrent()){
            history.push('/login');
        }
    },[]);


    async function newPost(e){
        e.preventDefault();
        
        if(title === '' || description === ''){
            alert('Por favor, digite todos os campos!');
            
        } else {
           try{
                let key = firebase.database.ref('messages').push().key;

                await firebase.database.ref('messages').child(key).set({
                    title,
                    description,
                    name: localStorage.getItem('userName')
                });

                alert('Comentário cadastrado com sucesso!');

                setDescription('');
                
                setTitle('');

           }catch(error){
               console.error(error.message);
           }
        }
        
    }

    return(
        <div className="content">
            <div>
                <FiArrowLeft size={20} color="#7157c1"/>
                <Link to="/dashboard">
                    Voltar para o perfil
                </Link>
            </div>
            <div className="new">
                <div className="info">
                    <h2>Informações:</h2>
                    <ul>
                        <li>Seu comentário aparecerá na página inicial.</li>
                        <li>Dicas para os comentários: Sugestões, críticas e sua experiência com a plataforma.</li>
                        <li>Seja criatívo e obrigado por utilizar o nosso sistema!</li>
                    </ul>
                </div>
                <div className="form">
                    <h2>Novo comentário:</h2>
                    <form onSubmit={newPost}>
                        <label>Título:</label>
                        <input 
                            placeholder="Título do comentário"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <label>Comentário:</label>
                        <textarea 
                            placeholder="Digite seu comentário aqui..."
                            value={description}
                            onChange={e => setDescription(e.target.value)}    
                        ></textarea>
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </div> 
    )
}