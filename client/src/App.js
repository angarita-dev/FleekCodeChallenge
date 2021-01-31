import React from 'react'; 
import Login from 'containers/Login';
import SignUp from 'containers/SignUp';
import Dashboard from 'containers/Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { initialState, reducer } from 'store/UserStore';

export const AuthContext = React.createContext();

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const redirectIfAuthenticated = (component) => {
    return state.isAuthenticated ?
      <Redirect to='/dashboard' /> :
      React.createElement(component)
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return state.isAuthenticated ?
                <Redirect to="/dashboard" /> :
                <Redirect to="/login" />
            }}
          />
          <Route path="/login"
            render={() => redirectIfAuthenticated(Login)}
          />
          <Route path="/signup"
            render={() => redirectIfAuthenticated(SignUp)}
          />
          <Route
            path="/dashboard"
            render={() => {
              return state.isAuthenticated ?
                <Dashboard /> :
                <Redirect to='/login' />;
            }}
          />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
