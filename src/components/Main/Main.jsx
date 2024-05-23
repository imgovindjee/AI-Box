import React, { useContext } from 'react'

import { assets } from '../../assets/assets'
import { Context } from '../../context/context.jsx'
import Loader from '../Loader/Loader.jsx'

import "./Main.scss"



const Main = () => {

    const {
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResults,
        loading,
        resultData,
        setInput,
        input
    } = useContext(Context)


    // Helper function in order to display results
    const RenderHTML = (props) => (
        <p
            dangerouslySetInnerHTML={{ __html: props.HTML }}>
        </p>
    )

    // function to handle the API-CALL using "prompt" passing 
    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

    return (
        <div className='main'>
            <div className="nav">
                <div className='logo__Name'>
                    <img className='logo' src={assets.AI_Box_logo} alt="" />
                    <p>
                        AI Box
                    </p>
                </div>
                <img src={assets.user_icon} alt="" />
            </div>

            <div className="main__container">
                {
                    !showResults ? (
                        <>
                            <div className="greet">
                                <p>
                                    <span>
                                        Hello, QWERTY.
                                    </span>
                                </p>
                                <p>
                                    How Can i Help you today?
                                </p>
                            </div>

                            <div className="cards">
                                <div
                                    className="card"
                                    onClick={() => loadPrompt("Suggest Me Some Beautiful places in the world to Visit.")}
                                >
                                    <p>
                                        Suggest Me Some Beautiful places in the world to Visit.
                                    </p>
                                    <img src={assets.compass_icon} alt="" />
                                </div>
                                <div
                                    className="card"
                                    onClick={() => loadPrompt("Top 10 World Heightest Mountains Name?")}
                                >
                                    <p>
                                        Top 10 World Heightest Mountains Name?
                                    </p>
                                    <img src={assets.bulb_icon} alt="" />
                                </div>
                                <div
                                    className="card"
                                    onClick={() => loadPrompt("Latest Update on the World Politices Drama and Governance.")}
                                >
                                    <p>
                                        Latest Update on the World Politices Drama and Governance.
                                    </p>
                                    <img src={assets.message_icon} alt="" />
                                </div>
                                <div
                                    className="card"
                                    onClick={() => loadPrompt("Latest Update on the AI-TOOLS ...")}
                                >
                                    <p>
                                        Latest Update on the AI-TOOLS ....
                                    </p>
                                    <img src={assets.code_icon} alt="" />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='results'>
                            <div className="results__title">
                                <img src={assets.user_icon} alt="" />
                                <p>
                                    {recentPrompt}
                                </p>
                            </div>
                            <div className="results__data">
                                <img src={assets.gemini_icon} alt="" style={{ backgroundColor: "#e6eaf1" }} />
                                {
                                    loading ? (
                                        <Loader />
                                    ) : (
                                        // {/* {resultData} */ }
                                        <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                        // {/* <RenderHTML HTML={resultData} /> */}
                                    )
                                }
                            </div>
                        </div>
                    )
                }



                <div className="main__bottom">
                    <div className="search__box">
                        <input
                            type="text"
                            placeholder='Enter a prompt Here!!'
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                        />
                        <div className='search__box__icons'>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {
                                input && (
                                    <img
                                        src={assets.send_icon}
                                        alt=""
                                        onClick={() => onSent()}
                                    />
                                )
                            }
                        </div>
                    </div>
                    <p className='bottom__info'>
                        AI Box may display inaccurate info, including about people. so double-check its responses. Your privacy and AI Box
                    </p>
                </div>
            </div>
        </div >
    )
}

export default Main
