import { configureStore } from '@reduxjs/toolkit'
import QuickSettingReducer from './action-creators/quickSetting'
import CloseMailSendBoxReducer from './action-creators/closeMailSendBox'
import AlertDialogReducer from './action-creators/AlertDialog'
import MailCountsReducer from './action-creators/mailCounts'
import InboxCountReducer from './action-creators/inboxMailCount'
import InboxSortValueReducer from './action-creators/setInboxsort'
import LoadingTextReducer from './action-creators/LoadingText'
import SetCollectionNameReducer from './action-creators/setCollectionName'
import SetSearchBarValueReducer from './action-creators/SetSearchBarValue'
import UserInfoReducer from './action-creators/userInfo'
import SpamDialogReducer from './action-creators/SpamDialog'
import DeleteDialogReducer from './action-creators/DeleteDialog'

const store = configureStore({
    reducer: {
        quicksetting: QuickSettingReducer,
        closesendbox: CloseMailSendBoxReducer,
        alertdialog: AlertDialogReducer,
        mailcounts: MailCountsReducer,
        inboxmailscount: InboxCountReducer,
        inboxsortvalue: InboxSortValueReducer,
        loadingtext: LoadingTextReducer,
        setcollectionname: SetCollectionNameReducer,
        setsearchbarvalue: SetSearchBarValueReducer,
        userinfo: UserInfoReducer,
        spamdialog: SpamDialogReducer,
        deletedialog: DeleteDialogReducer
    }
})


export default store