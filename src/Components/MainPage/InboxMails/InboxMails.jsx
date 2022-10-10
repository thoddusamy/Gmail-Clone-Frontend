import React, { useEffect, useState } from 'react'
import './InboxMails.css'
import { useDispatch, useSelector } from 'react-redux'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import InboxIcon from '@mui/icons-material/Inbox';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { Tooltip } from '@mui/material';
import { Link, Outlet, useParams } from 'react-router-dom';
import { inboxsortvalue } from '../../../action-creators/setInboxsort'
import { loadingtext } from '../../../action-creators/LoadingText'
import { useRef } from 'react';
import axios from 'axios';
import { config } from '../../../config';
import { inputvalue } from '../../../action-creators/SetSearchBarValue'

const InboxMails = () => {

    const params = useParams()

    const quickSetting = useSelector(state => state.quicksetting.value)
    let mailCount = useSelector(state => state.mailcounts.value.count)
    const inboxSortValue = useSelector(state => state.inboxsortvalue.value.numValue)

    const dispatch = useDispatch()

    dispatch(inputvalue({ inputValue: 'Search in mail' }))

    const [showNewestOldestPopup, setShowNewestOldestPopup] = useState(false)
    const [showSplitPanePopup, setShowSplitPanePopup] = useState(false)
    const [showMorePopup, setShowMorePopup] = useState(false)

    let collectionName = ''

    if (Object.keys(params).length === 0) {
        collectionName = 'inbox'
    } else if (params.promo == ":promo") {
        collectionName = 'promotions'
    } else if (params.social == ":social") {
        collectionName = 'social'
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

    const handleNewestOldestPopup = async () => {
        showNewestOldestPopup === false ? setShowNewestOldestPopup(true) : setShowNewestOldestPopup(false)
    }

    const handleSplitPanePopup = () => {
        showSplitPanePopup === false ? setShowSplitPanePopup(true) : setShowSplitPanePopup(false)
    }

    const getNewestInboxData = async () => {
        setShowNewestOldestPopup(false)
        dispatch(inboxsortvalue({ numValue: -1 }))
    }

    const getOldestInboxData = async () => {
        setShowNewestOldestPopup(false)
        dispatch(inboxsortvalue({ numValue: 1 }))
    }

    const handleMorePopup = () => {
        showMorePopup === false ? setShowMorePopup(true) : setShowMorePopup(false)
    }

    const handleMarkAllAsRead = async () => {
        dispatch(loadingtext({ isLoading: true }))
        setShowMorePopup(false)
        let markAllAsread = await axios.put(`${config.api}/main/updateMarkAsReadAll`, { collectionName })
        alert(markAllAsread.data.message);
        dispatch(loadingtext({ isLoading: false }))
        window.location.reload()
    }

    const handleRefreshPage = () => {
        dispatch(loadingtext({ isLoading: true }))
        setTimeout(() => {
            window.location.reload()
            dispatch(loadingtext({ isLoading: false }))
        }, 1000);
    }

    return (
        <div className="mainpage" style={quickSetting.value ? { width: "912px" } : { width: "80%" }}>
            {/* ------------- mainPage sticky header start ------------- */}
            <div className="mainPage__sticky">

                {/* ------------ mainpage_sticky icons_section start ------------ */}
                <div className="icons_section">
                    <div className="iconSection_left">
                        <Tooltip title="Select">
                            <div className="checkbox_icon">
                                <input type="checkbox" />
                                <ArrowDropDownOutlinedIcon />
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
                        <div className={showMorePopup ? "morePopup moreopts" : "morePopup lessopts"}>
                            <button onClick={handleMarkAllAsRead}>Mark all as read</button>
                            <hr />
                            <p>Select messages to see more actions</p>
                        </div>
                    </div>
                    <div className="iconSection_right">
                        <div className="mail_count" ref={refTwo} onClick={handleNewestOldestPopup}>
                            {inboxSortValue === -1 ? <span>1</span> : <span>{mailCount}</span>}-{inboxSortValue === 1 ? <span>0</span> : <span>{mailCount}</span>} of <span>{mailCount}</span>
                        </div>
                        {/* ---------- mail_count newest older popup start ---------- */}
                        <div className={showNewestOldestPopup ? "newestOlder_popup moreopts" : "newestOlder_popup lessopts"}>
                            <button disabled={inboxSortValue === -1} onClick={getNewestInboxData}>Newest</button>
                            <button disabled={inboxSortValue === 1} onClick={getOldestInboxData}>Oldest</button>
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
                                <ArrowDropDownOutlinedIcon ref={refThree} onClick={handleSplitPanePopup} />
                            </div>
                        </Tooltip>
                        {/* ---------- split pane mode popup start ---------- */}
                        <div className={showSplitPanePopup ? "splitPanemode_popup moreopts" : "splitPanemode_popup lessopts"}>
                            <p>No split</p>
                            <p>Vertical split</p>
                            <p>Horizontal split</p>
                        </div>
                        {/* ---------- split pane mode popup end ---------- */}
                        <Tooltip title="Input tools on/off (Ctrl-Shift-K)">
                            <div className="keyboard_icon">
                                <KeyboardIcon />
                                <ArrowDropDownOutlinedIcon />
                            </div>
                        </Tooltip>
                    </div>
                </div>
                {/* ------------ mainpage_sticky icons_section end ------------ */}

                {/* ------------- mainPage sticky header end ------------- */}
                <div className="sections_section">
                    <Link to='/main/' className={Object.keys(params).length === 0 ? 'primary_section borderBottom' : 'primary_section'}>
                        <InboxIcon />
                        <span>Primary</span>
                    </Link>
                    <Link to='/main/promotions/:promo' className={params.promo === ":promo" ? 'promotions_section borderBottom' : 'promotions_section'}>
                        <LocalOfferOutlinedIcon />
                        <span>Promotions</span>
                    </Link>
                    <Link to='/main/social/:social' className={params.social === ":social" ? 'social_section borderBottom' : 'social_section'}>
                        <PeopleAltOutlinedIcon />
                        <span>Social</span>
                    </Link>
                </div>
                {/* ------------- mainPage sticky sections_section start ------------- */}

            </div>
            {/* ------------- mainPage sticky sections_section end ------------- */}
            <div className="mailCard__container">
                <Outlet />
            </div>
        </div>
    )
}

export default InboxMails