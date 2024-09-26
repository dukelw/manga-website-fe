const routes = {
  updateSlider: "/update/slider/:id",
  addSlider: "/slider/add",
  sliders: "/management/collection/:collection",
  chapter: "/manga/:slug/:chapter",
  manga: "/manga/:slug",
  search: "/search/:keySearch",
  signup: "/signup",
  history: "/history",
  popular: "/popular",
  new: "/new",
  specificGenre: "/genres/:genreID",
  genres: "/genres",
  signin: "/signin",
  managementSlider: "/management/collection",
  profile: "/profile/:id",
  account: "/account/:id",
  home: "/",
  notFound: "*",
};

export default routes;
