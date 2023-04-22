import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import SocketProvider from './socket/socketContext'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NewReviewPage from './pages/NewReview.page';
import EditReviewPage from './pages/EditReview.page'
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>
  },
  {
    path: "/new",
    element: <NewReviewPage/>
  },{
    path: "/edit/:id",
    element: <EditReviewPage />
  }
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Notifications/>
    <SocketProvider>
      <RouterProvider router={router}/>
    </SocketProvider>
    </MantineProvider>
  </React.StrictMode>
)
