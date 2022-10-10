import React, { useState, useEffect, useRef } from 'react'
import axios from "axios"
import './Navbar.css'
import MenuIcon from '@mui/icons-material/Menu'
import GmailLogo from '../../assets/gmail-logo.png'
import { Avatar, IconButton, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import AppsIcon from '@mui/icons-material/Apps'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ProfileImage from '../../assets/profile_img.jpg'
import { config } from '../../config'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useDispatch, useSelector } from 'react-redux'
import { quicksetting } from '../../action-creators/quickSetting'
import SideBarLeft from '../SideBarLeft/SideBarLeft'
import SideBarRight from '../SideBarRight/SideBarRight'
import MailSendBox from '../MailSendBox/MailSendBox'
import { Outlet, useNavigate } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google';
import { userinfo } from '../../action-creators/userInfo'
import { useContext } from 'react'
import ContextApi from '../../Context'

const Navbar = () => {

    const context = useContext(ContextApi)

    const quickSetting = useSelector(state => state.quicksetting.value)
    const setSearchBarInputValue = useSelector(state => state.setsearchbarvalue.value.inputValue)
    const dispatch = useDispatch();

    const navigate = useNavigate()
    const userInfoData = useSelector(state => state.userinfo.value)

    let getUserInfo = localStorage.getItem("user")

    useEffect(() => {
        if (!getUserInfo) {
            navigate('/')
        }
        let userInfo = JSON.parse(getUserInfo)
        dispatch(userinfo({ name: userInfo.name, email: userInfo.email, img: userInfo.picture }))
    }, [])

    const [showSupportPopup, setShowSupportPopup] = useState(false)
    const [showAppsPopup, setShowAppsPopup] = useState(false)
    const [showGoogleAccPopup, setShowGoogleAccPopup] = useState(false)

    const [navbarTopApps, setNavbarTopApps] = useState([])
    const [navbarMiddleApps, setNavbarMiddleApps] = useState([])

    const handleSupportPopup = () => {
        showSupportPopup === false ? setShowSupportPopup(true) : setShowSupportPopup(false);
    }

    const handleGoogleAccPopup = () => {
        showGoogleAccPopup === false ? setShowGoogleAccPopup(true) : setShowGoogleAccPopup(false);
    }

    const handleQuickSetting = () => {
        quickSetting.value === false ? dispatch(quicksetting({ value: true })) : dispatch(quicksetting({ value: false }))
    }


    // ------------- handle navbar appspopup start -------------
    const handleAppsPopup = () => {
        showAppsPopup === false ? setShowAppsPopup(true) : setShowAppsPopup(false);

        let navabarTopapps = async () => {
            try {
                let getData = await axios.get(`${config.api}/main/navbar_appspopup_topapps`)
                setNavbarTopApps(getData.data);

            } catch (error) {
                console.log(error);
            }
        }
        navabarTopapps()

        let navabarMiddleapps = async () => {
            try {
                let getData = await axios.get(`${config.api}/main/navbar_appspopup_middleapps`)
                setNavbarMiddleApps(getData.data);

            } catch (error) {
                console.log(error);
            }
        }
        navabarMiddleapps()
    }
    // ------------- handle navbar appspopup end -------------

    // ------------- detect outside click start -------------
    const refOne = useRef(null)
    const refTwo = useRef(null)
    const refThree = useRef(null)

    useEffect(() => {
        document.addEventListener("click", handleDetectOutsideClick1, true)
    }, [])

    const handleDetectOutsideClick1 = (e) => {
        if (!refOne.current.contains(e.target)) {
            setShowSupportPopup(false)
        }
    }
    useEffect(() => {
        document.addEventListener("click", handleDetectOutsideClick2, true)
    }, [])

    const handleDetectOutsideClick2 = (e) => {
        if (!refTwo.current.contains(e.target)) {
            setShowAppsPopup(false)
        }
    }
    useEffect(() => {
        document.addEventListener("click", handleDetectOutsideClick3, true)
    }, [])

    const handleDetectOutsideClick3 = (e) => {
        if (!refThree.current.contains(e.target)) {
            setShowGoogleAccPopup(false)
        }
    }
    // ------------- detect outside click end -------------

    const handleChange = (e) => {
        context.setKeyword(e.target.value.toLowerCase());
    }

    const handleLogoutGoogleAcc = () => {
        googleLogout();
        localStorage.clear()
        navigate('/')
    }

    return (
        <>
            <div className='navbar__container'>
                <div className='left'>
                    <div>
                        <Tooltip title='Main menu'>
                            <IconButton>
                                <MenuIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div>
                        <img src={GmailLogo} alt='gmail-logo' title='Gmail' />
                    </div>
                </div>
                <div className='middle'>
                    <div className='search_div' style={{}}>
                        <div>
                            <Tooltip title='Search'>
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div>
                            <input type='search' placeholder={setSearchBarInputValue} onChange={(e) => handleChange(e)} />
                        </div>
                        <div>
                            <Tooltip title='Show search options'>
                                <IconButton>
                                    <TuneIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='icons_div'>
                        <div className='support_icon'>
                            <Tooltip title='Support'>
                                <IconButton ref={refOne} onClick={handleSupportPopup}>
                                    <HelpOutlineIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                        {/* ---------- Navbar Support Popup start ---------- */}
                        <div className={showSupportPopup ? "support_popupbox moreopts" : "support_popupbox lessopts"}>
                            <a href="#" onClick={handleSupportPopup}>
                                <p>Help</p>
                            </a>
                            <a onClick={handleSupportPopup} href="https://support.google.com/a/users/answer/9259748?visit_id=1661432044549-6525971089995834544&p=gmail_training&rd=1" target={"_blank"}>
                                <p>Training</p>
                            </a>
                            <a href="#" onClick={handleSupportPopup}>
                                <p>Updates</p>
                            </a>
                            <a href="#" onClick={handleSupportPopup}>
                                <p>Send feedback to Google</p>
                            </a>
                        </div>
                        {/* ---------- Navbar Support Popup end ---------- */}
                        <div>
                            <Tooltip title='Settings' onClick={handleQuickSetting}>
                                <IconButton>
                                    <SettingsOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip title='Google apps'>
                                <IconButton ref={refTwo} onClick={handleAppsPopup}>
                                    <AppsIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                        {/* ---------- Navbar Apps Popup start ---------- */}
                        <div className={showAppsPopup ? "apps_popup moreopts" : "apps_popup lessopts"}>
                            <div className='apps_top'>
                                {
                                    navbarTopApps.map((app) => {
                                        return (
                                            <a href={app.link} target={'_blank'}>
                                                <img src={app.icon} alt={app.alt} />
                                                <span>{app.title}</span>
                                            </a>
                                        )
                                    })
                                }
                            </div>
                            <div className='apps_middle'>
                                {
                                    navbarMiddleApps.map((app) => {
                                        return (
                                            <a href={app.link} target={'_blank'}>
                                                <img src={app.icon} alt={app.alt} />
                                                <span>{app.title}</span>
                                            </a>
                                        )
                                    })
                                }
                            </div>
                            <div className='apps_bottom'>
                                <a href="https://workspace.google.com/marketplace?pann=ogb" target={'_blank'}>
                                    <button>
                                        More from Google Workspace <br /> Marketplace
                                    </button>
                                </a>
                            </div>
                        </div>
                        {/* ---------- Navbar Apps Popup end ---------- */}

                        <div>
                            <Tooltip title="Google Account">
                                <IconButton ref={refThree} onClick={handleGoogleAccPopup}>
                                    <Avatar alt="profile-pic" src={userInfoData.img}
                                        sx={{ width: 35, height: 35 }} />
                                </IconButton>
                            </Tooltip>
                        </div>
                        {/* ---------- Navbar GoogleAccount popup start ---------- */}
                        <div className={showGoogleAccPopup ? "googleaccount_popup moreopts" : "googleaccount_popup lessopts"}>
                            <div className='profile_pic__section'>
                                <img src={userInfoData.img} alt="profile-pic" />
                                <p>{userInfoData.name}</p>
                                <p>{userInfoData.email}</p>
                                <button>Manage your Google Account</button>
                            </div>

                            <div className='add_account__section'>
                                <PersonAddAltIcon />
                                <a href="https://accounts.google.com/v3/signin/identifier?dsh=S-1425359769%3A1663595094937712&continue=https%3A%2F%2Fmail.google.com&ec=GAlAFw&hl=en&service=mail&flowName=GlifWebSignIn&flowEntry=AddSession" target={"_blank"}>
                                    Add another account</a>
                            </div>

                            <div className='signout__section'>
                                <button onClick={handleLogoutGoogleAcc}>Sign out</button>
                            </div>

                            <div className='terms_policy__section'>
                                <a href="https://policies.google.com/privacy?hl=en" target={"_blank"}>Privacy Policy</a> •
                                <a href="https://policies.google.com/terms?hl=en" target={"_blank"}>Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SideBarLeft />
            <SideBarRight />
            <Outlet />
            <MailSendBox />
        </>
    )
}

export default Navbar
