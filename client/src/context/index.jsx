import React, { createContext, useContext, 
    useEffect, useRef, useState} from 'react';
import { ethers } from'ethers';
import web3Modal from 'web3modal';
import { useNavigate } from 'react-router-dom';

import {ABI, ADDRESS} from '../contract';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) =>{
    //smart contract interaction
    const [WalletAddress, setWalletAddress] = useState('');
    const [provider, setProvider] = useState('');
    const [contract, setContract] = useState('')

    //Set the wallet address to state

    const updateCurrentWalletAddress = async () => {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'});
            if(accounts) setWalletAddress(accounts[0]);
    }

    useEffect(() => {
        updateCurrentWalletAddress();

        window.ethereum.on('accountChanged', updateCurrentWalletAddress);
    }, []);
    //setting  the sc and provider to state
    useEffect(() => {
      const setSmartContractAndProvider = async () => {
        const web3Modal = new web3Modal();
        const connection = await web3Modal.connect();
        const newProvider = new ethers.providers.Web3Provider(connection);
        const signer = newProvider.signer();
        const newContract = new ethers.Contract(ADDRESS, ABI, signer);
        
        setProvider(newProvider);
        setContract(newContract);

    }

      setSmartContractAndProvider();
    }, []);
    

    return(
        <GlobalContext.Provider value={{
            contract, WalletAddress
        }}>
        {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext
(GlobalContext);