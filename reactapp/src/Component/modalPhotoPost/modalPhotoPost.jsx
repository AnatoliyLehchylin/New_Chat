import React, { useState} from "react";

import {convertImageToBase64} from "../../services/formatImages.js";

import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import noPhoto from '../../../public/noPhoto.jpg';

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    Input
} from "@mui/material";
import {icon, img, iconClear, iconCheck} from "./style/index.js";
import Data from '../../../public/Data.json';
import ClearIcon from "@mui/icons-material/Clear.js";
import CheckIcon from "@mui/icons-material/Check.js";


function ModalPhotoPost({addNewPost, photoFile, setPhotoFile, addedPost, setAddedPost, language}) {

    const [open, setOpen] = useState(false);
    const [isValidUser, setIsValidUser] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const dataText = Data[language].modPhotoPost;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setAddedPost("");
        setPhotoFile(null);
        setIsValidUser(true);
        setErrorMessage("");
    };

    const handleTextChange = (event) => {
        setAddedPost(event.target.value);
    };

    const photoPostValidation = async () => {
        try {
            if(!isValidUser) {
                setOpen(false);
                setAddedPost("");
                setPhotoFile(null);
                setIsValidUser(true);
                setErrorMessage("");
                return
            }

            if (addedPost === "" && photoFile === null) {
                setIsValidUser(false);
                setErrorMessage(`${dataText.error}`);
                return
            }
            setIsValidUser(true);
            setErrorMessage('');
            addNewPost();
            setOpen(false);

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
                setPhotoFile(null);
                setIsValidUser(false);
                setErrorMessage(`${dataText.errorFormat}`);
                return;
            }

            // const maxSize = 6 * 1024 * 1024; // 5MB
            // if (file.size > maxSize) {
            //     event.target.value = null;
            //     setPhotoFile(null);
            //     setIsValidUser(false);
            //     setErrorMessage(`${dataText.errorPhoto}`);
            //     return;
            // }
            setIsValidUser(true);
            setErrorMessage("");
            const convertFile = await convertImageToBase64(file);
            setPhotoFile(convertFile);
        }
    }

    return (
        <div>
            <PhotoSizeSelectActualOutlinedIcon fontSize={"medium"}
                                               sx={icon}
                                               onClick={handleOpen}/>

            <Dialog open={open} onClose={handleClose} sx={{margin: 'auto'}}>
                <DialogTitle>{dataText.name}</DialogTitle>
                <DialogContent sx={{display: 'flex', flexDirection: 'column'}}>
                    <p>{dataText.title}</p>
                    <TextField
                        sx={{marginBottom: "10px"}}
                        type='text'
                        multiline
                        rows={2}
                        label={dataText.text}
                        variant="outlined"
                        value={addedPost}
                        onChange={handleTextChange}
                        autoFocus
                    ></TextField>

                        <img src={photoFile ? `data:image/jpeg;base64,${photoFile}` : noPhoto} style={img} alt='Photo'/>
                        <Input
                            accept=".jpg, .jpeg, .png"
                            id="file-upload"
                            type="file"
                            sx={{display: 'none'}}
                            onChange={handleFileChange}
                        />
                        <label htmlFor="file-upload">
                            <Button component="span" variant="outlined" size='small' sx={{marginLeft: '15px', fontSize: '10px'}}>
                                {dataText.select}
                            </Button>
                        </label>

                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'space-around'}}>
                    <ClearIcon fontSize='large' onClick={handleClose} sx={iconClear}/>
                    <CheckIcon fontSize='large' onClick={photoPostValidation} sx={iconCheck}/>
                </DialogActions>
                {!isValidUser && <Typography color="red" textAlign='center' sx={{padding: '0 5px'}}>{errorMessage}</Typography>}
            </Dialog>
        </div>
    );
}

export default ModalPhotoPost;


