import config from "../../src/config";

// Pages
import HomePage from "../pages/HomePage";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import Account from "../pages/Account";
import Management from "../pages/Management";
import CreateSlider from "../pages/CreateSlider";
import Collections from "../pages/Collections";
import Sliders from "../pages/Sliders";
import Users from "../pages/Users";
import UpdateSlider from "../pages/UpdateSlider";
import NotFound from "../pages/NotFound";
import Chapter from "../pages/Chapter";
import Manga from "../pages/Manga";
import Popular from "../pages/Popular";
import Genres from "../pages/Genres";
import SpecificGenre from "../pages/SpecificGenre";
import New from "../pages/New";

const publicRoutes = [
  { path: config.routes.signin, component: Signin, layout: null },
  { path: config.routes.signup, component: Signup, layout: null },
  { path: config.routes.home, component: HomePage },
  { path: config.routes.history, component: History },
  { path: config.routes.document, component: Document },
  { path: config.routes.notFound, component: NotFound },
  { path: config.routes.chapter, component: Chapter },
  { path: config.routes.manga, component: Manga },
  { path: config.routes.popular, component: Popular },
  { path: config.routes.specificGenre, component: SpecificGenre },
  { path: config.routes.genres, component: Genres },
  { path: config.routes.new, component: New },
];

const privateRoutes = [
  {
    type: "admin",
    path: config.routes.management,
    component: Management,
  },
  {
    type: "admin",
    path: config.routes.addSlider,
    component: CreateSlider,
  },
  {
    type: "admin",
    path: config.routes.updateSlider,
    component: UpdateSlider,
  },
  {
    type: "admin",
    path: config.routes.managementSlider,
    component: Collections,
  },
  {
    type: "admin",
    path: config.routes.sliders,
    component: Sliders,
  },
  {
    type: "admin",
    path: config.routes.managementUser,
    component: Users,
  },
  {
    type: "admin",
    path: config.routes.profile,
    component: Profile,
  },
  {
    type: "admin",
    path: config.routes.account,
    component: Account,
  },
  {
    type: "user",
    path: config.routes.account,
    component: Account,
  },
  {
    type: "user",
    path: config.routes.profile,
    component: Profile,
  },
];

export { publicRoutes, privateRoutes };
