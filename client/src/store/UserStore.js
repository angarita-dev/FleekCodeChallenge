// Initial state for UserStore
export const initialState = {
  isAuthenticated: localStorage.getItem('token') !== null,
  token: localStorage.getItem('token')
};

// Reducer for UserStore
export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload.token);

      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token
      };
    case 'LOGOUT':
      localStorage.clear();

      return {
        ...state,
        isAuthenticated: false,
        token: null
      }
    default:
      return state;
  }
};
