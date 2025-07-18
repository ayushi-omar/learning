import { useState, useContext } from 'react'
import './Sidebar.css';
import { assets } from '../../assets/assets.js';
import { Context } from '../../context/context.jsx';


const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPromt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    }
    return (
        <div className="sidebar">
            <div className='top'>
                <img className='menu' src={assets.menu_icon} alt="menu icon" onClick={() => setExtended(prev => !prev)} />
                <div className='new-chat' onClick={newChat}>
                    <img className='logo' src={assets.plus_icon} alt="gemini icon" />
                    {extended && <p>New chat</p>}
                </div>
                {extended && <div className='recent'>
                    <p className='recent-title'>Recent</p>
                    {prevPrompts.map((prompt, index) => (
                        <div key={index} className='recent-entry' onClick={() => loadPromt(prompt)}>
                            <img src={assets.message_icon} alt="icon" />
                            <p>{prompt.slice(0, 18)}...</p>
                        </div>
                    ))}
                </div>}
            </div>
            <div className='bottom'>
                <div className='bottom-item recent-entry'>
                    <img src={assets.question_icon} alt="question icon" />
                    {extended && <p>Help</p>}
                </div>
                <div className='bottom-item recent-entry'>
                    <img src={assets.history_icon} alt="bulb icon" />
                    {extended && <p>Activity</p>}
                </div>
                <div className='bottom-item recent-entry'>
                    <img src={assets.setting_icon} alt="gallery icon" />
                    {extended && <p>Settings</p>}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
