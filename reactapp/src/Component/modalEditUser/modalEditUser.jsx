import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {editUser, editAvatarPost, editPassword} from "../../services/api.js";
import {addUser} from "../../redux/slice/userSlice.js";
import {convertImageToBase64} from "../../services/formatImages.js";

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff.js";

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Input,
    Box,
    Typography,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    InputAdornment, DialogContentText,
} from "@mui/material";
import noPhoto from "../../../public/noPhoto.jpg";

import {buttonEyeStyle, icon, img, boxNewPassword, boxPassword, boxAvatar, buttonDelAvatar, iconClear, iconCheck} from "./style/index.js";
import Data from '../../../public/Data.json';
import ClearIcon from "@mui/icons-material/Clear.js";
import CheckIcon from "@mui/icons-material/Check.js";


function ModalEditUser({setOpenSetting, setOpenAccount, user, language}) {

    const [editPhotoFileUser, setEditPhotoFileUser] = useState(user.photoFileUser);
    const [isValidUser, setIsValidUser] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [openEditPasswordOk, setOpenEditPasswordOk] = useState(false);
    const [value, setValue] = useState('avatar');

    const [currentPassword, setCurrentPassword] = useState("");
    const [isVisibleCurrentPassword, setIsVisibleCurrentPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [isVisibleNewPassword, setIsVisibleNewPassword] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState("");
    const [isVisibleRepeatPassword, setIsVisibleRepeatPassword] = useState(false);

    const dataText = Data[language].modEditUser;

    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenSetting(false);
        setOpenAccount(null);
        setIsValidUser(true);
        setErrorMessage("");
    };

    const handleCloseEditPasswordOk = () => {
        setOpenEditPasswordOk(false);
        setOpenSetting(false);
        setOpenAccount(null);
        setIsValidUser(true);
        setErrorMessage("");
    };

    const handleChange = (event) => {
        setValue(event.target.value);
        setCurrentPassword('');
        setNewPassword('');
        setRepeatPassword('');
        setIsValidUser(true);
        setErrorMessage("");
    };

    const currentPasswordVisible = () => {
        setIsVisibleCurrentPassword(!isVisibleCurrentPassword);
    };

    const handleCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);
    };

    const newPasswordVisible = () => {
        setIsVisibleNewPassword(!isVisibleNewPassword);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const repeatPasswordVisible = () => {
        setIsVisibleRepeatPassword(!isVisibleRepeatPassword);
    };

    const handleRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
    };

    const editCurrentUser = async () => {
        try {
            if(!isValidUser && value === 'avatar') {
                setOpen(false);
                setOpenSetting(false);
                setOpenAccount(null);
                setIsValidUser(true);
                setErrorMessage("");
                return
            }

            setIsValidUser(false);
            setErrorMessage(`Edit ${user.name}...` );

            if(value === 'avatar') {

                const data = await editUser({id: user.id, photoFileUser: editPhotoFileUser ? editPhotoFileUser.split(',')[1] : null});

                const editingUser = await data.json();

                await dispatch(addUser(editingUser.data));
            } else {
                if(currentPassword === '' || newPassword === '' || repeatPassword === '') {
                    setIsValidUser(false);
                    setErrorMessage(`${dataText.errorOne}`);
                    return
                }
                if(newPassword !== repeatPassword) {
                    setIsValidUser(false);
                    setErrorMessage(`${dataText.errorTwo}`);
                    return
                }
                const data = await editPassword(user.id, currentPassword, newPassword);
                if(data.ok) {
                    setOpenEditPasswordOk(true);
                    return;
                } else {
                    setIsValidUser(false);
                    setErrorMessage(`${dataText.errorThird}`);
                    return;
                }
            }
            setOpen(false);
            setOpenSetting(false);
            setOpenAccount(null);
            setIsValidUser(true);
            setErrorMessage("");
        } catch (err) {
            throw err;
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (file) {

            const allowedFormats = ["jpg", "jpeg", "png"];
            const fileExtension = file.name.split(".").pop().toLowerCase();

            if (!allowedFormats.includes(fileExtension)) {
                event.target.value = null;
                setEditPhotoFileUser(null);
                setIsValidUser(false);
                setErrorMessage(`${dataText.errorFormat}`);
                return;
            }

            // const maxSize = 2 * 1024 * 1024; // 2MB
            // if (file.size > maxSize) {
            //     event.target.value = null;
            //     setEditPhotoFileUser(null);
            //     setIsValidUser(false);
            //     setErrorMessage(`${dataText.errorAvatar}`);
            //     return;
            // }
            setIsValidUser(true);
            setErrorMessage("");
            const convertFile = await convertImageToBase64(file);
            setEditPhotoFileUser(`data:image/jpeg;base64,${convertFile}`);
        }
    }

    useEffect(() => {
        const dataAvatarPost = editAvatarPost({ id: user.id, photoFileUserPost: user.photoFileUserPost });
    }, [user]);

    return (
        <div>
            <ModeEditIcon fontSize={"medium"} sx={icon} onClick={handleOpen}/>

            <Dialog open={open} onClose={handleClose} sx={{minWidth: '310px', margin: 'auto'}}>
                <DialogTitle sx={{padding: '10px 0 10px 20px'}}>{dataText.name}</DialogTitle>

                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                        sx={{padding: '0 20px 10px'}}
                    >
                        <FormControlLabel value="avatar" control={<Radio />} label={dataText.avatar} />
                        <FormControlLabel value="password" control={<Radio />} label={dataText.password} />
                    </RadioGroup>
                </FormControl>
                {value === 'avatar' ?
                    <Box>
                        <Box sx={boxAvatar}>
                            <img src={editPhotoFileUser || noPhoto} style={img} alt='editPhoto'/>
                            <Input
                                accept=".jpg, .jpeg, .png"
                                id="file-upload"
                                type="file"
                                sx={{display: 'none'}}
                                onChange={handleFileChange}
                            />
                            <label htmlFor="file-upload">
                                <Button component="span" variant="outlined" size='small' sx={{fontSize: '8px'}}>
                                    {dataText.select}
                                </Button>
                            </label>
                        </Box>
                        <Button component="span" variant="outlined" size='small' sx={buttonDelAvatar} onClick={() => setEditPhotoFileUser(null)}>{dataText.delAvatar}</Button>
                    </Box> :

                    <Box sx={boxPassword}>

                        <Box>
                            <Dialog open={openEditPasswordOk} onClose={handleCloseEditPasswordOk}>
                                <DialogContent>
                                    <DialogContentText sx={{color: '#2a48a9'}}>
                                        {dataText.isPas}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseEditPasswordOk} color="primary">
                                        OK
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Box>

                        <TextField
                            type={isVisibleCurrentPassword ? 'text' : 'password'}
                            label={dataText.currentPas}
                            variant="outlined"
                            value={currentPassword}
                            onChange={handleCurrentPasswordChange}
                            autoFocus
                            InputLabelProps={{
                                style: {
                                    fontSize: '12px',
                                },
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button onClick={currentPasswordVisible} sx={buttonEyeStyle}>
                                            {isVisibleCurrentPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                        ></TextField>

                        <Box sx={boxNewPassword}>
                            <TextField
                                sx={{marginBottom: '10px'}}
                                type={isVisibleNewPassword ? 'text' : 'password'}
                                label={dataText.newPas}
                                variant="outlined"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                // autoFocus
                                InputLabelProps={{
                                    style: {
                                        fontSize: '12px',
                                    },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button onClick={newPasswordVisible} sx={buttonEyeStyle}>
                                                {isVisibleNewPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                            </Button>
                                        </InputAdornment>
                                    ),
                                }}
                            ></TextField>
                            <TextField
                                type={isVisibleRepeatPassword ? 'text' : 'password'}
                                label={dataText.repeatPas}
                                variant="outlined"
                                value={repeatPassword}
                                onChange={handleRepeatPasswordChange}
                                // autoFocus
                                InputLabelProps={{
                                    style: {
                                        fontSize: '12px',
                                    },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button onClick={repeatPasswordVisible} sx={buttonEyeStyle}>
                                                {isVisibleRepeatPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                            </Button>
                                        </InputAdornment>
                                    ),
                                }}
                            ></TextField>
                        </Box>
                    </Box>
                }

                <DialogActions sx={{display: 'flex', justifyContent: 'space-around'}}>
                    <ClearIcon fontSize='large' onClick={handleClose} sx={iconClear}/>
                    <CheckIcon fontSize='large' onClick={editCurrentUser} sx={iconCheck}/>
                </DialogActions>
                {!isValidUser && <Typography color="red" textAlign='center' sx={{padding: '0 5px'}}>{errorMessage}</Typography>}
            </Dialog>
        </div>
    );
}

export default ModalEditUser;