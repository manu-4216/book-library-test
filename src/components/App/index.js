import React, { Component, Fragment } from 'react';
import logo from '../../logo.svg';
import './style.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../Header';
import BooksIndex from '../BooksIndex';
import Cart from '../Cart';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <Route component={Header} />

                    <div className="App-Body-Container">
                        <div className="App-Body">
                            <Switch>
                                <Route path="/cart" component={Cart} />
                                <Route
                                    path="/payment"
                                    component={() => <div>Coming soon</div>}
                                />
                                <Route path="/" component={BooksIndex} />
                            </Switch>
                        </div>
                    </div>
                </Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
