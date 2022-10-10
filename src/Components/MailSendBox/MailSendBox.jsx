import React, { useRef, useState, useEffect, useReducer } from 'react'
import { Tooltip } from '@mui/material';
import './MailSendBox.css'
import RemoveIcon from '@mui/icons-material/Remove';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import LockClockIcon from '@mui/icons-material/LockClock';
import CreateIcon from '@mui/icons-material/Create';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux'
import { closemailsendbox } from '../../action-creators/closeMailSendBox'
import { alertdialogpopup } from '../../action-creators/AlertDialog'
import { useFormik } from 'formik'
import axios from 'axios';
import { config } from '../../config';
import AlertDialog from './AlertDialog';
import { loadingtext } from '../../action-creators/LoadingText';

const MailSendBox = () => {

    const closeMailSendPopup = useSelector(state => state.closesendbox.value.isClose)
    const dispatch = useDispatch()

    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const [showToCcBcc, setShowToCcBcc] = useState(false)
    const [minimizeSendBox, SetMinimizeSendBox] = useState(false)
    const [maximizeSendBox, setMaximizeSendBox] = useState(false)

    const handleShowToCcBcc = () => {
        ref1.current.focus ? setShowToCcBcc(true) : setShowToCcBcc(false)
    };

    const handleHideToCcBcc = () => {
        ref2.current.focus ? setShowToCcBcc(false) : setShowToCcBcc(true)
    }

    const handleMinimizeSendBox = () => {
        minimizeSendBox === false ? SetMinimizeSendBox(true) : SetMinimizeSendBox(false)
        setMaximizeSendBox(false)
    }

    const handleCloseSendBox = () => {
        if (closeMailSendPopup === true) {
            dispatch(closemailsendbox({ isClose: false }))
        }
        setMaximizeSendBox(false)
        { formik.resetForm({ values: '' }) }
    }

    const handleMaximizeSendBox = () => {
        maximizeSendBox === false ? setMaximizeSendBox(true) : setMaximizeSendBox(false)
    }

    const getDate = new Date()
    const time = String(getDate).slice(4, 10)
    const setAmPm = +String(getDate).slice(16, 18)
    const date = String(getDate).slice(4, 21)
    const day = String(getDate).slice(0, 3)
    const monthandtime = String(getDate).slice(4, 24)
    const month = String(getDate).slice(4, 7)
    const year = String(getDate).slice(11, 15)
    const datee = String(getDate).slice(8, 10)
    const setTime = String(getDate).slice(16, 24)

    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const findMonth = months.indexOf(month)

    const formik = useFormik({
        initialValues: {
            sortbydate: '',
            monthandtime: '',
            title: 'me',
            subject: '',
            message: '',
            time: `${time}`,
            username: 'Demo User',
            useremail: '',
            date: `${date} ${setAmPm < 12 ? "AM" : "PM"}`,
            day,
            isStarred: false,
            isImportant: false,
            isArchive: false,
            isDelete: false,
            isRead: false,
            isSnoozed: false,
            isSpam: false
        },

        validate: (values) => {
            const errors = {}

            if (values.useremail.length == 0) {
                errors.useremail = "required"
            }

            return errors
        },

        onSubmit: async (values, { resetForm }) => {
            dispatch(loadingtext({ isLoading: true }))
            if (values.subject.length == 0 && values.message.length == 0) {
                var confirm = window.confirm("Send this message without a subject or text in the body?")
            } else { var confirm = true }
            if (values.subject.length == 0) {
                confirm ? values.subject = "(no subject)" : values.subject = ""
            }
            if (confirm) {
                resetForm({ values: '' })
                if (closeMailSendPopup === true) {
                    dispatch(closemailsendbox({ isClose: false }))
                }
                let postData = await axios.post(`${config.api}/main/addmail`, values)
                setMaximizeSendBox(false)
            }
            dispatch(loadingtext({ isLoading: true }))
            window.location.reload()
        }
    })

    const handleAlertDialog = () => {
        if (formik.values.useremail.length == 0) {
            dispatch(alertdialogpopup({ isOpen: true }))
        }
        formik.values.monthandtime = monthandtime
        formik.values.sortbydate = `${year}-${findMonth + 1}-${datee} ${setTime}`
    }

    return (
        <div className={maximizeSendBox ? "background_layout" : ""}>
            < AlertDialog />
            <div id={maximizeSendBox ? 'mailSendBoxCon__big' : ""} className={closeMailSendPopup ? 'mailSendBox__container moreopts' : 'mailSendBox__container lessopts'}
                style={minimizeSendBox ? { bottom: "-460px", width: "262px" } : { bottom: "0px" }}>
                <div className="sendBox_header">
                    <div className="headerText" onClick={handleMinimizeSendBox} >
                        New Message
                    </div>
                    <div className="header_icons">
                        <RemoveIcon onClick={handleMinimizeSendBox} />
                        {
                            maximizeSendBox ? <CloseFullscreenIcon onClick={handleMaximizeSendBox} /> :
                                <OpenInFullIcon onClick={handleMaximizeSendBox} />
                        }
                        <CloseIcon onClick={handleCloseSendBox} />
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="sendBox_body">
                        <div className="inputFields">
                            <div className="sendTo_input">
                                <span className={showToCcBcc ? 'to moreopts' : 'to lessopts'}>To</span>
                                <input style={showToCcBcc ? { paddingLeft: '22px' } : null} ref={ref1}
                                    onClick={handleShowToCcBcc} type="email" placeholder={showToCcBcc ? '' : 'Recipients'}
                                    name="useremail" onChange={formik.handleChange} value={formik.values.useremail} />
                                <span className={showToCcBcc ? 'cc moreopts' : 'cc lessopts'}>
                                    <a href="#">Cc</a>
                                </span>
                                <span className={showToCcBcc ? 'bcc moreopts' : 'bcc lessopts'}>
                                    <a href="#">Bcc</a>
                                </span>
                            </div>
                            <input ref={ref2} onClick={handleHideToCcBcc} type="text" placeholder='Subject'
                                name="subject" onChange={formik.handleChange} value={formik.values.subject} />
                            <textarea style={maximizeSendBox ? { width: "100%", height: "460px" } : { width: "516px", height: "320px" }}
                                ref={ref2} onClick={handleHideToCcBcc} name="message" onChange={formik.handleChange}
                                value={formik.values.message}></textarea>
                        </div>
                    </div>
                    <div className="sendBox_footer" style={maximizeSendBox ? { marginTop: "140px" } : { marginTop: "0px" }}>
                        <div className="sendBtn">
                            <Tooltip title="Send (Ctrl-Enter)">
                                <button onClick={handleAlertDialog}>Send</button>
                            </Tooltip>
                            <Tooltip title="More send options">
                                <button><ArrowDropDownIcon /></button>
                            </Tooltip>
                        </div>
                        <div className="footer_icons">
                            <div className="icons_left">
                                <Tooltip title="Formatting options">
                                    <FormatColorTextIcon />
                                </Tooltip>
                                <Tooltip title="Attach files">
                                    <AttachFileIcon />
                                </Tooltip>
                                <Tooltip title="Insert link (Ctrl-K)">
                                    <InsertLinkIcon />
                                </Tooltip>
                                <Tooltip title="Insert emoji (Ctrl-Shift-2)">
                                    <EmojiEmotionsOutlinedIcon />
                                </Tooltip>
                                <Tooltip title="Insert file using Drive">
                                    <AddToDriveIcon />
                                </Tooltip>
                                <Tooltip title="Insert photo">
                                    <InsertPhotoOutlinedIcon />
                                </Tooltip>
                                <Tooltip title="Toggle confidential mode">
                                    <LockClockIcon />
                                </Tooltip>
                                <Tooltip title="Insert signature">
                                    <CreateIcon />
                                </Tooltip>
                            </div>
                            <div className="icons_right">
                                <Tooltip title="More options">
                                    <MoreVertIcon />
                                </Tooltip>
                                <Tooltip title="Discard draft (Ctrl-Shift-D)">
                                    <DeleteIcon onClick={handleCloseSendBox} />
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default MailSendBox