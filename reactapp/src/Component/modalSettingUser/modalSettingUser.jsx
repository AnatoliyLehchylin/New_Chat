import React, {useState} from "react";

import ModalDeleteUser from "../modalDeleteUser/modalDeleteUser.jsx";
import ModalEditUser from "../modalEditUser/modalEditUser.jsx";

import {menuName, layoutNameSetting, container} from "./style/index.js";
import {
    Box,
    Dialog,
    DialogTitle,
    DialogActions, Typography,
} from "@mui/material";
import Data from '../../../public/Data.json';

function ModalSettingUser({user, setOpenAccount, language}) {

    const [open, setOpen] = useState(false);
    const dataText = Data[language].myAccount;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenAccount(null);
    };

    return (
        <Box sx={container}>
            <Box sx={menuName} onClick={handleOpen}>{dataText.name}</Box>

            <Dialog open={open} onClose={handleClose} sx={{maxWidth: '320px', margin: 'auto'}}>
                <DialogTitle sx={{padding: '8px 16px', fontSize: '16px'}}>{dataText.secondName}<Typography sx={layoutNameSetting}>{user.name}</Typography></DialogTitle>

                <DialogActions sx={{display: 'flex', justifyContent: 'space-around'}}>
                    <ModalEditUser setOpenSetting={setOpen} setOpenAccount={setOpenAccount} user={user} language={language}/>
                    <ModalDeleteUser setOpenSetting={setOpen} setOpenAccount={setOpenAccount} user={user} language={language}/>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ModalSettingUser;