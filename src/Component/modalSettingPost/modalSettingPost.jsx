import React, {useState} from "react";

import ModalDeletePost from "../modalDeletePost/modalDeletePost.jsx";
import ModalEditPost from "../modalEditPost/modalEditPost.jsx";

import SettingsIcon from '@mui/icons-material/Settings';
import {
    Box,
    Dialog,
    DialogTitle,
    DialogActions,
} from "@mui/material";
import {container, icon} from "./style/index.js";
import Data from "../../../public/Data.json";

function ModalSettingPost({id, text, photoFile, setLoading, language}) {

    const [open, setOpen] = useState(false);
    const dataText = Data[language].modEditPost;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={container}>
            <SettingsIcon sx={icon} onClick={handleOpen}/>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{padding: '8px 16px'}}>{dataText.name}</DialogTitle>

                <DialogActions sx={{display: 'flex', justifyContent: 'space-around'}}>
                    <ModalEditPost setOpenSetting={setOpen} postId={id} text={text} photoFile={photoFile} setLoading={setLoading} language={language}/>
                    <ModalDeletePost setOpenSetting={setOpen} postId={id} setLoading={setLoading} language={language}/>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ModalSettingPost;
