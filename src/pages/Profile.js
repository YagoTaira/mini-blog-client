import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../helpers/AuthContext';

function Profile() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [listOfPosts, setlistOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`https://full-stack-api-yagotaira-bc870caa5c53.herokuapp.com/auth/basicInfo/${id}`)
    .then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`https://full-stack-api-yagotaira-bc870caa5c53.herokuapp.com/posts/byUserId/${id}`)
    .then((response) => {
      setlistOfPosts(response.data);
    });
  }, []);

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1> Username: { username } </h1>
        {authState.username === username && (
          <button 
            onClick={() => { 
              navigate("/changePassword");
            }}
          >
            Change password
          </button>
        )}
      </div>
      <div className="listOfPosts">
        {listOfPosts.map((value, key) => {
          return (
            <div
                key={key}
                className="post" 
            >
              <div className="title"> {value.title} </div>
              <div 
                className="body" 
                onClick={() => {
                  navigate(`/post/${value.id}`);
                }}
                >
                {value.postText}
              </div>
              <div className="footer">
                <div className="username"> {value.username} </div>
                <div className="buttons">
                  <label> {value.likes.length} </label>
                </div>
              </div>
            </div>
          );
      })}
      </div>
    </div>
  )
}

export default Profile;