import React, { useEffect, useState } from 'react'
import './MailCard.css'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LabelImportantTwoToneIcon from '@mui/icons-material/LabelImportantTwoTone';
import StarIcon from '@mui/icons-material/Star';
import { IconButton, Tooltip } from '@mui/material';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../config';
import { loadingtext } from '../../action-creators/LoadingText'

const MailCard = ({ inbox, promotions, social, starredMail, snoozeMail, sendMail, importantMail, allMail, spamMail, trashMail }) => {

    const params = useParams()

    const quickSetting = useSelector(state => state.quicksetting.value)
    const dispatch = useDispatch()
    const [data, setData] = useState([])

    useEffect(() => {
        if (inbox) {
            setData(inbox)
        } else if (promotions) {
            setData(promotions)
        } else if (social) {
            setData(social)
        } else if (starredMail) {
            setData(starredMail)
        } else if (snoozeMail) {
            setData(snoozeMail)
        } else if (sendMail) {
            setData(sendMail)
        } else if (importantMail) {
            setData(importantMail)
        } else if (allMail) {
            setData(allMail)
        } else if (spamMail) {
            setData(spamMail)
        } else if (trashMail) {
            setData(trashMail)
        }
    }, [data])

    let collectionName = ''

    if (inbox) {
        collectionName = 'inbox'
    } else if (promotions) {
        collectionName = 'promotions'
    } else if (social) {
        collectionName = 'social'
    } else if (starredMail) {
        collectionName = 'starred_mails'
    } else if (snoozeMail) {
        collectionName = 'snoozed_mails'
    } else if (sendMail) {
        collectionName = 'send_mails'
    } else if (importantMail) {
        collectionName = 'important_mails'
    } else if (allMail) {
        collectionName = 'allmails'
    } else if (spamMail) {
        collectionName = 'spam_mails'
    } else if (trashMail) {
        collectionName = 'trash_mails'
    }

    const handleImportantLabel = async (id) => {
        if (data.isImportant == false) {
            dispatch(loadingtext({ isLoading: true }))
            let values = { isImportant: true, collectionName }
            await axios.put(`${config.api}/main/updateImportant/${id}`, values)
            let getData = await axios.get(`${config.api}/main/${id}/${collectionName}`)
            let sendValues = null
            getData.data.map((mail) => {
                sendValues = mail
            })
            await axios.post(`${config.api}/main/addMailToImportant`, sendValues)
            await axios.put(`${config.api}/main/addFieldToImportantMail/${id}`, { collectionName })
            dispatch(loadingtext({ isLoading: false }))
            window.location.reload()
        } else if (data.isImportant == true) {
            dispatch(loadingtext({ isLoading: true }))
            let getData = await axios.get(`${config.api}/main/important`)
            let sendValues = ''
            getData.data.map((mail) => {
                if (mail._id === id) {
                    sendValues = mail.collectionName
                }
            })
            let values = { isImportant: false, collectionName: sendValues }
            await axios.put(`${config.api}/main/updateImportant/${id}`, values)
            await axios.delete(`${config.api}/main/removeFromImportant/${id}`)
            dispatch(loadingtext({ isLoading: false }))
            window.location.reload()
        }
    }

    const handleStarLabel = async (id) => {
        if (data.isStarred == false) {
            dispatch(loadingtext({ isLoading: true }))
            let values = { isStarred: true, collectionName }
            await axios.put(`${config.api}/main/updateStarred/${id}`, values)
            let getData = await axios.get(`${config.api}/main/${id}/${collectionName}`)
            let sendValues = null
            getData.data.map((mail) => {
                sendValues = mail
            })
            await axios.post(`${config.api}/main/addMailToStarred`, sendValues)
            await axios.put(`${config.api}/main/addFieldToStarredMail/${id}`, { collectionName })
            dispatch(loadingtext({ isLoading: false }))
            window.location.reload()
        } else if (data.isStarred == true) {
            dispatch(loadingtext({ isLoading: true }))
            let getData = await axios.get(`${config.api}/main/starred`)
            let sendValues = ''
            getData.data.map((mail) => {
                if (mail._id === id) {
                    sendValues = mail.collectionName
                }
            })
            let values = { isStarred: false, collectionName: sendValues }
            await axios.put(`${config.api}/main/updateStarred/${id}`, values)
            await axios.delete(`${config.api}/main/removeFromStarred/${id}`)
            dispatch(loadingtext({ isLoading: false }))
            window.location.reload()
        }
    }

    const handleMarkAsRead = async (id) => {
        if (data.isRead == false) {
            let values = { isRead: true, collectionName }
            await axios.put(`${config.api}/main/updateIsRead/${id}`, values)
        }
    }

    const handleChangeMarkAsRead = async (id) => {
        if (data.isRead == true) {
            dispatch(loadingtext({ isLoading: true }))
            let values = { isRead: false, collectionName }
            await axios.put(`${config.api}/main/updateIsRead/${id}`, values)
            dispatch(loadingtext({ isLoading: false }))
            window.location.reload()
        } else if (data.isRead == false) {
            dispatch(loadingtext({ isLoading: true }))
            let values = { isRead: true, collectionName }
            await axios.put(`${config.api}/main/updateIsRead/${id}`, values)
            dispatch(loadingtext({ isLoading: false }))
            window.location.reload()
        }
    }

    const handleDelete = async (id) => {
        if (data.isDelete == false) {
            dispatch(loadingtext({ isLoading: true }))
            let values = { isDelete: true, collectionName }
            await axios.put(`${config.api}/main/updateIsDelete/${id}`, values)
            let getData = await axios.get(`${config.api}/main/getDataForDelete/${id}/${collectionName}`)
            let sendValues = null
            getData.data.map((mail) => {
                sendValues = mail
            })
            await axios.post(`${config.api}/main/addMailToTrash`, sendValues)
            dispatch(loadingtext({ isLoading: false }))
            window.location.reload()
        }
    }

    const handleArchived = async (id) => {
        if (data.isArchive == false) {
            dispatch(loadingtext({ isLoading: true }))
            let values = { isArchive: true, collectionName }
            await axios.put(`${config.api}/main/updateIsArchived/${id}`, values)
            dispatch(loadingtext({ isLoading: false }))
            window.location.reload()
        }
    }

    const handleSnoozed = async (id) => {
        if (data.isSnoozed == false) {
            dispatch(loadingtext({ isLoading: true }))
            let values = { isSnoozed: true, collectionName }
            await axios.put(`${config.api}/main/updateIssnoozed/${id}`, values)
            let getData = await axios.get(`${config.api}/main/getDataForSnoozed/${id}/${collectionName}`)
            let sendValues = null
            getData.data.map((mail) => {
                if (mail._id == id) {
                    sendValues = mail
                }
            })
            await axios.post(`${config.api}/main/addMailtoSnoozed`, sendValues)
            await axios.put(`${config.api}/main/addFieldToSnoozedMail/${id}`, { collectionName })
            dispatch(loadingtext({ isLoading: false }))
            window.location.reload()
        } else if (data.isSnoozed == true) {
            dispatch(loadingtext({ isLoading: true }))
            let getData = await axios.get(`${config.api}/main/snoozed`)
            let sendValues = ''
            getData.data.map((mail) => {
                if (mail._id === id) {
                    sendValues = mail.collectionName
                }
            })
            let values = { isSnoozed: false, collectionName: sendValues }
            await axios.put(`${config.api}/main/updateIssnoozed/${id}`, values)
            await axios.delete(`${config.api}/main/removeFromSnoozed/${id}`)
            dispatch(loadingtext({ isLoading: false }))
            window.location.reload()
        }
    }

    return (
        <div className='MailCard_container'
            style={data.isRead ? { fontWeight: "normal", backgroundColor: "" } : { fontWeight: "bold", backgroundColor: "white" }}>
            {/* -------------- Mail_card icons left start -------------- */}
            <div className="icons">
                <Tooltip title="Select">
                    <IconButton>
                        <input type="checkbox" />
                    </IconButton>
                </Tooltip>
                <Tooltip title={data.isStarred ? "Starred" : "Not starred"} style={params.trash == ':trash' ? { display: "none" } : { display: "" }}>
                    <IconButton onClick={() => handleStarLabel(data._id)}>
                        {
                            data.isStarred == true ? <StarIcon style={data.isStarred ? { color: '#ffc550' } : null} />
                                : data.isStarred == false ? < StarBorderIcon /> : null
                        }
                    </IconButton>
                </Tooltip>
                <Tooltip title="Click to teach Gmail this conversation is important">
                    <IconButton onClick={() => handleImportantLabel(data._id)}>
                        {
                            data.isImportant == true ? <LabelImportantIcon style={data.isImportant ? { color: '#ffc550' } : null} />
                                : data.isImportant == false ? <LabelImportantTwoToneIcon /> : null
                        }
                    </IconButton>
                </Tooltip>
            </div>
            {/* -------------- Mail_card icons left end -------------- */}

            <Link to={`/main/${data._id}`} className="middle_section" onClick={() => handleMarkAsRead(data._id)}>
                {/* -------------- Mail_card title text start -------------- */}
                <div className={params.send == ":send" ? "To moreopts" : "lessopts"}>
                    <p>To:</p>
                </div>
                <div className={params.trash == ":trash" ? "trash moreopts" : "lessopts"}>
                    <DeleteOutlinedIcon />
                </div>
                <div className="titleText">
                    <p>{data.title}</p>
                </div>
                {/* -------------- Mail_card title text end -------------- */}
                {/* -------------- Mail_card subject text start -------------- */}
                <div className={params.star == ":star" || params.send == ":send" || params.important == ":important"
                    || params.allmails == ":allmails" || params.socialmails == ":socialmails" || params.updates == ":updates"
                    || params.promotionmails == ":promotionmails" ? "collectionName moreopts" : "lessopts"}>
                    <p>inbox</p>
                </div>
                <div className="subjectText">
                    <p>{data.subject}</p>
                </div>
                {/* -------------- Mail_card subject text end -------------- */}
                {/* -------------- Mail_card mail description text start -------------- */}
                <div className="mailDesc_text"
                    style={quickSetting.value ? { width: "405px" } : { maxWidth: "605px" }}>
                    {/* {
                        data.message.length == '' ? <p>{data.message}</p> : <p>&nbsp;- {data.message}</p>
                    } */}
                    <p>&nbsp;- {data.message}</p>
                </div>
                {/* -------------- Mail_card mail description text end -------------- */}
                {/* -------------- Mail_card time text start -------------- */}
                <div className="timeText">
                    <p>{data.time}</p>
                </div>
                {/* -------------- Mail_card time text end -------------- */}
            </Link>

            {/* -------------- Mail_Icons right start -------------- */}
            <div className="hoverIcons_right" style={data.isRead ? { backgroundColor: '' } : { backgroundColor: 'white' }}>
                <Tooltip title="Archive">
                    <IconButton onClick={() => handleArchived(data._id)}
                        disabled={data.isArchive || params.trash == ":trash" || params.spam == ":spam"}>
                        <ArchiveOutlinedIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Delete" disabled={params.trash == ":trash"}>
                    <IconButton onClick={() => handleDelete(data._id)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title={data.isRead ? "Mark as unread" : "Mark as read"}>
                    <IconButton onClick={() => handleChangeMarkAsRead(data._id)}>
                        {data.isRead ? <MailOutlineIcon /> : <DraftsOutlinedIcon />}
                    </IconButton>
                </Tooltip>

                <Tooltip title={data.isSnoozed ? "Unsnooze" : "Snooze"}>
                    <IconButton onClick={() => handleSnoozed(data._id)}>
                        <AccessTimeIcon />
                    </IconButton>
                </Tooltip>
            </div>
            {/* -------------- Mail_Icons right end -------------- */}

        </div>
    )
}

export default MailCard