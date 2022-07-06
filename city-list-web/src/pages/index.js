import React from 'react';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Home from './home';
import City from './city';

const Pages = () => {
    return (
        <BrowserRouter>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/city/1">City</Link>
                    </li>
                </ul>

                <hr/>

                {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/city/:id" component={City}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};
export default Pages;