import React, {useState} from "react";
import {useDispatch} from "react-redux";

import LogoutIcon from '@mui/icons-material/Logout';

import {reset} from "../../redux/slice/userSlice.js";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import {iconClear, iconCheck} from "./style/index.js";
import Data from '../../../public/Data.json';
import ClearIcon from "@mui/icons-material/Clear.js";
import CheckIcon from "@mui/icons-material/Check.js";

function ModalExit({setOpenAccount, language}) {

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const dataText = Data[language].modExit;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenAccount(null);
    };

    const exitUser = () => {
        setOpen(false);
        setOpenAccount(null);
        dispatch(reset());
        localStorage.removeItem(`userId${globalThis.chat}`);
    };

    return (
        <div>
            <LogoutIcon fontSize={"small"} sx={{color: "#000000DE", cursor: 'pointer'}}
                        onClick={handleOpen}/>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{dataText.name}</DialogTitle>
                <DialogContent sx={{display: 'flex', flexDirection: 'column'}}>
                    <p>{dataText.title}</p>
                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'space-around'}}>
                    <ClearIcon fontSize='large' onClick={handleClose} sx={iconClear}/>
                    <CheckIcon fontSize='large' onClick={exitUser} sx={iconCheck}/>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalExit;


