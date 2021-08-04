import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Login, Register, MessagePopup, UserContext } from './index';
import './App.css';

export default function App() {
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState('');

  return (
    <div className="container">
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login">
              <Login setMessage={setMessage} />
            </Route>
            <Route exact path="/register">
              <Register setMessage={setMessage} />
            </Route>
          </Switch>
        </UserContext.Provider>
      </Router>
      {message ? <MessagePopup message={message} setMessage={setMessage} /> : null}
    </div>
  );
};