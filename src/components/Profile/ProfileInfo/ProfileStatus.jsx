import React, { useState } from 'react';

const ProfileStatus = (props) => {
  const [ActiveMode, setActiveMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  const onActiveMode = () => {
    setActiveMode(true);
  };
  const offActiveMode = () => {
    setActiveMode(false);
    props.updateStatus(status);
  };
  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };
  return (
    <div>
      <span><strong>status: </strong></span>
      {ActiveMode
        ? <input onChange={onStatusChange} autoFocus onBlur={offActiveMode} value={status} />
        : <span onDoubleClick={onActiveMode}>{status}</span>}
    </div>

  );
};
export default ProfileStatus;
