import { Navigate } from "react-router-dom";
import App from "./App";
import Login from "./modules/auth/pages/Login/Login";
import SignUp from "./modules/auth/pages/SignUp/SignUp";
import Dashboard from "./modules/dashboard/pages";
import NotificationTempalateDetailsPage, {
  loader as NotificationTempalateDetailsLoader,
} from "./modules/notifications/pages/NotificationTempalateDetailsPage";
import NotificationTemplatesPage from "./modules/notifications/pages/NotificationTemplatesPage";
import NotificationPage from "./modules/notifications/pages/NotificationsPage";
import Products from "./modules/products/pages/Products";
import Restaurants from "./modules/restaurants/pages/Restaurants";
import Users from "./modules/users/pages/Users";
import ErrorPage from "./pages/ErrorPage";
import Ingredients from "./modules/ingredients/pages/Ingredients";
import Categories from "./modules/categories/pages/Categories";
import DashboardSettings from "./modules/dashboard/pages/DashboardSettings";


const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const MustNotProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
            <Dashboard />
        ),
        children: [
          {
            path: "settings",
            element: <DashboardSettings />,
          }
        ]
      },
      {
        path: "users",
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },

      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },

      {
        path: "restaurants",
        element: (
          <ProtectedRoute>
            <Restaurants />
          </ProtectedRoute>
        ),
      },

      {
        path: "ingredients",
        element: (
          <ProtectedRoute>
            <Ingredients />
          </ProtectedRoute>
        ),
      },

      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },

      {
        path: "notifications",
        element: (
          <ProtectedRoute>
            <NotificationPage />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "templates",
            element: <NotificationTemplatesPage />,
            children: [
              {
                path: ":templateSlug",
                element: <NotificationTempalateDetailsPage />,
                loader: NotificationTempalateDetailsLoader,
              },
            ],
          },
        ],
      },

      {
        path: "login",
        element: (
          <MustNotProtectedRoute>
            <Login />
          </MustNotProtectedRoute>
        ),
      },

      {
        path: "signup",
        element: (
          <MustNotProtectedRoute>
            <SignUp />
          </MustNotProtectedRoute>
        ),
      },
    ],
  },
];

export default routes;
