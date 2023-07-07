import "./App.css";
import { createContext, useState } from "react";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import NavBar from "./components/NavBar";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";

// CALL IT ONCE IN YOUR APP
if (typeof window !== "undefined") {
  injectStyle();
}

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_GQL_API,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("access_token");
  const lang = JSON.parse(localStorage.getItem("lang"));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      language:lang
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const LanguagesContext = createContext();
export const AuthUserContext = createContext();

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const langs = [
    {
      language_code: "en",
    },
    {
      language_code: "ar",
    },
    {
      language_code: "tr",
    },
    {
      language_code: "ru",
    },
    {
      language_code: "sp",
    },
  ];

  const [auth_user, setAuthUser] = useState(user);

  return (
    <>
      <ApolloProvider client={client}>
        <LanguagesContext.Provider value={langs}>
          <AuthUserContext.Provider value={auth_user}>
            <header>
              <NavBar auth_user={auth_user} />
            </header>

            <main className="
             sm:max-w-screen-sm 
             md:max-w-screen-md 
             lg:max-w-screen-lg
             xl:max-w-screen-xl
             2xl:max-w-screen-2xl
             mx-auto my-5 
             text-gray-500 ">
              <Outlet />
            </main>
          </AuthUserContext.Provider>
        </LanguagesContext.Provider>
        <ToastContainer />
      </ApolloProvider>
    </>
  );
}

export default App;
