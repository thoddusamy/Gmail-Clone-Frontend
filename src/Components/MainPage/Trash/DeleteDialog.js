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
import { deletedialogpopup } from '../../../action-creators/DeleteDialog'

export default function DeleteDialog({ openDeleteDialog, setOpenDeleteDialog }) {

    const context = useContext(ContextApi)
    const dispatch = useDispatch()

    const handleClose = () => {
        setOpenDeleteDialog(false)
    }

    const handleDeleteDialogTrue = () => {
        dispatch(deletedialogpopup({ isConfirm: true }))
        setOpenDeleteDialog(false)
    }

    const handleDeleteDialogFalse = () => {
        dispatch(deletedialogpopup({ isConfirm: false }))
        setOpenDeleteDialog(false)
    }

    return (
        <div>
            <Dialog
                open={openDeleteDialog}
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
                        This action will affect all {context.trashMails.length} conversations in Trash. Are you sure you<br />want to continue?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleDeleteDialogFalse}
                        style={{
                            textTransform: 'none',
                            color: 'gray',
                            margin: '0 0 10px 0',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteDialogTrue}
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
