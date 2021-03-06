// {process.env.REACT_APP_PLAYER_MODE  && (
//     <div id="close">
//       X
//     </div>
//   )}
import React, {  useEffect } from 'react';
import './style/styles.css';
import { ReactComponent as CloseIcon } from './style/close.svg';

interface Props {
    gameDataReceived: (gameData: any) => void;
}

const PlayerBridge = (props: Props) => {   
    const {gameDataReceived} = props;

    const send = (payload: any) => {
        // @ts-ignore
        if (window.hasOwnProperty("webkit") && window.webkit.hasOwnProperty("messageHandlers")){
            var stringifiedMessageObj = JSON.stringify(payload);
            // Send to In App Browser context
            // @ts-ignore
            webkit.messageHandlers.cordova_iab.postMessage(stringifiedMessageObj);
        }
        else {
            // @ts-ignore
            window.parent.postMessage(payload, '*');
        }
    }

    const exit = () => {       
        send({
            type: 'exit'
        });
    }

    
    useEffect(() => {
        if (!process.env.REACT_APP_PLAYER_MODE) {
            return;
        }
        
        const receiveMessage = (msg: any) => {
            if (!msg.data || !msg.data.hasOwnProperty('userId')){
                return;
            }
            // @ts-ignore
            window.GAMEDATA = msg.data;
            gameDataReceived(msg.data);
        }

        // @ts-ignore
        window.setGameData = (gameData) => {
            send({
                type: 'setGameData',
                data: gameData
            });
        }
       
        // @ts-ignore
        window.GAMEDATA = null; 
        
        // @ts-ignore
        window.getGameData = () => {
            // @ts-ignore
            return window.GAMEDATA;
        }   
        window.addEventListener("message", receiveMessage, false);
    }, [gameDataReceived]);

    if (!process.env.REACT_APP_PLAYER_MODE) {
        return null;
    }


    return (
        <div className="close">
            <CloseIcon onClick={exit} />
        </div>
    )
}

export default PlayerBridge;