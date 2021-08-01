import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Login, Register, MessagePopup } from './index';
import './App.css';

export default function App() {
  const [user, setLoginUser] = useState({});
  const [message, setMessage] = useState('');

  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/">
            {
              user && user._id
                ? <Home user={user} setLoginUser={setLoginUser} />
                : <Login setLoginUser={setLoginUser} setMessage={setMessage} />
            }
          </Route>
          <Route exact path="/login">
            <Login setLoginUser={setLoginUser} setMessage={setMessage} />
          </Route>
          <Route exact path="/register">
            <Register setMessage={setMessage} />
          </Route>
        </Switch>
      </Router>
      {message ? <MessagePopup message={message} setMessage={setMessage} /> : null}
    </div>
  );
};