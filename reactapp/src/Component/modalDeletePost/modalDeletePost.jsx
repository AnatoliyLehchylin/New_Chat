import React, {useState} from "react";
import {deletePost} from "../../services/api.js";

import DeleteIcon from '@mui/icons-material/Delete';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import {icon, iconClear, iconCheck} from "./style/index.js";
import Data from '../../../public/Data.json';
import ClearIcon from "@mui/icons-material/Clear.js";
import CheckIcon from "@mui/icons-material/Check.js";

function ModalDeletePost({setOpenSetting, postId, setLoading, language}) {

    const [open, setOpen] = useState(false);
    const dataText = Data[language].modDeletePost;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenSetting(false);
    };

    const deleteCurrentPost = async () => {
        try {
            setLoading(true);
            setOpen(false);
            setOpenSetting(false);
            const data = await deletePost(postId);
        } catch (err) {
            throw err;
        }
    };

    return (
        <div>
            <DeleteIcon fontSize={"medium"} sx={icon} onClick={handleOpen}/>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{dataText.name}</DialogTitle>
                <DialogContent sx={{display: 'flex', flexDirection: 'column'}}>
                    <p>{dataText.title}</p>
                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'space-around'}}>
                    <ClearIcon fontSize='large' onClick={handleClose} sx={iconClear}/>
                    <CheckIcon fontSize='large' onClick={deleteCurrentPost} sx={iconCheck}/>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalDeletePost;
