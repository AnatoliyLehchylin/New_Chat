import './App.css';
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";

import ModalSignUp from "./Component/modalSignUp/modalSignUp.jsx";
import ModalSignIn from "./Component/modalSignIn/modalSignIn.jsx";
import ModalSettingPost from "./Component/modalSettingPost/modalSettingPost.jsx";
import ModalPhotoPost from "./Component/modalPhotoPost/modalPhotoPost.jsx";
import ModalLargePhoto from "./Component/modalLargePhoto/modalLargePhoto.jsx";
import AccountMenu from "./Component/accountMenu/accountMenu.jsx";

import fetchDataUser from "./requests/userRequest.js";
import fetchDataPosts from "./requests/postsRequest.js";
import noUserPhoto from '../public/noUserPhoto.jpg';
import arrow from '../public/arrow.png';

import {
    Badge,
    Box,
    Button,
    Container,
    TextField,
    Typography
} from "@mui/material";

import {addPost} from "./services/api.js";
import FormatPostDates from "./services/formatPostDates.js";
import {
    mainContainer,
    mainAvatar,
    postAvatar,
    layout,
    layoutName,
    buttonWrap,
    containerChat,
    textField,
    boxWrappChat,
    wrappPost,
    userPost,
    textPost,
    timePost,
    loadingData,
    avatarNameWrapp,
    startPageLeft,
    startPageLeftImg,
    startPageRight,
    startPageRightImg,
    badge,
    editPost,
    footerContainer,
    startPage
} from "./style/index.js";
import Data from "../public/Data.json";


function App() {
    const [posts, setPosts] = useState([]);
    const [addedPost, setAddedPost] = useState('');
    const [photoFile, setPhotoFile] = useState(null);
    const [isValidNewPost, setIsValidNewPost] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState(localStorage.getItem('lang') || 'eng');

    const dataText = Data[language];

    const socket = io(import.meta.env.VITE_REACT_APP_API_URL);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const userId = localStorage.getItem(`userId${globalThis.chat}`);
    const lastTimePost = localStorage.getItem(`lastTimePost${user.id}` || null);

    let newMessages;
    const lastIndex = posts?.findIndex(post => post.created_at === lastTimePost);

    if(lastIndex > 0) {
        newMessages = posts.length - lastIndex - 1;
    }

    if(lastIndex < 0 && lastTimePost === null) {
        newMessages = posts.length;
    }

    const chatBoxRef = useRef(null);

    const changeNewPost = (event) => {
        setAddedPost(event.target.value);
    };

    const addNewPost = async () => {
        try {
            if (addedPost === "" && photoFile === null) {
                setIsValidNewPost(false);
                setErrorMessage(`${dataText.other.emptyMessage}`);

                setTimeout(() => {
                    setIsValidNewPost(true);
                    setErrorMessage("");
                }, 2000);

                return
            } else {
                setIsValidNewPost(true);
                setErrorMessage("");
            }
            setLoading(true);
            const data = await addPost({text: addedPost, userName: user.name, userID: user.id, photoFileUserPost: user.photoFileUserPost, photoFile: photoFile});

        } catch (err) {
            throw err;
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addNewPost();
        }
        return true;
    };

    const addPostUpdated = (newPost) => {
        if (!newPost) {
            setIsValidNewPost(false);
            setErrorMessage("Invalid added Post!");
        } else {
            setPosts((prevPosts) => {
                const postArray = [];
                postArray.push(newPost);
                const postWithFormattedDate = FormatPostDates(postArray);
                localStorage.setItem(`lastTimePost${user.id}`, postWithFormattedDate[postWithFormattedDate.length - 1].created_at);
                return [...prevPosts, postWithFormattedDate[0]];
            });
            setAddedPost('');
            setPhotoFile(null)
        }
        setLoading(false);
    };

    const deletePostUpdated = (deletePost) => {
        if (!deletePost) {
            setIsValidNewPost(false);
            setErrorMessage("Invalid delete Post!");
        } else {
            setPosts((prevPosts) => prevPosts.filter(post => post._id !== deletePost._id));
        }
        setLoading(false);
    };

    const editPostUpdated = (editPost) => {
        if (!editPost) {
            setIsValidNewPost(false);
            setErrorMessage("Invalid edit Post!");
            setLoading(false);
        } else {
            setLoading(false);
            setPosts((prevPosts) => {
                const updatedPosts = prevPosts.map(post => {
                    if (post._id === editPost._id) {
                        const postWithFormattedDate = FormatPostDates([editPost]);
                        return postWithFormattedDate[0];
                    }
                    return post;
                });

                return updatedPosts;
            });
        }
    };

    useEffect(() => {
        setPosts([]);
        if (user.name) {
            fetchDataPosts(setPosts, setLoading);
        }
    }, [user]);

    useEffect(() => {
        fetchDataUser(userId, dispatch, setLoading);
    }, []);

    useEffect(() => {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        if(posts.length > 0) {
            localStorage.setItem(`lastTimePost${user.id}`, posts[posts.length - 1].created_at);
        }
    }, [posts]);

    useEffect(() => {
        if (user.name) {
            socket.on(`dataUpdated${globalThis.posts}`, addPostUpdated);
            socket.on(`dataDelete${globalThis.posts}`, deletePostUpdated);
            socket.on(`dataEdit${globalThis.posts}`, editPostUpdated);

            return () => {
                socket.off(`dataUpdated${globalThis.posts}`, addPostUpdated);
                socket.off(`dataDelete${globalThis.posts}`, deletePostUpdated);
                socket.on(`dataEdit${globalThis.posts}`, editPostUpdated);
                socket.disconnect();
            };
        }
    }, [user]);


    return (
        <Container sx={mainContainer}>
            <Box sx={layout}>
                {user.name ?
                    <Box sx={buttonWrap}>
                        <Box sx={avatarNameWrapp}>
                            <img src={user.photoFileUser || noUserPhoto} style={mainAvatar} alt='Avatar'/>
                            <Badge badgeContent={newMessages} color="error" sx={badge}>
                                <Box sx={layoutName}>{user.name}</Box>
                            </Badge>
                        </Box>
                        <AccountMenu user={user} language={language} setLanguage={setLanguage}/>
                    </Box> :
                    <Box sx={buttonWrap}>
                        <ModalSignUp language={language}/>
                        <ModalSignIn language={language}/>
                    </Box>}
            </Box>

            <Container sx={containerChat}>

                {!user.name &&
                    <Box sx={startPage}>
                        <Box>
                            <img src={arrow} style={{...startPageLeft, ...startPageLeftImg}} alt='Sign Up'/>
                            <Typography sx={{...startPageLeft, color: '#3b58bd'}}>{dataText.modSignUp.startIcon}</Typography>
                        </Box>
                        <Box>
                            <img src={arrow} style={{...startPageRight, ...startPageRightImg}} alt='Sign In'/>
                            <Typography sx={{...startPageRight, color: '#17cb11'}}>{dataText.modSignIn.startIcon}</Typography>
                        </Box>
                    </Box>
                }

                <Box sx={boxWrappChat} ref={chatBoxRef}>
                    <Typography sx={{color: '#bebccb'}}>{posts[0]?.formattedDate}</Typography>
                    {user?.name && posts.length < 1 && <Typography sx={{color: '#FFFFFF'}}>{dataText.other.noPosts}</Typography>}

                    {posts.map((post, index) => (
                        <Box key={post._id}>
                            {(index > 0 && post.compareDate > posts[index - 1].compareDate) &&
                                <Typography sx={{color: '#bebccb'}}>{post.formattedDate}</Typography>}
                            {(lastTimePost && (index > 0) && (post.created_at > lastTimePost) && (lastTimePost >= posts[index - 1].created_at)) &&
                            <Typography color='error' sx={{fontSize: '12px'}}>{dataText.other.newMessages}</Typography>
                            }
                            <Box sx={{...wrappPost, backgroundColor: post.userID === user.id ? "#0b4d8f" : '#303034'}}>
                                <Box sx={{display: 'flex', justifyContent: post.userID === user.id ? 'flex-end' : 'space-between', alignItems: 'flex-start'}}>
                                    {post.userID !== user.id &&
                                        <Box sx={{display: 'flex'}}>
                                            <img src={post.photoFileUserPost || noUserPhoto} style={postAvatar} alt='Avatar'/>
                                            <Typography sx={userPost}>{post.userName}</Typography>
                                        </Box>}
                                    <Typography sx={timePost}>{post.formattedTime}</Typography>
                                </Box>
                                <Typography sx={{
                                    ...textPost,
                                    textAlign: post.userID === user.id ? "right" : 'left'
                                }}>{post.text}</Typography>

                                {post.photoFile && <ModalLargePhoto photo={post.photoFile}/>}

                                {(post.userID === user.id || user.role === 'admin' || user.role === 'superadmin') &&
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: post.isEditPost ? 'space-between' : 'flex-end'
                                    }}>
                                        {post.isEditPost && <Typography sx={editPost}>{dataText.other.edit} {post.formattedEditDate}</Typography>}
                                        <ModalSettingPost id={post._id} text={post.text} photoFile={post.photoFile} setLoading={setLoading} language={language} sx={{marginLeft: post.isEditPost ? '0' : '100px'}}/>
                                    </Box>
                                }
                            </Box>
                        </Box>
                    ))}
                </Box>
                <TextField
                    sx={textField}
                    type='text'
                    multiline
                    rows={2}
                    InputProps={{style: {color: '#faf6f1'}}}
                    variant="outlined"
                    value={addedPost}
                    onChange={changeNewPost}
                    autoFocus
                    disabled={!user.name}
                    onKeyDown={handleKeyPress}
                ></TextField>

                    <Box sx={footerContainer}>
                        {!isValidNewPost && <Typography color="red" textAlign='center'
                                                        sx={{marginRight: '5px'}}>{errorMessage}</Typography>}
                        {loading && <Typography sx={loadingData}>Loading...</Typography>}
                        {user.name &&
                            <ModalPhotoPost addNewPost={addNewPost} photoFile={photoFile} setPhotoFile={setPhotoFile} addedPost={addedPost} setAddedPost={setAddedPost} language={language}/>
                        }
                            <Button disabled={!user.name} sx={{ width: '64px', margin: '0 20px 0 10px', '&:focus': {
                                    outline: 'none'}, }} color="primary" type="submit" onClick={addNewPost}>
                                SEND
                            </Button>
                    </Box>

            </Container>
        </Container>
    )
}

export default App
