import React from 'react'; 
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
      <div className="App">
      </div>
    </AuthContext.Provider>
  );
}

export default App;
