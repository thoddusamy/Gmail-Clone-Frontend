import React, { useContext, useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ContextApi from '../../Context'
import './MailOpenPage.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { IconButton, Tooltip } from '@mui/material';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LaunchIcon from '@mui/icons-material/Launch';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ShortcutOutlinedIcon from '@mui/icons-material/ShortcutOutlined';
import LabelImportantTwoToneIcon from '@mui/icons-material/LabelImportantTwoTone';
import StarIcon from '@mui/icons-material/Star';
import { loadingtext } from '../../action-creators/LoadingText'
import { config } from '../../config'
import axios from 'axios'

const MailOpenPage = () => {

    const { id } = useParams()

    const quickSetting = useSelector(state => state.quicksetting.value)
    const userInfoData = useSelector(state => state.userinfo.value)
    const getCollectionName = useSelector(state => state.setcollectionname.value.collectionName)

    const context = useContext(ContextApi)
    const dispatch = useDispatch()

    const [showToMe, setShowToMe] = useState(false)
    const [showMorePopup, setShowMorePopup] = useState(false)
    const [showMorePopupRight, setShowMorePopupRight] = useState(false)

    let dynamicColName = null

    if (getCollectionName == "inbox") {
        dynamicColName = context.inboxMails
    } else if (getCollectionName == "social") {
        dynamicColName = context.socialMails
    } else if (getCollectionName == "promotions") {
        dynamicColName = context.promoMails
    } else if (getCollectionName == "starred_mails") {
        dynamicColName = context.starredMails
    } else if (getCollectionName == "snoozed_mails") {
        dynamicColName = context.snoozedMails
    } else if (getCollectionName == "send_mails") {
        dynamicColName = context.sendMails
    } else if (getCollectionName == "important_mails") {
        dynamicColName = context.importantMails
    } else if (getCollectionName == "allmails") {
        dynamicColName = context.allMails
    } else if (getCollectionName == "spam_mails") {
        dynamicColName = context.spamMails
    } else if (getCollectionName == "trash_mails") {
        dynamicColName = context.trashMails
    }

    const openedMailData = dynamicColName.filter((mail) => {
        if (mail._id === id) {
            return mail
        }
    })

    const findIndex = context.dynamicMails.findIndex((index => index._id === id))

    const data = openedMailData[0]
    document.title = `${data.subject} - ${data.useremail} - Gmail Clone`

    const refOne = useRef(null)
    const refTwo = useRef(null)
    const refThree = useRef(null)

    useEffect(() => {
        document.addEventListener("click", handleDetectOutsideClick1, true)
    }, [])

    const handleDetectOutsideClick1 = (e) => {
        if (!refOne.current.contains(e.target)) {
            setShowToMe(false)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleDetectOutsideClick2, true)
    }, [])

    const handleDetectOutsideClick2 = (e) => {
        if (!refTwo.current.contains(e.target)) {
            setShowMorePopup(false)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleDetectOutsideClick3, true)
    }, [])

    const handleDetectOutsideClick3 = (e) => {
        if (!refThree.current.contains(e.target)) {
            setShowMorePopupRight(false)
        }
    }

    const handleToMePopup = () => {
        showToMe === false ? setShowToMe(true) : setShowToMe(false)
    }

    const handleShowHideMorePopup = () => {
        showMorePopup === false ? setShowMorePopup(true) : setShowMorePopup(false)
    }

    const handleMorePopupRight = () => {
        showMorePopupRight === false ? setShowMorePopupRight(true) : setShowMorePopupRight(false)
    }

    const handleArchived = async () => {
        if (data.isArchive == false) {
            dispatch(loadingtext({ isLoading: true }))
            let collectionName = getCollectionName
            let values = { isArchive: true, collectionName }
            console.log(collectionName);
            await axios.put(`${config.api}/main/updateIsArchived/${id}`, values)
            dispatch(loadingtext({ isLoading: false }))
            window.location.reload()
            window.history.back()
        }
    }

    const handleDelete = async () => {
        if (data.isDelete == false) {
            dispatch(loadingtext({ isLoading: true }))
            let collectionName = getCollectionName
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
            window.history.back()
        }
    }

    const handleChangeMarkAsRead = async () => {
        if (data.isRead == true) {
            dispatch(loadingtext({ isLoading: true }))
            let collectionName = getCollectionName
            let values = { isRead: false, collectionName }
            await axios.put(`${config.api}/main/updateIsRead/${id}`, values)
            dispatch(loadingtext({ isLoading: false }))
            window.location.reload()
            window.history.back()
        } else if (data.isRead == false) {
            dispatch(loadingtext({ isLoading: true }))
            let collectionName = getCollectionName
            let values = { isRead: true, collectionName }
            await axios.put(`${config.api}/main/updateIsRead/${id}`, values)
            dispatch(loadingtext({ isLoading: false }))
            window.location.reload()
            window.history.back()
        }
    }

    const handleSnoozed = async () => {
        if (data.isSnoozed == false) {
            dispatch(loadingtext({ isLoading: true }))
            let collectionName = getCollectionName
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
            window.history.back()
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
            window.history.back()
        }
    }

    const handleImportantLabel = async () => {
        if (data.isImportant == false) {
            dispatch(loadingtext({ isLoading: true }))
            let collectionName = getCollectionName
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
            window.history.back()
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
            window.history.back()
        }
    }

    const handleStarLabel = async () => {
        if (data.isStarred == false) {
            dispatch(loadingtext({ isLoading: true }))
            let collectionName = getCollectionName
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
            window.history.back()
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
            window.history.back()
        }
    }

    const handleSpam = async () => {
        dispatch(loadingtext({ isLoading: true }))
        let collectionName = getCollectionName
        let values = { isSpam: true, collectionName }
        await axios.put(`${config.api}/main/updateSpam/${id}`, values)
        let getData = await axios.get(`${config.api}/main/${id}/${collectionName}`)
        let sendValues = null
        getData.data.map((mail) => {
            sendValues = mail
        })
        await axios.post(`${config.api}/main/addMailToSpam`, sendValues)
        await axios.put(`${config.api}/main/addFieldToSpamMail/${id}`, { collectionName })
        dispatch(loadingtext({ isLoading: false }))
        window.location.reload()
        window.history.back()
    }

    const handleRemoveFromSpam = async () => {
        dispatch(loadingtext({ isLoading: true }))
        let getData = await axios.get(`${config.api}/main/spam`)
        let sendValues = ''
        getData.data.map((mail) => {
            if (mail._id === id) {
                sendValues = mail.collectionName
            }
        })
        let values = { isSpam: false, collectionName: sendValues }
        await axios.put(`${config.api}/main/updateSpam/${id}`, values)
        await axios.delete(`${config.api}/main/removeFromSpam/${id}`)
        dispatch(loadingtext({ isLoading: false }))
        window.location.reload()
        window.history.back()
    }

    const handleDeleteSpamOne = async () => {
        dispatch(loadingtext({ isLoading: true }))
        await axios.delete(`${config.api}/main/removeFromSpam/${id}`)
        dispatch(loadingtext({ isLoading: false }))
        window.location.reload()
        window.history.back()
    }

    const handleDeleteTrashOne = async () => {
        dispatch(loadingtext({ isLoading: true }))
        await axios.delete(`${config.api}/main/removeFromTrash/${id}`)
        dispatch(loadingtext({ isLoading: false }))
        window.location.reload()
        window.history.back()
    }

    return (
        <div className='mailOpened__container' style={quickSetting.value ? { width: "912px" } : { width: "80%" }}>
            <div className="pageTop__icons">
                <div className="icons_left">
                    <div className='left_section'>
                        <Tooltip title='Back to Inbox'>
                            <IconButton onClick={() => window.history.back()}>
                                <ArrowBackIcon />
                            </IconButton>
                        </Tooltip>
                        <div className="dlt-forever-btn" style={getCollectionName == "trash_mails" || getCollectionName == "spam_mails" ? { display: "" } : { display: 'none' }}>
                            <button onClick={getCollectionName == "spam_mails" ? handleDeleteSpamOne : handleDeleteTrashOne}>Delete forever</button>
                        </div>
                        <div className="notSpam-btn" style={getCollectionName == "spam_mails" ? { display: "" } : { display: 'none' }}>
                            <button onClick={handleRemoveFromSpam}>Not Spam</button>
                        </div>
                        <Tooltip title='Archive' style={getCollectionName == "trash_mails" || getCollectionName == "spam_mails" ? { display: "none" } : { display: '' }}>
                            <IconButton onClick={handleArchived}>
                                <ArchiveOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Report spam' style={getCollectionName == "spam_mails" ? { display: "none" } : { display: '' }}>
                            <IconButton onClick={handleSpam}>
                                <ReportOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Delete' style={getCollectionName == "trash_mails" || getCollectionName == "spam_mails" ? { display: "none" } : { display: '' }}>
                            <IconButton onClick={handleDelete}>
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className='middle_section'>
                        <Tooltip title={data.isRead ? 'Mark as unread' : 'Mark as read'}>
                            <IconButton onClick={handleChangeMarkAsRead}>
                                <EmailOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={data.isSnoozed ? 'Unsnooze' : 'Snooze'}>
                            <IconButton onClick={handleSnoozed}>
                                <AccessTimeIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Add to tasks'>
                            <IconButton>
                                <AddTaskIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className='right_section'>
                        <Tooltip title='Move to'>
                            <IconButton>
                                <DriveFileMoveOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Labels'>
                            <IconButton>
                                <LabelOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='More' ref={refTwo} onClick={handleShowHideMorePopup}>
                            <IconButton>
                                <MoreVertOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <div className={showMorePopup ? "morePopup moreopts" : "morePopup lessopts"}>
                            <button onClick={handleChangeMarkAsRead}>Mark as unread</button>
                            <button onClick={handleImportantLabel}>{data.isImportant ? "Mark as not important" : "Mark as important"}</button>
                            <button onClick={handleStarLabel}>{data.isStarred ? "Remove star" : "Add star"}</button>
                            <button>Create event</button>
                            <button>Filter messages like these</button>
                            <button>Mute</button>
                        </div>
                    </div>
                </div>

                <div className="icons_right">
                    <div className="count">
                        <span>{findIndex + 1}</span> of <span>{context.dynamicMails.length}</span>
                    </div>
                    <Tooltip title='Newer'>
                        <IconButton>
                            <ChevronLeftOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Older'>
                        <IconButton>
                            <ChevronRightOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <div className="keyboard_icon">
                        <Tooltip title='Input tools on/off (Ctrl-Shift-K)'>
                            <KeyboardIcon />
                        </Tooltip>
                        <Tooltip title='Select input tool'>
                            <ArrowDropDownIcon />
                        </Tooltip>
                    </div>
                </div>
            </div>

            <div className="mailOpenedBody__container">
                <div className="subject">
                    <div className="sub_left">
                        <h2>{data.subject}</h2>
                        <IconButton onClick={handleImportantLabel}>
                            {
                                data.isImportant == true ? <LabelImportantIcon style={data.isImportant ? { color: '#ffc550' } : null} />
                                    : data.isImportant == false ? <LabelImportantTwoToneIcon /> : null
                            }
                        </IconButton>
                        <div className="label">
                            <p>{getCollectionName == "trash_mails" ? "Trash" : getCollectionName == "spam_mails" ? "Spam" : "Inbox"}</p>
                            <p>x</p>
                        </div>
                    </div>
                    <div className="sub_right">
                        <Tooltip title='Print all'>
                            <IconButton onClick={() => window.print()}>
                                <LocalPrintshopOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='In new window'>
                            <IconButton>
                                <LaunchIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                <div className="userInfo">
                    <div className="userinfo_left">
                        <div className="userImg">
                            <img src={userInfoData.img} alt="" />
                        </div>
                        <div className="userName_email">
                            <div className="top">
                                <p>{data.username}</p>
                                <p>&#60;{data.useremail}&#62;</p>
                            </div>
                            <div className="bottom">
                                <p>to me</p>
                                <Tooltip title='Show details' ref={refOne} onClick={handleToMePopup}>
                                    <ArrowDropDownIcon className='tome' />
                                </Tooltip>
                                <div className={showToMe ? "toMe_popup moreopts" : "toMe_popup lessopts"}>
                                    <p>
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from:</span>
                                        <span>
                                            <span style={{ fontWeight: 'bold', color: '#000' }}>{data.username}</span>
                                            <span style={{ color: 'gray' }}> &#60;{data.useremail}&#62;</span>
                                        </span>
                                    </p>
                                    <p>
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to:</span>
                                        <span>
                                            <span style={{ color: '#000' }}>{data.username}</span>
                                            <span> &#60;{data.useremail}&#62;</span>
                                        </span>
                                    </p>
                                    <p>
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;date:</span>
                                        <span>{data.date}</span>
                                    </p>
                                    <p>
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subject:</span>
                                        <span>{data.subject}</span>
                                    </p>
                                    <p>
                                        <span>mailed-by:</span>
                                        <span>gmail.com</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="userinfo_right">
                        <p>{data.day}, {data.date}</p>
                        <Tooltip title={data.isStarred ? "Starred" : "Not starred"} style={getCollectionName == "trash_mails" ? { display: "none" } : { display: '' }}>
                            <IconButton onClick={handleStarLabel}>
                                {
                                    data.isStarred == true ? <StarIcon style={data.isStarred ? { color: '#ffc550' } : null} />
                                        : data.isStarred == false ? < StarBorderOutlinedIcon /> : null
                                }
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Reply'>
                            <IconButton>
                                <ShortcutOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='More' ref={refThree} onClick={handleMorePopupRight}>
                            <IconButton>
                                <MoreVertOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <div className={showMorePopupRight ? "morePopupRight moreopts" : "morePopupRight lessopts"}>
                            <button><ShortcutOutlinedIcon style={{ transform: "scaleX(-1)" }} /> Reply</button>
                            <button><ShortcutOutlinedIcon /> Forward</button>
                            <button>Filter messages like this</button>
                            <button onClick={() => window.print()}>Print</button>
                            {getCollectionName == "trash_mails" ? '' : <button onClick={handleDelete}>Delete this message</button>}
                            <button>{`Block "${data.username}"`}</button>
                            <button onClick={handleSpam}>Report spam</button>
                            <button>Report phishing</button>
                            <button>Show original</button>
                            {getCollectionName == "trash_mails" ? '' : <button>Translate message</button>}
                            <button>Download message</button>
                            <button onClick={handleChangeMarkAsRead}>Mark as unread</button>
                        </div>
                    </div>
                </div>

                <div className="message">
                    <p>{data.message}</p>
                </div>

                <div className="mailOpened__footer">
                    <button>
                        <p><ShortcutOutlinedIcon /></p>
                        <p>Reply</p>
                    </button>
                    <button>
                        <p><ShortcutOutlinedIcon /></p>
                        <p>Forward</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MailOpenPage