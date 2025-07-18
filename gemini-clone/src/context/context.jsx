import { createContext, useState } from "react";
import runChat from '../config/gemini';

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
        // return new Promise((resolve) => {
        //     // Adjust the delay as needed
        // });
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        // setInput("");
        // setRecentPrompt("");    
    }


    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response = "";
        if (prompt !== undefined) {
            response = await runChat(prompt);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompts((prev) => [...prev, input]);
            setRecentPrompt(input);
            response = await runChat(input);
        }
        // setRecentPrompt(input);
        // setPrevPrompts((prev) => [...prev, input]);
        let responseArray = response.split("**");
        let formatedResponse = '';
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                formatedResponse += responseArray[i];
                // newArray.push(responseArray[i].trim());
                // responseArray[i].trim() !== "")
            } else {
                formatedResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse = formatedResponse.split("*").join("</br>");
        let newArray = newResponse.split(" ");
        for (let i = 0; i < newArray.length; i++) {
            await delayPara(i, newArray[i] + " ");
        }
        // setResultData(newResponse);
        setLoading(false);
        setInput("");
        // Handle the response as needed
    };
    // onSent("what is reactjs?");

    const contextValue = { onSent, input, setInput, recentPrompt, setRecentPrompt, prevPrompts, setPrevPrompts, showResult, setShowResult, loading, setLoading, resultData, setResultData, newChat };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;