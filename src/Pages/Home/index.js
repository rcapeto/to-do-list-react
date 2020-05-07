import React, { useEffect, useState } from 'react';
import './style.css';
import { useHistory } from 'react-router-dom';
import firebase from '../../firebase';

export default function Home(){
    const history = useHistory();
    const [posts, setPosts] = useState([]);


    useEffect(()=>{
        firebase.database.ref('messages').once('value').then(snapshot =>{
            setPosts([]);
            let newPostsArray = [];
            snapshot.forEach(post =>{
                newPostsArray.push({
                    key: post.key,
                    name: post.val().name,
                    title: post.val().title,
                    description: post.val().description
                });
            });
            setPosts(newPostsArray.reverse());
        });

    }, []);

    function goToRegister(){
        history.push('register');
    }
    return(
        <div className="home">
            <div className="apresentation">
                <h2>Projeto To-Do-List</h2>
                <p>Novo sistema de cadastro de tarefas da <strong>Web</strong>!</p>
                <p>Faça um cadastro para garantir o sistema de listas gratuitamente, apenas precisa nos informar
                    o <strong>nome</strong>, <strong>e-mail</strong> e uma <strong>senha</strong>.
                </p>
                <p>Clique no botão abaixo para o novo cadastro!</p>
                <button onClick={goToRegister}>Cadastrar</button>
            </div>
            <h2>Comentários dos usuários: </h2>
            <table>
                <thead>
                    <tr>
                        <td>Nome: </td>
                        <td>Título: </td>
                        <td>Comentário: </td>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post =>(
                        <tr key={post.key}>
                            <td>{post.name}</td>
                            <td>{post.title}</td>
                            <td>{post.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}