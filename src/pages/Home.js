import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { AuthContext } from '../helpers/AuthContext';

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const { authState } = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login");
        } else {
            axios
                .get("http://localhost:5000/posts", { 
                    headers: { accessToken: localStorage.getItem("accessToken") },
                })
                .then((response) => {
                    setListOfPosts(response.data.listOfPosts);
                    setLikedPosts(
                        response.data.likedPosts.map((like) => {
                            return like.postId;
                        })
                    );
                });
        }
    }, []);

    const likePost = (postid) => {
        axios
            .post(
                "http://localhost:5000/likes", 
                { postId: postid }, 
                { headers: { accessToken: localStorage.getItem("accessToken") }}
            ).then((response) => {
                setListOfPosts(
                    listOfPosts.map((post) => {
                        if (post.id === postid) {
                            if (response.data.liked) {
                                return  {...post, likes: [...post.likes, 0] };
                            } else {
                                const likesArray = post.likes;
                                likesArray.pop();
                                return  {...post, likes: likesArray };
                            }
                        } else {
                            return post;
                        }
                    })
                );

                if (likedPosts.includes(postid)) {
                    setLikedPosts(
                        likedPosts.filter((id) => {
                            return id != postid;
                        })
                    );
                } else {
                    setLikedPosts([...likedPosts, postid]);
                }
            });
    };

    return (
        <div>
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
                            <div className="username">
                                <Link to={`/profile/${value.userId}`}>{value.username}</Link> 
                            </div>
                            <div className="buttons">
                                <ThumbUpIcon 
                                    onClick={() => {
                                        likePost(value.id);
                                    }}
                                    className={
                                        likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                                    }
                                />
                                <label> {value.likes.length} </label>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Home;
