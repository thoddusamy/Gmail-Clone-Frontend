import React from 'react'
import './MainPage.css'
import { Outlet } from 'react-router-dom'
import QuickSettings from '../QuickSettings/QuickSettings'
import { useSelector } from 'react-redux'

const MainPage = () => {
    const loading = useSelector(state => state.loadingtext.value.isLoading)
    return (
        <>
            <div className={loading ? "loading_text moreopts" : "loading_text lessopts"}>
                Loading...
            </div>
            <div className='mainpage__cointainer'>
                <Outlet />
            </div>
            <QuickSettings />
        </>
    )
}

export default MainPage