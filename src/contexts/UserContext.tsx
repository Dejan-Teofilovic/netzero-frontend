import React, { createContext, useEffect, useReducer } from 'react';
import api from '../utils/api';
import {
  LOCALSTORAGE_TOKEN_NAME,
} from '../utils/constants';
import {
  decodeToken,
  getItemOfLocalStorage,
  removeItemOfLocalStorage,
  setAuthToken,
  setItemOfLocalStorage
} from '../utils/functions';
import { IUser } from '../utils/interfaces';

// ----------------------------------------------------------------------
interface IInitialState {
  token: string;
  user?: IUser;
}

interface IAction {
  type: string,
  payload: any
}

interface IProps {
  children: any
}

interface IHandlers {
  [key: string]: Function,
}

// ----------------------------------------------------------------------

const initialState: IInitialState = {
  token: ''
};

let count = 0;

const handlers: IHandlers = {
  SET_TOKEN: (state: object, action: IAction) => {
    return {
      ...state,
      token: action.payload
    };
  },
  SET_USER: (state: object, action: IAction) => {
    return {
      ...state,
      user: action.payload
    };
  },
};

const reducer = (state: object, action: IAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

//  Context
const UserContext = createContext({
  ...initialState,
  setTokenAct: (token: string) => Promise.resolve(),
  logout: () => Promise.resolve(),
});

//  Provider
function UserProvider({ children }: IProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let tokenOfLocalStorage = getItemOfLocalStorage(LOCALSTORAGE_TOKEN_NAME);
    if (tokenOfLocalStorage && count === 0) {
      count += 1;
      setAuthToken(tokenOfLocalStorage)
      api.get('/admin/check-expiration-of-token')
        .then(response => {
          dispatch({
            type: 'SET_TOKEN',
            payload: tokenOfLocalStorage
          })
        })
        .catch(error => {
          setAuthToken(null)
          dispatch({
            type: 'SET_TOKEN',
            payload: ''
          })
          removeItemOfLocalStorage(LOCALSTORAGE_TOKEN_NAME)
        })
    }
  }, [])

  useEffect(() => {
    if (state.token) {
      const decodedToken = decodeToken(state.token)
      dispatch({
        type: 'SET_USER',
        payload: decodedToken?.user
      })
    }
  }, [state.token])

  const setTokenAct = (token: string) => {
    setItemOfLocalStorage(LOCALSTORAGE_TOKEN_NAME, token)
    setAuthToken(token)
    dispatch({
      type: 'SET_TOKEN',
      payload: token
    })
  }

  const logout = () => {
    removeItemOfLocalStorage(LOCALSTORAGE_TOKEN_NAME)
    setAuthToken(null)
    dispatch({
      type: 'SET_TOKEN',
      payload: ''
    })
    dispatch({
      type: 'SET_USER',
      payload: undefined
    })
  }

  return (
    <UserContext.Provider
      value={{
        ...state,
        setTokenAct,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };