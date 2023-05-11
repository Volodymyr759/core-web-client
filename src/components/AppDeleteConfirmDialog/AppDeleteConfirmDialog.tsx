import { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IAppDeleteConfirmDialogProps } from './types';

export default function AppDeleteConfirmDialog({ onCancel, onDelete }: IAppDeleteConfirmDialogProps) {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        onCancel();
    };

    const handleOnDelete = () => {
        onDelete();
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Delete Confirmation.
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    This entity will be deleted permanently. Please confirm.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>Cancel</Button>
                <Button color='error' onClick={handleOnDelete}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}
