import React from 'react'
import './SideBarRight.css'
import CalendarIcon from '../../assets/calendar-icon.svg'
import KeepIcon from '../../assets/keep-icon.svg'
import MapsIcon from '../../assets/maps-icon.svg'
import ContactIcon from '../../assets/contacts-icon.svg'
import { IconButton, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react'

const SideBarRight = () => {
    const [showSidePanel, setShowSidePanel] = useState(true)

    const sideBarRightIcon = [
        {
            id: 1,
            icon: CalendarIcon,
            alt: "calendar-icon",
            link: "https://calendar.google.com",
            title: "Calendar"
        },
        {
            id: 2,
            icon: KeepIcon,
            alt: "calendar-icon",
            link: "https://keep.google.com",
            title: "Keep"
        },
        {
            id: 3,
            icon: MapsIcon,
            alt: "calendar-icon",
            link: "https://www.google.co.in/maps",
            title: "Maps"
        },
        {
            id: 4,
            icon: ContactIcon,
            alt: "calendar-icon",
            link: "https://contacts.google.com",
            title: "Contacts"
        },
    ]

    const handleSidePanel = () => {
        showSidePanel === true ? setShowSidePanel(false) : setShowSidePanel(true)
    }
    return (
        <>
            <div className={showSidePanel ? 'sidebarright__container moreopts' : 'sidebarright__container lessopts'}>
                <div className='top'>
                    {
                        sideBarRightIcon.map((sideBarRight) => {
                            return (
                                <Tooltip title={sideBarRight.title} key={sideBarRight.id}>
                                    <IconButton>
                                        <a href={sideBarRight.link} target={"_blank"}>
                                            <img src={sideBarRight.icon} alt={sideBarRight.alt} />
                                        </a>
                                    </IconButton>
                                </Tooltip>
                            )
                        })
                    }
                </div>
                <div className='bottom'>
                    <div>
                        <Tooltip title="Get Add-ons">
                            <IconButton>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className={showSidePanel ? "bottom_icon_show" : "bottom_icon_hide"} onClick={handleSidePanel}>
                <Tooltip title={showSidePanel ? "Hide side panel" : "Show side panel"}>
                    <IconButton>
                        {
                            showSidePanel ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />
                        }
                    </IconButton>
                </Tooltip>
            </div>
        </>
    )
}

export default SideBarRight
