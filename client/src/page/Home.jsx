import React, { useState } from 'react';

import { PageHOC, CustomInput, CustomButton } from '../components';
import { useGlobalContext } from '../context';

const Home = () => {
  const { contract, walletAddress } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');

  const handleClick = async () =>{
    try {
      const playerExists = await contract.isPlayer(walletAddress);

      if(!playerExists){
        await contract.registerPlayer(playerName, playerName)
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className='flex flex-col'>
      <CustomInput 
        label="Name"
        placeHolder="Enter your player name"
        value={playerName}
        handleValueChange={setPlayerName}
      />
      <CustomButton
        title="Register"
        handleClick={handleClick}
        restStyles="mt-6"
      />
    </div>
  )
};

export default PageHOC (
  Home,
  <>Welcome to Avax Gods<br/>Web3 NFT Card Game</>,
  <>Connect you wallet to start playing<br/>the ultimate Web3 Battle card Game</>
);