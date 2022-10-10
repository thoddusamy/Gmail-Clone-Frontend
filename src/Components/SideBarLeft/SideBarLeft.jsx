import React from 'react'
import './SideBarLeft.css'
import { IconButton, Tooltip } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import InboxIcon from '@mui/icons-material/Inbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SendIcon from '@mui/icons-material/Send';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LabelImportantTwoToneIcon from '@mui/icons-material/LabelImportantTwoTone';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ScheduleSendOutlinedIcon from '@mui/icons-material/ScheduleSendOutlined';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import EmailIcon from '@mui/icons-material/Email';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import ReportIcon from '@mui/icons-material/Report';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import GroupIcon from '@mui/icons-material/Group';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InfoIcon from '@mui/icons-material/Info';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import SellIcon from '@mui/icons-material/Sell';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux'
import { closemailsendbox } from '../../action-creators/closeMailSendBox'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'

const SideBarLeft = () => {

    const params = useParams()

    const openMailSendPopup = useSelector(state => state.closesendbox.value.isClose)
    const inboxMailsCount = useSelector(state => state.inboxmailscount.value.count)
    const getCollectionName = useSelector(state => state.setcollectionname.value.collectionName)

    const dispatch = useDispatch();

    const [showMore, setShowMore] = useState(false)
    const [showCategory, setShowCategory] = useState(false)

    const handleMore = () => {
        showMore === false ? setShowMore(true) : setShowMore(false)
    }

    const handleCategoriesMore = () => {
        showCategory === false ? setShowCategory(true) : setShowCategory(false)
    }

    const handleOpenMailSendBox = () => {
        if (openMailSendPopup === false) {
            dispatch(closemailsendbox({ isClose: true }))
        }
    }

    return (
        <div className='sidebar__container'>
            <div className="sidebar_compose">
                <button onClick={handleOpenMailSendBox}>
                    <div>
                        <EditOutlinedIcon />
                    </div>
                    <div>Compose</div>
                </button>
            </div>
            <Tooltip title="Inbox" placement='right'>
                <Link to='/main' className={getCollectionName == "inbox"
                    || getCollectionName == "promotions" || getCollectionName == "social" ? 'sidebar_card active' : 'sidebar_card'}
                    onClick={() => setShowMore(false)}>
                    <div className="left_side">
                        <span>
                            {
                                getCollectionName == "inbox"
                                    || getCollectionName == "promotions" || getCollectionName == "social" ? <InboxIcon /> : <InboxOutlinedIcon />
                            }
                        </span>
                        <span>
                            Inbox
                        </span>
                    </div>
                    <div className="right_side">
                        <span>{inboxMailsCount}</span>
                    </div>
                </Link>
            </Tooltip>

            <Tooltip title="Starred" placement='right'>
                <Link to='/main/starred/:star' className={getCollectionName == "starred_mails" ? 'sidebar_card active' : 'sidebar_card'}
                    onClick={() => setShowMore(false)}>
                    <div className="left_side">
                        <span>
                            {getCollectionName == "starred_mails" ? <StarIcon /> : <StarBorderIcon />}
                        </span>
                        <span>
                            Starred
                        </span>
                    </div>
                </Link>
            </Tooltip>

            <Tooltip title="Snoozed" placement='right'>
                <Link to='/main/snoozed/:snooze' className={getCollectionName == "snoozed_mails" ? 'sidebar_card active' : 'sidebar_card'}
                    onClick={() => setShowMore(false)}>
                    <div className="left_side">
                        <span>
                            {getCollectionName == "snoozed_mails" ? <AccessTimeFilledIcon /> : <AccessTimeIcon />}
                        </span>
                        <span>
                            Snoozed
                        </span>
                    </div>
                </Link>
            </Tooltip>

            <Tooltip title="Send" placement='right'>
                <Link to='/main/send/:send' className={getCollectionName == "send_mails" ? 'sidebar_card active' : 'sidebar_card'}
                    onClick={() => setShowMore(false)}>
                    <div className="left_side">
                        <span>
                            {getCollectionName == "send_mails" ? <SendIcon /> : <SendOutlinedIcon />}
                        </span>
                        <span>
                            Send
                        </span>
                    </div>
                </Link>
            </Tooltip>

            <div className='sidebar_card' onClick={handleMore}>
                <div className="left_side">
                    <span>
                        {
                            showMore ? <ExpandLessIcon /> : <ExpandMoreIcon />
                        }
                    </span>
                    <span>
                        {
                            showMore ? "Less" : "More"
                        }
                    </span>
                </div>
            </div>

            <div className={showMore ? "sidebarmore__container moreopts" : "sidebarmore__container lessopts"}>
                <Tooltip title="Important" placement='right'>
                    <Link to='/main/important/:important' className={getCollectionName == "important_mails" ? 'sidebar_card active' : 'sidebar_card'}>
                        <div className="left_side">
                            <span>
                                {getCollectionName == "important_mails" ? <LabelImportantIcon /> : <LabelImportantTwoToneIcon />}
                            </span>
                            <span>
                                Important
                            </span>
                        </div>
                    </Link>
                </Tooltip>

                <Tooltip title="Chats" placement='right'>
                    <Link to='/main/chats/:chats' className={params.chats === ':chats' ? 'sidebar_card active' : 'sidebar_card'}>
                        <div className="left_side">
                            <span>
                                <ChatOutlinedIcon />
                            </span>
                            <span>
                                Chats
                            </span>
                        </div>
                    </Link>
                </Tooltip>

                <Tooltip title="Scheduled" placement='right'>
                    <Link to='/main/scheduled/:scheduled' className={params.scheduled === ':scheduled' ? 'sidebar_card active' : 'sidebar_card'}>
                        <div className="left_side">
                            <span>
                                {params.scheduled === ':scheduled' ? <ScheduleSendIcon /> : <ScheduleSendOutlinedIcon />}
                            </span>
                            <span>
                                Scheduled
                            </span>
                        </div>
                    </Link>
                </Tooltip>

                <Tooltip title="Drafts" placement='right'>
                    <Link to='/main/draft/:draft' className={params.draft === ':draft' ? 'sidebar_card active' : 'sidebar_card'}>
                        <div className="left_side">
                            <span>
                                {params.draft === ':draft' ? <DescriptionIcon /> : <DescriptionOutlinedIcon />}
                            </span>
                            <span>
                                Drafts
                            </span>
                        </div>
                    </Link>
                </Tooltip>

                <Tooltip title="All Mail" placement='right'>
                    <Link to='/main/allmails/:allmails' className={getCollectionName == "allmails" ? 'sidebar_card active' : 'sidebar_card'}>
                        <div className="left_side">
                            <span>
                                {getCollectionName == "allmails" ? <EmailIcon /> : <EmailOutlinedIcon />}
                            </span>
                            <span>
                                All Mail
                            </span>
                        </div>
                    </Link>
                </Tooltip>

                <Tooltip title="Spam" placement='right'>
                    <Link to='/main/spam/:spam' className={getCollectionName == "spam_mails" ? 'sidebar_card active' : 'sidebar_card'}>
                        <div className="left_side">
                            <span>
                                {getCollectionName == "spam_mails" ? <ReportIcon /> : <ReportOutlinedIcon />}
                            </span>
                            <span>
                                Spam
                            </span>
                        </div>
                    </Link>
                </Tooltip>

                <Tooltip title="Trash" placement='right'>
                    <Link to='/main/trash/:trash' className={getCollectionName == "trash_mails" ? 'sidebar_card active' : 'sidebar_card'}>
                        <div className="left_side">
                            <span>
                                {getCollectionName == "trash_mails" ? <DeleteIcon /> : <DeleteOutlineOutlinedIcon />}
                            </span>
                            <span>
                                Trash
                            </span>
                        </div>
                    </Link>
                </Tooltip>

                <Tooltip title="Categories" placement='right'>
                    <div className='sidebar_card' onClick={handleCategoriesMore}>
                        <div className="left_side">
                            <span>
                                {
                                    showCategory ? <ArrowDropDownIcon /> : <ArrowRightIcon />
                                }
                            </span>
                            <span>
                                Categories
                            </span>
                        </div>
                    </div>
                </Tooltip>

                <div className={showCategory ? "sidebarmore-categories__container moreopts" : "sidebarmore-categories__container lessopts"}>
                    <Tooltip title="Social" placement='right'>
                        <Link to='/main/socialmails/:socialmails'
                            className={params.socialmails === ':socialmails' ? 'sidebar_card indent active' : 'sidebar_card indent'}>
                            <div className="left_side">
                                <span>
                                    {params.socialmails === ':socialmails' ? <GroupIcon /> : <GroupOutlinedIcon />}
                                </span>
                                <span>
                                    Social
                                </span>
                            </div>
                        </Link>
                    </Tooltip>

                    <Tooltip title="Updates" placement='right'>
                        <Link to='/main/updates/:updates'
                            className={params.updates === ':updates' ? 'sidebar_card indent active' : 'sidebar_card indent'}>
                            <div className="left_side">
                                <span>
                                    {params.updates === ':updates' ? <InfoIcon /> : <InfoOutlinedIcon />}
                                </span>
                                <span>
                                    Updates
                                </span>
                            </div>
                        </Link>
                    </Tooltip>

                    <Tooltip title="Forums" placement='right'>
                        <Link to='/main/forums/:forums'
                            className={params.forums === ':forums' ? 'sidebar_card indent active' : 'sidebar_card indent'}>
                            <div className="left_side">
                                <span>
                                    {params.forums === ':forums' ? <QuestionAnswerIcon /> : <QuestionAnswerOutlinedIcon />}
                                </span>
                                <span>
                                    Forums
                                </span>
                            </div>
                        </Link>
                    </Tooltip>

                    <Tooltip title="Promotions" placement='right'>
                        <Link to='/main/promotionmails/:promotionmails'
                            className={params.promotionmails === ':promotionmails' ? 'sidebar_card indent active' : 'sidebar_card indent'}>
                            <div className="left_side">
                                <span>
                                    {params.promotionmails === ':promotionmails' ? <SellIcon /> : <SellOutlinedIcon />}
                                </span>
                                <span>
                                    Promotions
                                </span>
                            </div>
                        </Link>
                    </Tooltip>
                </div>
                <Tooltip title="Manage labels" placement='right'>
                    <div className='sidebar_card'>
                        <div className="left_side">
                            <span>
                                <SettingsOutlinedIcon />
                            </span>
                            <span>
                                Manage labels
                            </span>
                        </div>
                    </div>
                </Tooltip>

                <Tooltip title="Create new label" placement='right'>
                    <div className='sidebar_card'>
                        <div className="left_side">
                            <span>
                                <AddIcon />
                            </span>
                            <span>
                                Create new label
                            </span>
                        </div>
                    </div>
                </Tooltip>
            </div>

            <div className="sidebar__label">
                <div>
                    <span>Labels</span>
                    <span>
                        <Tooltip title="Create new label">
                            <IconButton>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </span>
                </div>
            </div>
        </div >
    )
}

export default SideBarLeft
