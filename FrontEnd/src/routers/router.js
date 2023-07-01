// import Home from "../pages/Home.js";
// import BuyBox from "../pages/BuyBox.js";
// import UnBox from "../pages/UnBox.js";
// import PlantFood from '../pages/PlantFood.js';
// import Admin from '../pages/Admin.js';
// import Account from '../pages/Account.js';
import Start from "../pages/Start";
import InfoUser from "../pages/InforUser";
import HomePage from "../pages/Home";
import AdminSessionPage from "../pages/AdminSession"
import AdminParticipants from "../pages/AdminParticipants"

const publicRoutes = [
    { path: '/', component: Start },
    { path: '/info', component: InfoUser },
    { path: '/home',component:HomePage},
    // { path: '/buybox',component: BuyBox },
    // { path: '/unbox', component: UnBox },
    // { path: '/plantfood', component: PlantFood},
    // { path: '/account', component: Account},
]; 


const privateRoutes = [
    { path: '/', component: Start},
    { path: '/admin/session', component: AdminSessionPage},
    { path: '/admin/participants', component:AdminParticipants },

];

export { publicRoutes, privateRoutes };