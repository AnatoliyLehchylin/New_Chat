import React, {useState} from "react";

import {editPost} from "../../services/api.js";
import {convertImageToBase64} from "../../services/formatImages.js";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import noPhoto from "../../../public/noPhoto.jpg";

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, TextField, Input, Typography,
} from "@mui/material";
import {icon, img, iconCheck, iconClear} from "./style/index.js";
import Data from '../../../public/Data.json';
import ClearIcon from "@mui/icons-material/Clear.js";
import CheckIcon from "@mui/icons-material/Check.js";

function ModalEditPost({setOpenSetting, postId, text, photoFile, setLoading, language}) {

    const [editText, setEditText] = useState(text);
    const [editPhotoFile, setEditPhotoFile] = useState(photoFile);
    const [isValidUser, setIsValidUser] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const [open, setOpen] = useState(false);
    const dataText = Data[language].modEditPost;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenSetting(false);
    };

    const changeEditPost = (event) => {
        setEditText(event.target.value);
    };

    const editCurrentPost = async () => {
        try {
            if(!isValidUser) {
                setOpen(false);
                setOpenSetting(false);
                setIsValidUser(true);
                setErrorMessage("");
                return
            }

            setLoading(true);
            setOpen(false);
            setOpenSetting(false);
            const data = await editPost({id: postId, text: editText, photoFile: editPhotoFile ? editPhotoFile.split(',')[1] : null});

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
                setEditPhotoFile(null);
                setIsValidUser(false);
                setErrorMessage(`${dataText.errorFormat}`);
                return;
            }

            // const maxSize = 6 * 1024 * 1024; // 5MB
            // if (file.size > maxSize) {
            //     event.target.value = null;
            //     setEditPhotoFile(null);
            //     setIsValidUser(false);
            //     setErrorMessage(`${dataText.errorPhoto}`);
            //     return;
            // }
            setIsValidUser(true);
            setErrorMessage("");
            const convertFile = await convertImageToBase64(file);
            setEditPhotoFile(`data:image/jpeg;base64,${convertFile}`);
        }
    }

    return (
        <div>
            <ModeEditIcon fontSize={"medium"} sx={icon}
                          onClick={handleOpen}/>

            <Dialog open={open} onClose={handleClose} sx={{maxWidth: '360px', margin: 'auto'}}>
                <DialogTitle>{dataText.nameEdit}</DialogTitle>
                <DialogContent sx={{display: 'flex', flexDirection: 'column'}}>
                    <p>{dataText.title}</p>
                    <TextField
                        sx={{marginBottom: "10px"}}
                        type='text'
                        multiline
                        rows={2}
                        label={dataText.text}
                        variant="outlined"
                        value={editText}
                        onChange={changeEditPost}
                        autoFocus
                    ></TextField>

                    <img src={editPhotoFile || noPhoto} style={img} alt='editPhoto'/>
                    <Input
                        accept=".jpg, .jpeg, .png"
                        id="file-upload"
                        type="file"
                        sx={{display: 'none'}}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload">
                        <Button component="span" variant="outlined" size='small'
                                sx={{margin: '10px 0 0 5px', fontSize: '10px'}}>
                            {dataText.select}
                        </Button>
                    </label>
                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'space-around'}}>
                    <ClearIcon fontSize='large' onClick={handleClose} sx={iconClear}/>
                    <CheckIcon fontSize='large' onClick={editCurrentPost} sx={iconCheck}/>
                </DialogActions>
                {!isValidUser &&
                    <Typography color="red" textAlign='center' sx={{padding: '0 5px'}}>{errorMessage}</Typography>}
            </Dialog>
        </div>
    );
}

export default ModalEditPost;