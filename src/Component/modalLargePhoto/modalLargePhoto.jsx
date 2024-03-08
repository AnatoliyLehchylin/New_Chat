import React, {useState} from "react";

import {
    Dialog,
    DialogContent,
} from "@mui/material";

function ModalLargePhoto({photo}) {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSaveImage = (event, image) => {

        event.preventDefault();

        const downloadLink = document.createElement("a");

        downloadLink.href = image;
        downloadLink.download = "image.jpg";

        document.body.appendChild(downloadLink);
        downloadLink.click();

        document.body.removeChild(downloadLink);
    };

    return (
        <div >

            <img src={photo} style={{maxWidth: '250px', maxHeight: '200px'}} onClick={handleOpen} onContextMenu={(event) => handleSaveImage( event, photo)}/>

            <Dialog open={open} onClose={handleClose}>
                <DialogContent sx={{display: 'flex', padding:'0px'}}>
                    <img src={photo} style={{minWidth: '250px', maxWidth: '500px'}} />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ModalLargePhoto;