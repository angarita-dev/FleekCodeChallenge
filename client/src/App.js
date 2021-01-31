import React from 'react'; 
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { initialState, reducer } from 'store/UserStore';


export const AuthContext = React.createContext();

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <Router>
        <div className="App">
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
