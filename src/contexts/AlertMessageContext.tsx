import React, { createContext, useReducer, ReactNode } from 'react';

// ----------------------------------------------------------------------

type TColor = 'blue' | 'red' | 'green' | 'amber'

interface IInitialState {
  isOpened: boolean;
  color: TColor;
  title?: string;
  message: string;
  icon?: ReactNode;
}

interface IAction {
  type: string;
  payload: any;
}

interface IProps {
  children: any
}

interface IParamsOfOpenAlert {
  title?: string;
  color: TColor;
  message: string;
  icon?: ReactNode
}

interface IHandlers {
  [key: string]: Function;
}

// ----------------------------------------------------------------------

const initialState: IInitialState = {
  isOpened: false,
  color: 'blue',
  message: '',
};

const handlers: IHandlers = {
  INITIALIZE: (state: object, action: IAction) => {
    return {
      ...state,
      ...action.payload
    };
  },
  SET_IS_OPENED: (state: object, action: IAction) => {
    return {
      ...state,
      isOpened: action.payload
    };
  },
  SET_COLOR: (state: object, action: IAction) => {
    return {
      ...state,
      color: action.payload
    };
  },
  SET_TITLE: (state: object, action: IAction) => {
    return {
      ...state,
      title: action.payload
    };
  },
  SET_MESSAGE: (state: object, action: IAction) => {
    return {
      ...state,
      message: action.payload
    };
  },
  SET_ICON: (state: object, action: IAction) => {
    return {
      ...state,
      icon: action.payload
    };
  }
};

const reducer = (state: object, action: IAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

//  Context
const AlertMessageContext = createContext({
  ...initialState,
  openAlert: (alertContent: IParamsOfOpenAlert) => Promise.resolve(),
  closeAlert: () => Promise.resolve()
});

//  Provider
function AlertMessageProvider({ children }: IProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * Visible the alert message
   * @param {object} param0 
   */
  const openAlert = ({ color, title, message, icon }: IParamsOfOpenAlert) => {
    dispatch({
      type: 'SET_IS_OPENED',
      payload: true
    });
    dispatch({
      type: 'SET_COLOR',
      payload: color
    });
    dispatch({
      type: 'SET_TITLE',
      payload: title
    });
    dispatch({
      type: 'SET_MESSAGE',
      payload: message
    });
    dispatch({
      type: 'SET_ICON',
      payload: icon
    });
  };

  /**
   * Unvisible the alert message
   */
  const closeAlert = () => {
    dispatch({
      type: 'INITIALIZE',
      payload: initialState
    });
  };

  return (
    <AlertMessageContext.Provider
      value={{
        ...state,
        openAlert,
        closeAlert
      }}
    >
      {children}
    </AlertMessageContext.Provider>
  );
}

export { AlertMessageContext, AlertMessageProvider };