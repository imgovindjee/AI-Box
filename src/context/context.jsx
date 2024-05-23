import { createContext, useState } from "react";

import run from "../config/AI_Box/AI_Box";


// context creator
export const Context = createContext();


// contextProvider
const ContextProvider = (props) => {

    // updating the values... 
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("")
    const [previousPrompts, setPreviousPrompts] = useState([])
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")



    // helping to create the typing effect
    // setting the Data
    const delayParagraph = (index, nextWord) => {
        setTimeout(() => {
            setResultData(previous => previous + nextWord);
        }, 75 * index);
    }


    // making the CHAT-AI icon enable
    const newChat = () => {
        setLoading(false)
        setShowResults(false)
        setResultData("")
    }



    // fetching the data from the API and Storing it
    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResults(true)

        let response;
        if (prompt !== undefined) {
            setPreviousPrompts(prev => [...prev, prompt])
            response = await run(prompt);
            setRecentPrompt(prompt)
        } else {
            setPreviousPrompts(prev => [...prev, input])
            setRecentPrompt(input)
            response = await run(input)
        }

        // DATA RETRIVAL FROM GOOGLE-API getting the raw-response
        // console.log(response)

        // making the raw-response into some optimal one using the "**"
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>"
            }
        }

        // again making the change newResponse into some new Format
        let newResponse2 = newResponse.split('*').join("</br>")

        // setResultData(newResponse2)
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayParagraph(i, nextWord + " "); // setting up the response over here
        }

        setLoading(false)
        setInput("")
    }

    // onSent("What is ReactJS?");



    // exporting the context
    const contextValue = {
        previousPrompts,
        setPreviousPrompts,
        recentPrompt,
        setRecentPrompt,
        onSent,
        showResults,
        loading,
        input,
        setInput,
        resultData,
        newChat
    }



    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider