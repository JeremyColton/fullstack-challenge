import React, {useState, useEffect} from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Box from '@mui/material/Box'
import DialogContentText from '@mui/material/DialogContentText'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import Image from "next/image"

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />
});

type PhotoProps = {
    url: string | null;
    title: string;
    closeHandler: () => void;
}

const Photo = ({url, title, closeHandler}: PhotoProps) => {
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false);
        closeHandler();
    };

    useEffect(() => {
        if (url) {
            setOpen(true)
        }
    }, [url])

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={handleClose}
            aria-labelledby="alert-dialog-photo"
            maxWidth="lg"
            PaperProps={{
                style: {
                    boxSizing: 'border-box',
                },
            }}
        >
            <DialogContent id="alert-dialog-photo">
                {url && <Image src={url} width={600} height={600} alt={title}/>}
            </DialogContent>
        </Dialog>
    )
}

export default Photo