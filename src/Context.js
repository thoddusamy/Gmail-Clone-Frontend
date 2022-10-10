import { createContext, useState } from 'react'

const ContextApi = createContext()

export const DataProvider = ({ children }) => {
    const [inboxMails, setInboxMails] = useState([])
    const [promoMails, setPromoMails] = useState([])
    const [socialMails, setSocialMails] = useState([])
    const [allMails, setAllMails] = useState([])
    const [dynamicMails, setDynamicMails] = useState([])
    const [starredMails, setStarredMails] = useState([])
    const [snoozedMails, setSnoozedMails] = useState([])
    const [sendMails, setSendMails] = useState([])
    const [importantMails, setImportantMails] = useState([])
    const [spamMails, setSpamMails] = useState([])
    const [trashMails, setTrashMails] = useState([])
    const [keyword, setKeyword] = useState('')

    return (
        <ContextApi.Provider
            value={{
                inboxMails,
                setInboxMails,
                promoMails,
                setPromoMails,
                socialMails,
                setSocialMails,
                allMails,
                setAllMails,
                dynamicMails,
                setDynamicMails,
                starredMails,
                setStarredMails,
                snoozedMails,
                setSnoozedMails,
                sendMails,
                setSendMails,
                importantMails,
                setImportantMails,
                spamMails,
                setSpamMails,
                trashMails,
                setTrashMails,
                keyword,
                setKeyword,
            }}
        >
            {children}
        </ContextApi.Provider>
    )
}

export default ContextApi
