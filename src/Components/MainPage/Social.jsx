import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadingtext } from '../../action-creators/LoadingText'
import { mailcount } from '../../action-creators/mailCounts'
import { setcollectionname } from '../../action-creators/setCollectionName'
import { inboxsortvalue } from '../../action-creators/setInboxsort'
import { config } from '../../config'
import ContextApi from '../../Context'
import MailCard from '../MailCard/MailCard'

const Social = () => {

    const context = useContext(ContextApi)

    const inboxSortValue = useSelector(state => state.inboxsortvalue.value.numValue)
    const getKeyWord = context.keyword

    const dispatch = useDispatch()
    dispatch(mailcount({ count: context.socialMails.length }))
    dispatch(setcollectionname({ collectionName: "social" }))

    useEffect(() => {
        let social = async () => {
            try {
                dispatch(loadingtext({ isLoading: true }))
                let fetchSocialData = await axios.get(`${config.api}/main/social/${inboxSortValue}`);
                await context.setSocialMails(fetchSocialData.data)
                dispatch(loadingtext({ isLoading: false }))
            } catch (error) {
                console.log(error);
            }
        }
        social()
        return () => {
            dispatch(loadingtext({ isLoading: false }))
            if (inboxSortValue == 1) {
                dispatch(inboxsortvalue({ numValue: -1 }))
            }
        }
    }, [inboxSortValue])

    const filteredMails = context.socialMails.filter((fillMail) =>
        fillMail.title.toLowerCase().includes(getKeyWord) ||
        fillMail.subject.toLowerCase().includes(getKeyWord) ||
        fillMail.message.toLowerCase().includes(getKeyWord)
    )

    return (
        <div>
            {
                filteredMails.map((social) => {
                    return (
                        <MailCard social={social} key={social._id} />
                    )
                })
            }
        </div>
    )
}

export default Social