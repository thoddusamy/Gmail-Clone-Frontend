import React, { useEffect, useRef, useState } from 'react'
import './Forums.css'
import { useDispatch, useSelector } from 'react-redux'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { Tooltip } from '@mui/material';
import { inputvalue } from '../../../action-creators/SetSearchBarValue';

const Forums = () => {

    const quickSetting = useSelector(state => state.quicksetting.value)

    document.title = `Forums - Gmail Clone`

    const dispatch = useDispatch()

    dispatch(inputvalue({ inputValue: 'category:forums' }))

    const [showSplitPanePopup, setShowSplitPanePopup] = useState(false)
    const [showMorePopup, setShowMorePopup] = useState(false)

    const refOne = useRef()
    const refTwo = useRef()

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
            setShowSplitPanePopup(false)
        }
    }

    const handleMorePopup = () => {
        showMorePopup === false ? setShowMorePopup(true) : setShowMorePopup(false)
    }

    const handleSplitPanePopup = () => {
        showSplitPanePopup === false ? setShowSplitPanePopup(true) : setShowSplitPanePopup(false)
    }

    return (
        <div className='forums__container' style={quickSetting.value ? { width: "912px" } : { width: "80%" }}>
            <div className="forumsSticky_top">
                <div className="bottom_icons">
                    <div className="icons_section forums_b_bottom">
                        <div className="iconSection_left">
                            <Tooltip title="Select">
                                <div className="checkbox_icon">
                                    <input type="checkbox" />
                                    <ArrowDropDownIcon />
                                </div>
                            </Tooltip>
                            <div className="refresh_icon" onClick={() => window.location.reload()}>
                                <Tooltip title="Refresh">
                                    <RefreshOutlinedIcon className='iconButton_hoverEffect' />
                                </Tooltip>
                            </div>
                            <div className="more_icon" ref={refOne} onClick={handleMorePopup}>
                                <Tooltip title="More">
                                    <MoreVertIcon className='iconButton_hoverEffect' />
                                </Tooltip>
                            </div>
                            <div className={showMorePopup ? "morePopupForums moreopts" : "morePopupForums lessopts"}>
                                <button onClick={() => setShowMorePopup(false)}>Mark all as read</button>
                                <hr />
                                <p>Select messages to see more actions</p>
                            </div>
                        </div>
                        <div className="iconSection_right">
                            <Tooltip title="Toggle split pane mode">
                                <div className="split_icon">
                                    <HorizontalSplitIcon />
                                    <ArrowDropDownIcon ref={refTwo} onClick={handleSplitPanePopup} />
                                </div>
                            </Tooltip>
                            {/* ---------- split pane mode popup start ---------- */}
                            <div className={showSplitPanePopup ? "splitPanemode_popupForums moreopts" : "splitPanemode_popupForums lessopts"}>
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
        </div>
    )
}

export default Forums