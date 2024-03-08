import React, {useState} from "react";
import {useDispatch} from "react-redux";

import {addUser} from "../../redux/slice/userSlice.js";
import { loginUser } from "../../services/api.js";

import LoginIcon from '@mui/icons-material/Login';

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    InputAdornment
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import {buttonEyeStyle, icon, iconCheck, iconClear} from './style';
import Data from '../../../public/Data.json';
import ClearIcon from "@mui/icons-material/Clear.js";
import CheckIcon from "@mui/icons-material/Check.js";


function ModalSignIn({language}) {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [name, setName] = useState("");
    const [isValidUser, setIsValidUser] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const dataText = Data[language].modSignUp;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName('');
        setPassword('');
        setIsValidUser(true);
        setErrorMessage("");
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };


    const signInValidation = async () => {
        try {
            if (name === "" || password === "") {
                setIsValidUser(false);
                setErrorMessage(`${dataText.error}`);
                return
            }

            setIsValidUser(false);
            setErrorMessage(`Loading ${name}...` )

            const data = await loginUser(name, password);

            setIsValidUser(true);
            setErrorMessage("");

            const currentUser = await data.json();

            if (!data.ok) {
                setIsValidUser(false);
                setErrorMessage(`${dataText.errorUser}`)
            } else {
                setOpen(false);
                setName("");
                setPassword("");
                setIsValidUser(true);
                setErrorMessage("");
                dispatch(addUser(currentUser.data));
                localStorage.setItem('userId', currentUser.data._id);
            }

        } catch (err) {
            throw err;
        }
    };

    const passwordVisible = () => {
        setIsVisiblePassword(!isVisiblePassword);
    };

    return (
        <div>
            <LoginIcon fontSize={"medium"} sx={icon} onClick={handleOpen}/>

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

                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'space-around'}}>
                    <ClearIcon fontSize='large' onClick={handleClose} sx={iconClear}/>
                    <CheckIcon fontSize='large' onClick={signInValidation} sx={iconCheck}/>
                </DialogActions>
                {!isValidUser && <Typography color="red" textAlign='center'>{errorMessage}</Typography>}
            </Dialog>
        </div>
    );
}

export default ModalSignIn;


