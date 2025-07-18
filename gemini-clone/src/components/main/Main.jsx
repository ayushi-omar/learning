import { useContext } from 'react'
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Main = () => {
    const { onSent, input, setInput,
        recentPrompt, setRecentPrompt,
        prevPrompts, setPrevPrompts,
        showResult, setShowResult,
        loading, setLoading, resultData,
        setResultData } = useContext(Context);
    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="gemini icon" />
            </div>
            <div className='main-container'>
                {showResult ? <div className='result'>
                    <div className='result-title'>
                        <img src={assets.user_icon} alt="gemini icon" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className='result-data'>
                        <img src={assets.gemini_icon} alt="gemini icon" />
                        {loading ?
                            <div className='loader'>
                                <hr />
                                <hr />
                                <hr />
                            </div> :
                            <p dangerouslySetInnerHTML={{ __html: resultData }}></p>}

                    </div>
                </div> : <>
                    <div className='greet'>
                        <p>
                            <span>
                                Hello, dev.
                            </span>
                        </p>
                        <p>How can I help you today?</p>
                    </div>
                    <div className='cards'>
                        <div className='card'>
                            <p>suggest beautiful places to see on an upcoming road trip</p>
                            <img src={assets.compass_icon} alt="gemini icon" />
                        </div>
                        <div className='card'>
                            <p>Briefly summarize this concept: urban planning</p>
                            <img src={assets.bulb_icon} alt="gemini icon" />
                        </div>
                        <div className='card'>
                            <p>Brainstorm team bonding activities for our work retreat</p>
                            <img src={assets.message_icon} alt="gemini icon" />
                        </div>
                        <div className='card'>
                            <p>Improve the readability of the following code</p>
                            <img src={assets.code_icon} alt="gemini icon" />
                        </div>
                    </div>
                </>}

                <div className='main-bottom'>
                    <div className='search-box'>
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder='Enter a prompt here'
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="gallery icon" />
                            <img src={assets.mic_icon} alt="mic icon" />
                            {input && <img
                                src={assets.send_icon}
                                alt="send icon"
                                onClick={() => onSent()}
                            />}
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Gemini can make mistakes, so double-check it.
                    </p>

                </div>
            </div>

        </div>
    )
}

export default Main
