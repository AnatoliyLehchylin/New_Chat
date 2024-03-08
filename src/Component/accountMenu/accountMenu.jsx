import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModalSettingUser from "../modalSettingUser/modalSettingUser.jsx";
import ModalExit from "../modalExit/modalExit.jsx";
import ModalLanguages from "../modalLanguage/modalLanguages.jsx";
import {useState} from "react";

export default function AccountMenu({user, language, setLanguage}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{color: 'black'}}
            >
                <MoreVertIcon/>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem>
                    <ModalSettingUser user={user} setOpenAccount={setAnchorEl} language={language}/>
                </MenuItem>
                <MenuItem>
                    <ModalLanguages setOpenAccount={setAnchorEl} language={language} setLanguage={setLanguage}/>
                </MenuItem>
                <MenuItem>
                    <ModalExit setOpenAccount={setAnchorEl} language={language} setLanguage={setLanguage}/>
                </MenuItem>
            </Menu>
        </div>
    );
}