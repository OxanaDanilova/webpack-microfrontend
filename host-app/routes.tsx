import {RouteObject} from "react-router-dom";
import Home from "./src/pages/Home";
import NotFound from "./src/pages/NotFound";
import Task from "./src/pages/Task";
import Layout from "./src/pages/Layout";
import About from "./src/pages/About";
import Contact from "./src/pages/Contact";
import {lazy, Suspense} from "react";

const RemoteApp = lazy(() => import('remote/RemoteApp'));

const RemoteAppContainer = () => {
  return   <div style={{width: '100%'}}>
              <Suspense fallback={<div>Loading ...</div>}>
                <RemoteApp/>
              </Suspense>
          </div>
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout/>,
    children: [
      {index: true, element: <Home/>},
      {path: 'about', element: <About/>},
      {path: 'contact', element: <Contact/>},
      {path: 'task', element: <Task/>},
      {path: 'remote/*', element: <RemoteAppContainer/>},
      {path: '*', element: <NotFound/>},
    ],
  },
];

export default routes;
