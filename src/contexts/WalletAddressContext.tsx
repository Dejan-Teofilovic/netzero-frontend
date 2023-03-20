import React, { createContext, useContext, useReducer } from 'react';
import { Icon } from '@iconify/react';
import api from '../utils/api';
import { AlertMessageContext } from './AlertMessageContext';
import { LoadingContext } from './LoadingContext';

/* --------------------------------------------------------------- */

interface IInitialState {
  walletAddressId: number;
  walletAddress: string;
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

/* --------------------------------------------------------------- */

const initialState: IInitialState = {
  walletAddressId: 0,
  walletAddress: ''
};

const handlers: IHandlers = {
  SET_WALLET_ADDRESS_ID: (state: object, action: IAction) => {
    return {
      ...state,
      walletAddressId: action.payload
    };
  },
  SET_WALLET_ADDRESS: (state: object, action: IAction) => {
    return {
      ...state,
      walletAddress: action.payload
    };
  }
};

const reducer = (state: object, action: IAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

//  Context
const WalletAddressContext = createContext({
  ...initialState,
  connectWalletAct: (userId: number, walletAddress: string) => Promise.resolve()
});

//  Provider
function WalletAddressProvider({ children }: IProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { openAlert } = useContext(AlertMessageContext)
  const { openLoading, closeLoading } = useContext(LoadingContext)

  /*  Get the id of wallet that is connected. */
  const connectWalletAct = (userId: number, walletAddress: string) => {
    openLoading()
    api.post('/wallet/connect-wallet', { userId, walletAddress })
      .then(response => {
        console.log()
        dispatch({
          type: 'SET_WALLET_ADDRESS_ID',
          payload: response.data.id
        })
        dispatch({
          type: 'SET_WALLET_ADDRESS',
          payload: response.data.wallet_address
        })
        closeLoading()
      })
      .catch(error => {
        console.log('>>>>>> error of connectWalletAct => ', error)
        closeLoading()
        openAlert({
          color: 'red',
          title: 'Error',
          icon: <Icon icon="fluent-mdl2:status-error-full" className="text-2xl" />,
          message: error?.response?.statusText || 'Server error.'
        })
      })
  }

  return (
    <WalletAddressContext.Provider
      value={{
        ...state,
        connectWalletAct,
      }}
    >
      {children}
    </WalletAddressContext.Provider>
  );
}

export { WalletAddressContext, WalletAddressProvider };