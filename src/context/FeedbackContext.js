import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [feedback, setFeedback] = useState([]);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    });

    useEffect(() => {
        fetchData()
    }, [])


    const fetchData = async () => {
        const response = await fetch(`http://localhost:5000/feedback`)
        const data = await response.json()
        setFeedback(data);
        setIsLoading(false)
    }


    // Add feedback
    const addFeedBack = async (newFeedBack) => {
        const response = await fetch('http://localhost:5000/feedback', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFeedBack)

        })

        const data = await response.json()
        setFeedback([data, ...feedback])
        toast("Feedback added successfully", { theme: "dark", type: "success" });
    };

    // Delete feedback
    const deleteFeedback = async (id) => {
        await fetch(`http://localhost:5000/feedback/${id}`, { method: "DELETE" })

        if (window.confirm("Are you sure you want to delete ? "))
            setFeedback(feedback.filter((item) => item.id !== id));
        toast("Deleted", { type: "error", autoclose: "1000" });
    };

    // Set item to be updated
    const editFeedback = async (item) => {
        await setFeedbackEdit({
            item,
            edit: true,
        });
    };

    // Update the item
    const updateFeedback = async (id, upItem) => {
        const response = await fetch(`http://localhost:5000/feedback/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",

            },
            body: JSON.stringify(upItem)
        })
        const data = await response.json()
        setFeedback(
            feedback.map((item) =>
                item.id === id ? { ...item, ...data } : { ...item }
            )
        );
        setFeedbackEdit({
            item: {},
            edit: false,
        });
        toast("Edited", { type: "success", autoClose: "1000" });
    };

    return (
        <FeedbackContext.Provider
            value={{
                feedback,
                deleteFeedback,
                addFeedBack,
                editFeedback,
                feedbackEdit,
                updateFeedback,
                setFeedback,
                isLoading,
            }}
        >
            {children}
        </FeedbackContext.Provider>
    );
};

export default FeedbackContext;
