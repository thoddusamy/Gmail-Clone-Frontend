import React, { useContext } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ContextApi from '../../../Context'
import { useDispatch } from 'react-redux'
import { spamdialogpopup } from '../../../action-creators/SpamDialog'

export default function SpamDialog({ openSpamDialog, setOpenSpamDialog }) {

    const context = useContext(ContextApi)
    const dispatch = useDispatch()

    const handleClose = () => {
        setOpenSpamDialog(false)
    }

    const handleSpamDialogTrue = () => {
        dispatch(spamdialogpopup({ isConfirm: true }))
        setOpenSpamDialog(false)
    }

    const handleSpamDialogFalse = () => {
        dispatch(spamdialogpopup({ isConfirm: false }))
        setOpenSpamDialog(false)
    }

    return (
        <div>
            <Dialog
                open={openSpamDialog}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle
                    id='alert-dialog-title'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    {'Confirm deleting messages'}
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id='alert-dialog-description'
                        style={{ fontSize: '14px', padding: "0 20px 0 0" }}
                    >
                        This action will affect all {context.spamMails.length} conversations in Spam. Are you sure you<br />want to continue?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleSpamDialogFalse}
                        style={{
                            textTransform: 'none',
                            color: 'gray',
                            margin: '0 0 10px 0',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSpamDialogTrue}
                        autoFocus
                        style={{
                            textTransform: 'none',
                            margin: '0 20px 10px 10px',
                            backgroundColor: '#1e6ef7',
                            color: '#fff',
                        }}
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
