import React, { useState, useEffect } from 'react';
import './style.css';
import { useHistory } from 'react-router-dom';
import { FiTrash2, FiPower, FiPlus, FiEdit } from 'react-icons/fi';
import firebase from '../../firebase';

export default function Dashboard(){
    const history = useHistory();
    const [taskText, setTaskText] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [userName, setUsername] = useState('');


    useEffect(()=>{
        setUsername(localStorage.getItem('userName'));

        if(!firebase.getCurrent()){
            history.push('/login');
            return;
        }

        firebase.getUsername(info =>{

            localStorage.setItem('userName', info.val().name);
            setUsername(localStorage.getItem('userName'));
           
        });

    },[]);

    async function logout(){
        await firebase.logout().then(()=>{
            history.push('/login');

            localStorage.clear();
        });
    }
    function goToComment(){
        history.push('/dashboard/new');
    }

    function addTask(){
        if(taskText !== ''){
            let newTask = {
                text : taskText,
                id: Date.now()
            }
            setTaskText('');
            setTaskList([...taskList, newTask]);

        } else {
            alert('Digite uma tarefa para adiciona-la em sua lista.')
        }
    }

    function deleteTask(id){
        let newTaskList = taskList.filter(task=> task.id !== id);
        setTaskList(newTaskList);
    }


    return(
        <div className="dashboard">
            <div className="user-control">
                <h2>Bem-vindo(a), <strong>{userName}</strong></h2>
                <div>
                    <button style={{backgroundColor: '#7159c1'}} onClick={goToComment}>
                        <FiEdit size={18} color="#fff" />
                    </button>
                    <button onClick={logout}>
                        <FiPower size={18} color="#fff"/>
                    </button>
                </div>
            </div>
            <div className="tasks">
                <div>
                    <h2>Lista de tarefas: </h2>
                    <input 
                        autoComplete="off"
                        autoCorrect="off"
                        placeholder="Digite uma nova tarefa"
                        value={taskText}
                        onChange={e => setTaskText(e.target.value)}
                    />
                    <button onClick={addTask}>
                        <FiPlus size={18} color="#fff"/>
                    </button>
                </div>
                <ul>
                    {taskList.map(task =>(
                        <li key={task.id}>
                            {task.text}
                            <FiTrash2 
                                size={16} 
                                color="#5d4a9e" 
                                onClick={()=>deleteTask(task.id)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}