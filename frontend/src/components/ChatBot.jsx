import React, { useState } from 'react'
import chatBot from '@/assets/chatbot.png'
import { motion } from "framer-motion"
import { RxCross2 } from "react-icons/rx";


const ChatBot = () => {
    const [show, setshow] = useState(false);

    const showBot = () => {
        setshow(true)
        const chatbot = document.getElementById('bot');
        chatbot.classList.remove('hidebot');
        chatbot.classList.add('showbot');
    }

    const hideBot = () => {
        setshow(false)
        const chatbot = document.getElementById('bot');
        chatbot.classList.remove('showbot');
        chatbot.classList.add('hidebot');
    }
    return (
        <div>
            <motion.div initial={{ scale: 1 }} animate={{ scale: [1.1, 1, 1.1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className=' fixed bottom-7 right-7 z-20 bg-gray-100 h-20 w-20 rounded-full border-green-600 border-2 cursor-pointer' onClick={showBot}>
                <img src={chatBot} alt="" className=' p-2 ' />
            </motion.div>
            {<div className={`z-30 w-[50vw] fixed top-0 right-0 transform transition-transform duration-700 ease-in-out ${!show ? 'translate-x-full' : "translate-x-0"}`} id=''>
                <div className=' relative'>
                    <div className=' absolute top-0 right-0 w-full h-12 border-b-[1px] border-gray-400 bg-zinc-900 z-40 text-2xl text-green-600 text-center p-1 font-semibold'>
                        Kishan Mitra
                    </div>
                    <button className=' absolute  top-3 right-3 text-2xl text-red-600 z-40 hover:text-[28px] duration-300 transition-transform cursor-pointer ' onClick={hideBot}><RxCross2 /></button>
                    <div className='fixed top-0 right-0 z-30 w-full'>
                        <iframe
                            src="https://cdn.botpress.cloud/webchat/v3.0/shareable.html?configUrl=https://files.bpcontent.cloud/2025/06/09/12/20250609120405-BA8A5KET.json"
                            title="Kishan Mitra Bot"
                            className="h-screen w-full"
                            style={{ border: "none" }}
                        />
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default ChatBot
