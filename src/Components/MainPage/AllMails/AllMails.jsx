import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadingtext } from '../../../action-creators/LoadingText'
import { mailcount } from '../../../action-creators/mailCounts'
import { config } from '../../../config'
import ContextApi from '../../../Context'
import './AllMails.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { Tooltip } from '@mui/material';
import MailCard from '../../MailCard/MailCard';
import { useParams } from 'react-router-dom'
import { inputvalue } from '../../../action-creators/SetSearchBarValue'
import { setcollectionname } from '../../../action-creators/setCollectionName'

const AllMails = () => {

    const params = useParams()

    const quickSetting = useSelector(state => state.quicksetting.value)

    let mailCount = useSelector(state => state.mailcounts.value.count)

    document.title = `All Mail - Gmail Clone`

    const context = useContext(ContextApi)

    const dispatch = useDispatch()
    dispatch(mailcount({ count: context.dynamicMails.length }))
    dispatch(inputvalue({ inputValue: 'Search in mail' }))
    dispatch(setcollectionname({ collectionName: "allmails" }))

    const [showNewestOldestPopup, setShowNewestOldestPopup] = useState(false)
    const [showSplitPanePopup, setShowSplitPanePopup] = useState(false)
    const [showMorePopup, setShowMorePopup] = useState(false)

    let collectionName = ''

    if (params.allmails == ":allmails") {
        collectionName = 'allmails'
    }

    const refOne = useRef()
    const refTwo = useRef()
    const refThree = useRef()

    useEffect(() => {
        document.addEventListener("click", handleDetectOutsideClick1, true)
    }, [])

    const handleDetectOutsideClick1 = (e) => {
        if (!refOne.current.contains(e.target)) {
            setShowMorePopup(false)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleDetectOutsideClick2, true)
    }, [])

    const handleDetectOutsideClick2 = (e) => {
        if (!refTwo.current.contains(e.target)) {
            setShowNewestOldestPopup(false)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleDetectOutsideClick3, true)
    }, [])

    const handleDetectOutsideClick3 = (e) => {
        if (!refThree.current.contains(e.target)) {
            setShowSplitPanePopup(false)
        }
    }

    const handleMorePopup = () => {
        showMorePopup === false ? setShowMorePopup(true) : setShowMorePopup(false)
    }

    const handleMarkAllAsRead = async () => {
        dispatch(loadingtext({ isLoading: true }))
        setShowMorePopup(false)
        await axios.put(`${config.api}/main/updateMarkAsReadAll`, { collectionName })
        dispatch(loadingtext({ isLoading: false }))
        window.location.reload()
    }

    const handleNewestOldestPopup = async () => {
        showNewestOldestPopup === false ? setShowNewestOldestPopup(true) : setShowNewestOldestPopup(false)
    }

    const handleSplitPanePopup = () => {
        showSplitPanePopup === false ? setShowSplitPanePopup(true) : setShowSplitPanePopup(false)
    }

    useEffect(() => {
        let AllMails = async () => {
            try {
                dispatch(loadingtext({ isLoading: true }))
                let fetchAllMails = await axios.get(`${config.api}/main/allmails`)
                context.setAllMails(fetchAllMails.data)
                dispatch(loadingtext({ isLoading: false }))
            } catch (error) {
                console.log(error);
            }
        }
        AllMails()
        return () => {
            dispatch(loadingtext({ isLoading: false }))
        }
    }, [])

    const handleRefreshPage = () => {
        dispatch(loadingtext({ isLoading: true }))
        setTimeout(() => {
            window.location.reload()
            dispatch(loadingtext({ isLoading: false }))
        }, 1000);
    }

    const getKeyWord = context.keyword

    const filteredMails = context.allMails.filter((fillMail) =>
        fillMail.title.toLowerCase().includes(getKeyWord) ||
        fillMail.subject.toLowerCase().includes(getKeyWord) ||
        fillMail.message.toLowerCase().includes(getKeyWord)
    )

    return (
        <div className='AllMails_container' style={quickSetting.value ? { width: "912px" } : { width: "80%" }}>
            <div className="allMailsSticky_top">
                <div className="top_btns">
                    <button>From <ArrowDropDownIcon /></button>
                    <button>Any time <ArrowDropDownIcon /></button>
                    <button>Has attachment</button>
                    <button>To <ArrowDropDownIcon /></button>
                    <button>Exclude calendar updates</button>
                    <button>Is unread</button>
                    <button>Advanced search</button>
                </div>
                <div className="bottom_icons">
                    <div className="icons_section">
                        <div className="iconSection_left">
                            <Tooltip title="Select">
                                <div className="checkbox_icon">
                                    <input type="checkbox" />
                                    <ArrowDropDownIcon />
                                </div>
                            </Tooltip>
                            <div className="refresh_icon" onClick={handleRefreshPage}>
                                <Tooltip title="Refresh">
                                    <RefreshOutlinedIcon className='iconButton_hoverEffect' />
                                </Tooltip>
                            </div>
                            <div className="more_icon" ref={refOne} onClick={handleMorePopup}>
                                <Tooltip title="More">
                                    <MoreVertIcon className='iconButton_hoverEffect' />
                                </Tooltip>
                            </div>
                            <div className={showMorePopup ? "morePopupAllMails moreopts" : "morePopupAllMails lessopts"}>
                                <button onClick={handleMarkAllAsRead}>Mark all as read</button>
                                <hr />
                                <p>Select messages to see more actions</p>
                            </div>
                        </div>
                        <div className="iconSection_right">
                            <div className="mail_count" ref={refTwo} onClick={handleNewestOldestPopup}>
                                <span>1</span>-<span>{mailCount}</span> of <span>{mailCount}</span>
                            </div>
                            {/* ---------- mail_count newest older popup start ---------- */}
                            <div className={showNewestOldestPopup ? "newestOlder_popupAllMails moreopts" : "newestOlder_popupAllMails lessopts"}>
                                <button disabled>Newest</button>
                                <button disabled>Oldest</button>
                            </div>
                            {/* ---------- mail_count newest older popup start ---------- */}
                            <div className="leftArrow_icon">
                                <Tooltip title="Newer">
                                    <ChevronLeftIcon className='iconButton_hoverEffect' />
                                </Tooltip>
                            </div>
                            <div className="rightArrow_icon">
                                <Tooltip title="Older">
                                    <ChevronRightIcon className='iconButton_hoverEffect' />
                                </Tooltip>
                            </div>
                            <Tooltip title="Toggle split pane mode">
                                <div className="split_icon">
                                    <HorizontalSplitIcon />
                                    <ArrowDropDownIcon ref={refThree} onClick={handleSplitPanePopup} />
                                </div>
                            </Tooltip>
                            {/* ---------- split pane mode popup start ---------- */}
                            <div className={showSplitPanePopup ? "splitPanemode_popupAllMails moreopts" : "splitPanemode_popupAllMails lessopts"}>
                                <p>No split</p>
                                <p>Vertical split</p>
                                <p>Horizontal split</p>
                            </div>
                            {/* ---------- split pane mode popup end ---------- */}
                            <Tooltip title="Input tools on/off (Ctrl-Shift-K)">
                                <div className="keyboard_icon">
                                    <KeyboardIcon />
                                    <ArrowDropDownIcon />
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mailCard_container">
                {
                    filteredMails.map((allMail) => {
                        return <MailCard allMail={allMail} key={allMail._id} />
                    })
                }
            </div>
        </div>
    )
}

export default AllMails