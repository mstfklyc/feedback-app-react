import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/shared/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import About from "./pages/About";
import AboutIconLink from "./components/AboutIconLink";
import { FeedbackProvider } from "./context/FeedbackContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
    return (
        <FeedbackProvider>
            <ToastContainer autoClose={1000} />

            <Header text="hello world" />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <FeedbackForm />
                            <FeedbackStats />
                            <FeedbackList />
                        </>
                    }
                ></Route>
            </Routes>
            <Routes>
                <Route path="/about" element={<About />}>
                    {" "}
                    This is about route
                </Route>
            </Routes>

            <AboutIconLink />
        </FeedbackProvider>
    );
}
