import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { config } from '../../config'
import MailCard from '../MailCard/MailCard'
import { mailcount } from '../../action-creators/mailCounts'
import { inboxcount } from '../../action-creators/inboxMailCount'
import { loadingtext } from '../../action-creators/LoadingText'
import ContextApi from '../../Context'
import { inboxsortvalue } from '../../action-creators/setInboxsort'
import { setcollectionname } from '../../action-creators/setCollectionName'

const Primary = () => {

    const context = useContext(ContextApi)

    document.title = `Inbox (${context.inboxMails.length}) - Gmail Clone`

    const inboxSortValue = useSelector(state => state.inboxsortvalue.value.numValue)
    const getKeyWord = context.keyword

    const dispatch = useDispatch()
    dispatch(mailcount({ count: context.inboxMails.length }))
    dispatch(inboxcount({ count: context.inboxMails.length }))
    dispatch(setcollectionname({ collectionName: "inbox" }))

    useEffect(() => {
        let inbox = async () => {
            try {
                dispatch(loadingtext({ isLoading: true }))
                let fetchInboxData = await axios.get(`${config.api}/main/inbox/${inboxSortValue}`);
                await context.setInboxMails(fetchInboxData.data)
                dispatch(loadingtext({ isLoading: false }))
            } catch (error) {
                console.log(error);
            }
        }
        inbox()
        return () => {
            dispatch(loadingtext({ isLoading: false }))
            if (inboxSortValue == 1) {
                dispatch(inboxsortvalue({ numValue: -1 }))
            }
        }
    }, [inboxSortValue])

    const filteredMails = context.inboxMails.filter((fillMail) =>
        fillMail.title.toLowerCase().includes(getKeyWord) ||
        fillMail.subject.toLowerCase().includes(getKeyWord) ||
        fillMail.message.toLowerCase().includes(getKeyWord)
    )

    return (
        <div>
            {filteredMails.map((inbox) => {
                return <MailCard inbox={inbox} key={inbox._id} />
            })}
        </div>
    )
}

export default Primary