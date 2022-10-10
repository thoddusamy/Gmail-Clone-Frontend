import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Components/LoginPage/LoginPage';
import Promotions from './Components/MainPage/Promotions';
import MainPage from './Components/MainPage/MainPage';
import Primary from './Components/MainPage/Primary';
import Social from './Components/MainPage/Social';
import InboxMails from './Components/MainPage/InboxMails/InboxMails';
import StarredMails from './Components/MainPage/StarredMails/StarredMails'
import SnoozedMails from './Components/MainPage/SnoozedMails/SnoozedMails'
import SendMails from './Components/MainPage/SendMails/SendMails'
import MailOpenPage from './Components/MailOpenPage/MailOpenPage';
import { DataProvider } from './Context';
import ImportantMails from './Components/MainPage/ImportantMails/ImportantMails';
import Chats from './Components/MainPage/Chats/Chats'
import ScheduledMails from './Components/MainPage/ScheduledMails/ScheduledMails';
import Drafts from './Components/MainPage/Drafts/Drafts';
import AllMails from './Components/MainPage/AllMails/AllMails';
import SpamMails from './Components/MainPage/SpamMails/SpamMails';
import Trash from './Components/MainPage/Trash/Trash';
import SocialMails from './Components/MainPage/SocialMails/SocialMails';
import UpdatesMails from './Components/MainPage/UpdatesMails/UpdatesMails';
import Forums from './Components/MainPage/Forums/Forums';
import PromotionsMails from './Components/MainPage/PromotionsMails/PromotionsMails';

function App() {
  return (
    <div className="Main__container">
      <BrowserRouter>
        <DataProvider>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/main' element={<Navbar />}>
              <Route path='/main' element={<MainPage />}>
                <Route path='/main/:id' element={<MailOpenPage />} />
                <Route path='/main/starred/:star' element={<StarredMails />} />
                <Route path='/main/snoozed/:snooze' element={<SnoozedMails />} />
                <Route path='/main/send/:send' element={<SendMails />} />
                <Route path='/main/important/:important' element={<ImportantMails />} />
                <Route path='/main/chats/:chats' element={<Chats />} />
                <Route path='/main/scheduled/:scheduled' element={<ScheduledMails />} />
                <Route path='/main/draft/:draft' element={<Drafts />} />
                <Route path='/main/allmails/:allmails' element={<AllMails />} />
                <Route path='/main/spam/:spam' element={<SpamMails />} />
                <Route path='/main/trash/:trash' element={<Trash />} />
                <Route path='/main/socialmails/:socialmails' element={<SocialMails />} />
                <Route path='/main/updates/:updates' element={<UpdatesMails />} />
                <Route path='/main/forums/:forums' element={<Forums />} />
                <Route path='/main/promotionmails/:promotionmails' element={<PromotionsMails />} />
                <Route path='/main/' element={<InboxMails />}>
                  <Route path='/main/' element={<Primary />} />
                  <Route path='/main/promotions/:promo' element={<Promotions />} />
                  <Route path='/main/social/:social' element={<Social />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </DataProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
