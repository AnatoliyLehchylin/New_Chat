import React, {useState} from "react";
import {useDispatch} from "react-redux";

import {addUser} from "../../redux/slice/userSlice.js";
import {createUser} from "../../services/api.js";
import {convertImageToBase64} from "../../services/formatImages.js";
import noPhoto from '../../../public/noPhoto.jpg';

import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    InputAdornment, Input, Box
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import {buttonEyeStyle, icon, image, iconClear, iconCheck} from './style/index.js';
import Data from '../../../public/Data.json';


function ModalSignUp({language}) {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [photoFileUser, setPhotoFileUser] = useState(null);
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [name, setName] = useState("");
    const [isValidUser, setIsValidUser] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const dataText = Data[language].modSignUp;
    const role = "user";

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName('');
        setPassword('');
        setPhotoFileUser(null);
        setIsValidUser(true);
        setErrorMessage("");
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const signUpValidation = async () => {
        try {
            if(!isValidUser) {
                setOpen(false);
                setName('');
                setPassword('');
                setPhotoFileUser(null);
                setIsValidUser(true);
                setErrorMessage("");
                return
            }

            if (name === "" || password === "") {
                setIsValidUser(false);
                setErrorMessage(`${dataText.error}`);
                return
            }
            setIsValidUser(false);
            setErrorMessage(`Create ${name}...` )

            const data = await createUser(name, password, role, photoFileUser);

            setIsValidUser(true);
            setErrorMessage("");

            const newUser = await data.json();

            if (!data.ok) {
                setIsValidUser(false);
                setErrorMessage(`${dataText.errorUser}`)
            } else {
                setOpen(false);
                setName("");
                setPassword("");
                setPhotoFileUser(null);
                setIsValidUser(true);
                setErrorMessage("");
                dispatch(addUser(newUser.data));
                localStorage.setItem('userId', newUser.data._id);
            }

        } catch (err) {
            throw err;
        }
    };

    const passwordVisible = () => {
        setIsVisiblePassword(!isVisiblePassword);
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (file) {

            const allowedFormats = ["jpg", "jpeg", "png"];
            const fileExtension = file.name.split(".").pop().toLowerCase();

            if (!allowedFormats.includes(fileExtension)) {
                event.target.value = null;
                setPhotoFileUser(null);
                setIsValidUser(false);
                setErrorMessage(`${dataText.errorFormat}`);
                return;
            }

            const maxSize = 2 * 1024 * 1024; // 2MB
            if (file.size > maxSize) {
                event.target.value = null;
                setPhotoFileUser(null);
                setIsValidUser(false);
                setErrorMessage(`${dataText.errorAvatar}`);
                return;
            }
            setIsValidUser(true);
            setErrorMessage("");
            const convertFile = await convertImageToBase64(file);
            setPhotoFileUser(convertFile);
        }
    }

    return (
        <div>
            <PermIdentityIcon fontSize={"medium"} sx={icon}
                              onClick={handleOpen}/>

            <Dialog open={open} onClose={handleClose} sx={{maxWidth: '360px', margin: 'auto'}}>
                <DialogTitle>{dataText.name}</DialogTitle>
                <DialogContent sx={{display: 'flex', flexDirection: 'column'}}>
                    <p>{dataText.title}</p>
                    <TextField
                        sx={{marginBottom: "10px"}}
                        type='text'
                        label={dataText.nameUser}
                        variant="outlined"
                        value={name}
                        onChange={handleNameChange}
                        autoFocus
                    ></TextField>

                    <TextField
                        type={isVisiblePassword ? 'text' : 'password'}
                        label={dataText.password}
                        variant="outlined"
                        value={password}
                        onChange={handlePasswordChange}
                        // autoFocus
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button onClick={passwordVisible} sx={buttonEyeStyle}>
                                        {isVisiblePassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    ></TextField>

                    <Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '8px'}}>
                        <img src={photoFileUser ? `data:image/jpeg;base64,${photoFileUser}`: noPhoto} style={image} alt='Avatar'/>
                        <Input
                            accept=".jpg, .jpeg, .png"
                            id="file-upload"
                            type="file"
                            sx={{display: 'none'}}
                            onChange={handleFileChange}
                        />
                        <label htmlFor="file-upload">
                            <Button component="span" variant="outlined" size='small' sx={{fontSize: '10px'}}>
                                {dataText.select}
                            </Button>
                        </label>
                    </Box>


                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'space-around'}}>
                    <ClearIcon fontSize='large' onClick={handleClose} sx={iconClear}/>
                    <CheckIcon fontSize='large' onClick={signUpValidation} sx={iconCheck}/>
                </DialogActions>
                {!isValidUser && <Typography color="red" textAlign='center' sx={{padding: '0 5px'}}>{errorMessage}</Typography>}
            </Dialog>
        </div>
    );
}

export default ModalSignUp;


