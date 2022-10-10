import React from 'react'
import './QuickSettings.css'
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AppsInGmailPng from '../../assets/appsingmail.png'
import DensityDefaultPng from '../../assets/density_default_png1.png'
import DensityComfortablePng from '../../assets/density_comfortable_png2.png'
import DensityCompactPng from '../../assets/density_compact_png3.png'
import InboxDefaultPng from '../../assets/Classic.png'
import InboxImportantFirstPng from '../../assets/Importantfirst.png'
import InboxUnreadFirstPng from '../../assets/Unreadfirst.png'
import InboxStartedFirstPng from '../../assets/Starredfirst.png'
import InboxPriorityInboxPng from '../../assets/Priorityinbox.png'
import InboxMultipleInboxesPng from '../../assets/MultipleInboxes.png'
import NosplitPng from '../../assets/Classic.png'
import RightOfinboxPng from '../../assets/rightofinbox.png'
import BelowInboxPng from '../../assets/belowinbox.png'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { quicksetting } from '../../action-creators/quickSetting'

const QuickSettings = () => {

    const quickSetting = useSelector(state => state.quicksetting.value)
    const dispatch = useDispatch();

    const ThemeImgs = [
        {
            imgId: 1,
            img: "https://res.cloudinary.com/dhx2kopxp/image/upload/v1663752746/natural-1_hg2zti.jpg",
            alt: "natural-pic-1"
        },
        {
            imgId: 2,
            img: "https://res.cloudinary.com/dhx2kopxp/image/upload/v1663752748/natural-8_gfdjve.jpg",
            alt: "natural-pic-2"
        },
        {
            imgId: 3,
            img: "https://res.cloudinary.com/dhx2kopxp/image/upload/v1663752756/natural-4_kf9x25.jpg",
            alt: "natural-pic-3"
        },
        {
            imgId: 4,
            img: "https://res.cloudinary.com/dhx2kopxp/image/upload/v1663752755/natural-7_nawcaj.jpg",
            alt: "natural-pic-4"
        },
        {
            imgId: 5,
            img: "https://res.cloudinary.com/dhx2kopxp/image/upload/v1663753453/natural-3_qhqgh3.jpg",
            alt: "natural-pic-5"
        },
        {
            imgId: 6,
            img: "https://res.cloudinary.com/dhx2kopxp/image/upload/v1663752744/natural-6_svag9x.jpg",
            alt: "natural-pic-6"
        },
        {
            imgId: 7,
            img: "https://res.cloudinary.com/dhx2kopxp/image/upload/v1663752755/natural-5_b0umvm.jpg",
            alt: "natural-pic-7"
        },
        {
            imgId: 8,
            img: "https://res.cloudinary.com/dhx2kopxp/image/upload/v1663752743/natural-2_sds56m.jpg",
            alt: "natural-pic-8"
        },
    ]

    const handleCloseQucikSettings = () => {
        quickSetting.value === false ? dispatch(quicksetting({ value: true })) : dispatch(quicksetting({ value: false }))

    }
    return (
        <div className={quickSetting.value ? "settings__container moreopts" : "settings__container lessopts"}>
            {/* ---------- Quick settings top start ---------- */}
            <div className="quicksetting_top">
                <div>
                    <p>Quick settings</p>
                    <IconButton onClick={handleCloseQucikSettings}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <button>See all settings</button>
            </div>
            {/* ---------- Quick settings top end ---------- */}

            {/* ---------- quicksettings_body start ---------- */}
            <div className="quicksettings_body__container">
                {/* ----- newgmail_view start ----- */}
                <div className='newgmail_view__box'>
                    <div>
                        <InfoOutlinedIcon />
                    </div>
                    <div>
                        <p>You're using the new Gmail view</p>
                        <a href="#">Go back to the original view</a>
                    </div>
                </div>
                {/* ----- newgmail_view end ----- */}

                {/* ----- appsingmail start ----- */}
                <div className="appsingmail_box">
                    <p>Apps in Gmail</p>
                    <div className='chatandmeet'>
                        <div>
                            <p>Chat and Meet</p>
                            <a href="#">Customize</a>
                        </div>
                        <img src={AppsInGmailPng} alt="appsingmailpng" />
                    </div>
                </div>
                {/* ----- appsingmail end ----- */}

                {/* ----- density_box start ----- */}
                <div className="density_box">
                    <p>Density</p>
                    <div className='radioBtns'>
                        <div>
                            <input type="radio" id='default_radio' name='density_radio' value="density_default" checked />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <label htmlFor="default_radio">Default</label>
                        </div>
                        <div>
                            <img src={DensityDefaultPng} alt="DensityDefaultPng" />
                        </div>
                    </div>
                    <div className='radioBtns'>
                        <div>
                            <input type="radio" id='comfortable_radio' name='density_radio' value="density_comfortable" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <label htmlFor="comfortable_radio">Comfortable</label>
                        </div>
                        <div>
                            <img src={DensityComfortablePng} alt="DensityDefaultPng" />
                        </div>
                    </div>
                    <div className='radioBtns'>
                        <div>
                            <input type="radio" id='compact_radio' name='density_radio' value="density_compact" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <label htmlFor="compact_radio">Compact</label>
                        </div>
                        <div>
                            <img src={DensityCompactPng} alt="DensityDefaultPng" />
                        </div>
                    </div>
                </div>
                {/* ----- density_box end ----- */}

                {/* ----- theme_box start ----- */}
                <div className="theme_box">
                    <div className='theme_heading'>
                        <p>Theme</p>
                        <a href="#">View all</a>
                    </div>
                    <div className="theme_imgs">
                        {ThemeImgs.map((image) => {
                            return <img key={image.imgId} src={image.img} alt={image.alt} />
                        })}
                    </div>
                </div>
                {/* ----- theme_box end ----- */}

                {/* ----- inbox_type start ----- */}
                <div className="inbox_type__box">
                    <p>Inbox type</p>
                    <div className='radioBtns'>
                        <div>
                            <input type="radio" id='inbox_default_radio' name='inboxtype_radio' value="inboxtype_default" checked />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <label htmlFor="inbox_default_radio">Default</label>
                        </div>
                        <div>
                            <img src={InboxDefaultPng} alt="InboxDefaultPng" />
                        </div>
                    </div>
                    <div className='radioBtns'>
                        <div>
                            <input type="radio" id='inbox_important_radio' name='inboxtype_radio' value="inboxtype_default" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <label htmlFor="inbox_important_radio">Important first</label>
                        </div>
                        <div>
                            <img src={InboxImportantFirstPng} alt="InboxImportantFirstPng" />
                        </div>
                    </div>
                    <div className='radioBtns'>
                        <div>
                            <input type="radio" id='inbox_unread_radio' name='inboxtype_radio' value="inboxtype_default" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <label htmlFor="inbox_unread_radio">Unread first</label>
                        </div>
                        <div>
                            <img src={InboxUnreadFirstPng} alt="InboxUnreadFirstPng" />
                        </div>
                    </div>
                    <div className='radioBtns'>
                        <div>
                            <input type="radio" id='inbox_starred_radio' name='inboxtype_radio' value="inboxtype_default" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <label htmlFor="inbox_starred_radio">Starred first</label>
                        </div>
                        <div>
                            <img src={InboxStartedFirstPng} alt="InboxStartedFirstPng" />
                        </div>
                    </div>
                    <div className='radioBtns'>
                        <div>
                            <input type="radio" id='inbox_priority_radio' name='inboxtype_radio' value="inboxtype_default" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <label htmlFor="inbox_priority_radio">Priority Inbox</label>
                        </div>
                        <div>
                            <img src={InboxPriorityInboxPng} alt="InboxPriorityInboxPng" />
                        </div>
                    </div>
                    <div className='radioBtns'>
                        <div>
                            <input type="radio" id='inbox_multiple_radio' name='inboxtype_radio' value="inboxtype_default" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <label htmlFor="inbox_multiple_radio">Multiple Inboxes</label>
                        </div>
                        <div>
                            <img src={InboxMultipleInboxesPng} alt="InboxMultipleInboxesPng" />
                        </div>
                    </div>
                </div>
                {/* ----- inbox_type end ----- */}

                {/* ----- reading_pane start ----- */}
                <div className="reading_pane__box">
                    <p>Reading pane</p>
                    <div className='radioBtns'>
                        <div>
                            <input type="radio" id='readingpane_nosplit_radio' name='readingpane_radio' value="readingpane_nosplit" checked />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <label htmlFor="readingpane_nosplit_radio">No split</label>
                        </div>
                        <div>
                            <img src={NosplitPng} alt="NosplitPng" />
                        </div>
                    </div>
                    <div className='radioBtns'>
                        <div>
                            <input type="radio" id='readingpane_rightofinbox_radio' name='readingpane_radio' value="readingpane_rightofinbox" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <label htmlFor="readingpane_rightofinbox_radio">Right of inbox</label>
                        </div>
                        <div>
                            <img src={RightOfinboxPng} alt="RightOfinboxPng" />
                        </div>
                    </div>
                    <div className='radioBtns'>
                        <div>
                            <input type="radio" id='readingpane_belowinbox_radio' name='readingpane_radio' value="readingpane_belowinbox" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <label htmlFor="readingpane_belowinbox_radio">Below inbox</label>
                        </div>
                        <div>
                            <img src={BelowInboxPng} alt="BelowInboxPng" />
                        </div>
                    </div>
                </div>
                {/* ----- reading_pane end ----- */}

                {/* ----- Email_threading start ----- */}
                <div className="email_threading__box">
                    <p>Email threading</p>
                    <div>
                        <input type="checkbox" id='conversation_view' />
                        <label htmlFor="conversation_view">Conversation view</label>
                        <Tooltip title="Groups emails of the same topic together">
                            <HelpOutlineOutlinedIcon />
                        </Tooltip>
                    </div>
                </div>
                {/* ----- Email_threading end ----- */}
            </div>
            {/* ---------- quicksettings_body end ---------- */}
        </div>
    )
}

export default QuickSettings