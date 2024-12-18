import { Routes, Route } from "react-router-dom";
import Header from "./base/Header/Header";
import Footer from "./base/Footer";
import Config from "./component/Config";
import { Suspense, lazy } from "react";
import ErrorBoundary from "./component/ErrorBoundary";

const Home = lazy(() => import("./base/Home/Home"));
const About = lazy(() => import("./modules/About"));
const Advert = lazy(() => import("./modules/Advert"));
const Contact = lazy(() => import("./modules/Contact"));
const Donation = lazy(() => import("./modules/Donation"));
const Podcast = lazy(() => import("./modules/Podcast"));
const Schedule = lazy(() => import("./modules/Schedule"));
const Missing = lazy(() => import("./modules/Missing"));

function App() {
  const PATH = Config.Path;
  const Loading = () => (
    <main className="main main--loading">
      <span className="loader" aria-live="polite"></span>
    </main>
  );

  return (
    <ErrorBoundary>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />

          <Route
            path={PATH.about}
            element={
              <Suspense fallback={<Loading />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path={PATH.advert}
            element={
              <Suspense fallback={<Loading />}>
                <Advert />
              </Suspense>
            }
          />
          <Route
            path={PATH.contact}
            element={
              <Suspense fallback={<Loading />}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path={PATH.donation}
            element={
              <Suspense fallback={<Loading />}>
                <Donation />
              </Suspense>
            }
          />
          <Route
            path={PATH.podcast}
            element={
              <Suspense fallback={<Loading />}>
                <Podcast />
              </Suspense>
            }
          />
          <Route
            path={PATH.schedule}
            element={
              <Suspense fallback={<Loading />}>
                <Schedule />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <Missing />
              </Suspense>
            }
          />
        </Routes>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
