import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import styled from 'styled-components';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./app/store";
import ProtectedRoute from "./routes/protectedRoute";
import Home from "./containers/Home";
import Inbox from "./containers/Inbox";
import Compose from "./containers/Compose";
import Sent from "./containers/Sent";
import Archive from "./containers/Archive";
import Profile from "./containers/Profile";
import Login from "./containers/Login";
import Logout from "./containers/Logout";
import NotFound from "./containers/NotFound";

import Footer from './containers/Footer';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: auto 10vh;
  padding: 1rem 1rem 0 1rem;

  background-color: lightsalmon;
`;

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Container>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  element={
                    <main style={{ padding: "1rem" }}>
                      <p>Choose a mailbox</p>
                    </main>
                  }
                />
                <Route path="inbox" element={ <Inbox /> } />
                <Route path="compose" element={ <Compose /> } />
                <Route path="sent" element={ <Sent /> } />
                <Route path="archive" element={ <Archive /> } />
                <Route path="profile" element={ <Profile /> } />
              </Route>
              <Route path="/login" element={ <Login /> }></Route>
              <Route path="/logout" element={ <Logout /> }></Route>
              <Route path="*" element={ <NotFound /> }></Route>
            </Routes>
          </BrowserRouter>
          <Footer />
        </Container>
      </PersistGate>
    </Provider>
  );
};

export default App;
