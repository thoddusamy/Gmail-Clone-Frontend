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

const Promotions = () => {

    const context = useContext(ContextApi)

    const inboxSortValue = useSelector(state => state.inboxsortvalue.value.numValue)
    const getKeyWord = context.keyword

    const dispatch = useDispatch()
    dispatch(mailcount({ count: context.promoMails.length }))
    dispatch(setcollectionname({ collectionName: "promotions" }))

    useEffect(() => {
        let promotions = async () => {
            try {
                dispatch(loadingtext({ isLoading: true }))
                let fetchPromotionsData = await axios.get(`${config.api}/main/promotions/${inboxSortValue}`);
                await context.setPromoMails(fetchPromotionsData.data)
                dispatch(loadingtext({ isLoading: false }))
            } catch (error) {
                console.log(error);
            }
        }
        promotions()
        return () => {
            dispatch(loadingtext({ isLoading: false }))
            if (inboxSortValue == 1) {
                dispatch(inboxsortvalue({ numValue: -1 }))
            }
        }
    }, [inboxSortValue])

    const filteredMails = context.promoMails.filter((fillMail) =>
        fillMail.title.toLowerCase().includes(getKeyWord) ||
        fillMail.subject.toLowerCase().includes(getKeyWord) ||
        fillMail.message.toLowerCase().includes(getKeyWord)
    )

    return (
        <div>
            {
                filteredMails.map((promotions) => {
                    return (
                        <MailCard promotions={promotions} key={promotions._id} />
                    )
                })
            }
        </div>
    )
}

export default Promotions