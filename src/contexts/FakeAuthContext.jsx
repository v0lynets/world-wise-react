import { createContext, useContext, useReducer } from "react";

const FakeAuthContext = createContext();

//For studying purpose, not in real projects
const FAKE_USER = {
  name: "Vladislav",
  email: "vladislav@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  user: null,
  isAuth: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isAuth: true, user: action.payload };
    case "logout":
      return { initialState };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, initialState);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <FakeAuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </FakeAuthContext.Provider>
  );
}

function useAuth() {
  const value = useContext(FakeAuthContext);
  if (value === undefined)
    throw new Error("FakeAuthContext was used out AuthProvider");
  return value;
}

export { AuthProvider, useAuth };
