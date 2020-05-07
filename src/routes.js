import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Pages/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Erro from './Pages/Erro';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import New from './Pages/New';

const Routes = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/dashboard/new" component={New}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route path="*" component={Erro}/> 
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;