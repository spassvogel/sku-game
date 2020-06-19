import React, { useContext } from "react";
import './settings.css';
import { AppContext } from "components/context/AppProvider";

const Settings = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleMutedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setMuted', value: !e.target.checked})  
  }

  // @ts-ignore 
  window.cheat = () => {
    dispatch({ type: 'cheat' })  
  }
  return (
    <div className="settings">
      <input type="checkbox" onChange={handleMutedChange} checked={state.muted === false} />
      <label>Sound on</label>
    </div>
  )
}

export default Settings;