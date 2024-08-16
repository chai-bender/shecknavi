import ReactDOM from 'react-dom/client'
// Bringing in the required imports from 'react-router-dom' to set up application routing behavior
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import App from './App';
import Home from './pages/Home';
import Exhibits from './pages/Exhibits';
import Ethereal from './pages/Ethereal';
import Nature from './pages/Nature';
import Urban from './pages/Urban';
import Login from './pages/Login';
import Signup from './pages/Signup';
// Define the accessible routes, and which components respond to which URL
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/Exhibits',
        element: <Exhibits />
      },
      {
        path: '/Ethereal',
        element: <Ethereal />
      },
      {
        path: '/Nature',
        element: <Nature />
      },
      {
        path: '/Urban',
        element: <Urban />
      },
      {
        path: '/Login',
        element: <Login />
      },
      {
        path: '/Signup',
        element: <Signup />
      },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
