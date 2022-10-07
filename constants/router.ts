import NoFooter from "../components/Layout/NoFooter";
import BasicLayout from "../components/Layout";
import NoLayout from "../components/Layout/NoLayout";

interface Router {
  pathName: string;
  role?: string[];
  layout: any;
  redirect?: string;
  title?: string
}

export const publishRouter: Array<Router> = [
  {
    pathName: "/signup",
    layout: NoFooter,
  },
  {
    pathName: "/login",
    layout: NoFooter,
  },
];

export const privateRouter: Array<Router> = [

];

export const routerNotLogin: Array<Router> = [
  {
    pathName: "/",
    layout: BasicLayout,
    title: 'pageTitle'
  },
  {
    pathName: "/404",
    layout: NoFooter,
    title: 'notFound'
  }
];
