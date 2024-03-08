import React, {useState} from "react";

import {
    Dialog,
    DialogTitle,
    DialogActions,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio, Box,
} from "@mui/material";
import {menuName, iconCheck, iconClear} from "./style/index.js";
import Data from '../../../public/Data.json';
import ClearIcon from "@mui/icons-material/Clear.js";
import CheckIcon from "@mui/icons-material/Check.js";

function ModalLanguages({ setOpenAccount, language, setLanguage}) {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(language);
    const dataText = Data[language].modLanguages;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenAccount(null);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const editCurrentLanguages = () => {
        setLanguage(value);
        localStorage.setItem('lang', value)
        setOpen(false);
        setOpenAccount(null);
    }


    return (
        <div>
            <Box sx={menuName} onClick={handleOpen}>{dataText.name}</Box>

            <Dialog open={open} onClose={handleClose} sx={{minWidth: '310px', margin: 'auto'}}>
                <DialogTitle>{dataText.name}</DialogTitle>

                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                        sx={{padding: '20px'}}
                    >
                        <FormControlLabel value="eng" control={<Radio />} label={dataText.eng} />
                        <FormControlLabel value="ua" control={<Radio />} label={dataText.ua} />
                    </RadioGroup>
                </FormControl>

                <DialogActions sx={{display: 'flex', justifyContent: 'space-around'}}>
                    <ClearIcon fontSize='large' onClick={handleClose} sx={iconClear}/>
                    <CheckIcon fontSize='large' onClick={editCurrentLanguages} sx={iconCheck}/>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalLanguages;