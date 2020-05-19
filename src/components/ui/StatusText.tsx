import React, { useContext } from "react";
import { AppContext } from "components/context/AppProvider";
import './statusText.css';

const StatusText = () => {
  const { state } = useContext(AppContext);
  const text = state.statusText;
  
  return (
    <div className="status">{text}</div>
  );
}

export default StatusText;