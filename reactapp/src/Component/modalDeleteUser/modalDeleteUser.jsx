import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {deleteUser, deleteAllPost} from "../../services/api.js";

import DeleteIcon from '@mui/icons-material/Delete';

import {reset} from "../../redux/slice/userSlice.js";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, Typography, Checkbox, FormControlLabel
} from "@mui/material";
import {icon, iconClear, iconCheck} from "./style/index.js";
import Data from '../../../public/Data.json';
import ClearIcon from "@mui/icons-material/Clear.js";
import CheckIcon from "@mui/icons-material/Check.js";


function ModalDeleteUser({setOpenSetting, setOpenAccount, user, language}) {

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const dataText = Data[language].modDeleteUser;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setChecked(false);
        setOpen(false);
        setOpenAccount(null);
        setOpenSetting(false);
    };

    const handleChange = () => {
        setChecked(!checked);
    };

    const deleteCurrentUser = async () => {
        try {
            const data = await deleteUser(user.id);

            if(checked) {
                const data = await deleteAllPost(user.id);
            }

            localStorage.removeItem(`userId${globalThis.chat}`);
            localStorage.removeItem(`lastTimePost${user.id}`);
            dispatch(reset());
            setOpen(false);
            setOpenAccount(null);
            setOpenSetting(false);
        } catch (err) {
            throw err;
        }
    };

    return (
        <div>
            <DeleteIcon fontSize={"medium"} sx={icon}
                        onClick={handleOpen}/>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{dataText.name}</DialogTitle>
                <DialogContent sx={{display: 'flex', flexDirection: 'column'}}>
                    <p>{dataText.title}</p>
                    <Typography sx={{fontSize: '24px', color: 'red'}}>{user.name}</Typography>
                    <FormControlLabel control={<Checkbox checked={checked}
                                                         onChange={handleChange}/>} label={dataText.delPosts}/>
                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'space-around'}}>
                    <ClearIcon fontSize='large' onClick={handleClose} sx={iconClear}/>
                    <CheckIcon fontSize='large' onClick={deleteCurrentUser} sx={iconCheck}/>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalDeleteUser;