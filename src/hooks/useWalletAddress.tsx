import { useContext } from 'react';
import { WalletAddressContext } from '../contexts/WalletAddressContext';

const useWalletAddress = () => useContext(WalletAddressContext);

export default useWalletAddress;