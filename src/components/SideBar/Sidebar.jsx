import React, { useContext, useState } from 'react'

import { Context } from '../../context/context';
import { assets } from "../../assets/assets"

import './Sidebar.scss'



const Sidebar = () => {

    const [extented, setExtended] = useState(false);

    const {
        onSent,
        previousPrompts,
        setRecentPrompt,
        newChat
    } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

    return (
        <div className='sidebar'>

            <div className="top">
                <img
                    className='menu'
                    src={assets.menu_icon}
                    alt="MENU"
                    onClick={() => setExtended(previousValue => !previousValue)}
                />
                <div
                    className="new__chat"
                    onClick={() => newChat()}
                >
                    <img src={assets.plus_icon} alt="" />
                    {
                        extented ?
                            (
                                <p>
                                    New Chat
                                </p>
                            )
                            : null
                    }
                </div>

                {
                    extented ?
                        (
                            <div className="recent">
                                <p className='recent__title'>
                                    Recent
                                </p>
                                {
                                    previousPrompts.map((item, idx) => {
                                        return (
                                            <div
                                                className="recent__entry"
                                                key={idx}
                                                onClick={() => loadPrompt(item)}
                                            >
                                                <img src={assets.message_icon} alt="" />
                                                <p>
                                                    {item.slice(0, 18)} ...
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                        : null
                }
            </div>



            <div className="bottom">
                <div className="bottom__item recent__entry">
                    <img src={assets.question_icon} alt="" />
                    {
                        extented ?
                            (
                                <p>
                                    Help
                                </p>
                            ) : null
                    }
                </div>
                <div className="bottom__item recent__entry">
                    <img src={assets.history_icon} alt="" />
                    {
                        extented ?
                            (
                                <p>
                                    Activity
                                </p>
                            ) : null
                    }
                </div>
                <div className="bottom__item recent__entry">
                    <img src={assets.setting_icon} alt="" />
                    {
                        extented ?
                            (
                                <p>
                                    Setting
                                </p>
                            ) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar