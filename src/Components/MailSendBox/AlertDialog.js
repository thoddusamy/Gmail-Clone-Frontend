import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from 'react-redux'
import { alertdialogpopup } from '../../action-creators/AlertDialog'

const AlertDialog = () => {

    const alertDialog = useSelector(state => state.alertdialog.value.isOpen)
    const dispatch = useDispatch()

    const handleClose = () => {
        if (alertDialog === true) {
            dispatch(alertdialogpopup({ isOpen: false }))
        }
    };

    return (
        <div>
            <Dialog
                open={alertDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Error"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please specify at least one recipient.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{ backgroundColor: "#0b57d0", color: "#fff" }}
                        onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialog
