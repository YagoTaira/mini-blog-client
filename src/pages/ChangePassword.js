import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    let navigate = useNavigate();

    const changePassword = () => {
        axios.put(
            "https://full-stack-api-yagotaira-bc870caa5c53.herokuapp.com/auth/changePassword", 
            {
                oldPassword: oldPassword,
                newPassword: newPassword,
            }, 
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }
        ).then((response) => {
            if(response.data.error) {
                alert(response.data.error);
            } else {
                navigate("/");
            }
            
        });
    };

  return (
    <div>
        <h1>ChangePassword</h1>
        <input 
            type="text"
            placeholder="Old password"
            onChange={(event) => {
                setOldPassword(event.target.value);
            }}
        />
        <input 
            type="text"
            placeholder="New password"
            onChange={(event) => {
                setNewPassword(event.target.value);
            }}
        />
        <button onClick={changePassword}> Save Changes </button>
    </div>
  );
}

export default ChangePassword;