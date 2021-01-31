import React from 'react'; 
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import Login from 'containers/Login';
import SignUp from 'containers/SignUp';
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
          <Route path="/login"
            render={() => redirectIfAuthenticated(Login)}
          />
          <Route path="/signup"
            render={() => redirectIfAuthenticated(SignUp)}
          />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
