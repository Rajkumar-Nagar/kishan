"use client"

import { AddChat, getChats } from '@/actions/prompt.actions';
import InputBoxForAdd from '@/components/aiHelper/addMoreChat';
import { ChatGpt } from '@/components/skelton/skeltHomePage';
import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { aiAction } from '@/lib/redux/features';
import React, { Suspense, useEffect, useState } from 'react'

function page({ params }: { params: { chatid: string } }) {


    const [promptAns, setpromptAns] = useState("")
    const [allconversation, setallconversation] = useState([])
    const dispatch = useAppDispatch()

    const { conversation, chatSessionId, prompt } = useAppSelector((state) => state.ai)


    useEffect(() => {
        const handelchatdata = async () => {
            const chats = await getChats(params.chatid);
            console.log(chats)
            dispatch(aiAction.setconversation(chats?.conversation.prompts))
        }
        handelchatdata()
    }, [params.chatid])


    useEffect(() => {
        if (!(chatSessionId || prompt)) return;
        const setPrompt = async () => {
            console.log('useeffect call')
            const res = await AddChat(params.chatid, prompt)
            console.log(res)
            if (res?.createdPrompt) {
                setpromptAns(res?.createdPrompt.answer)
                dispatch(aiAction.addConversation(res?.createdPrompt))
                dispatch(aiAction.setPrompt(""));
                setpromptAns("")
            }
        }
        const timeout = setTimeout(setPrompt, 200);
        return () => clearTimeout(timeout)
    }, [prompt, params.chatid])


    console.log(JSON.stringify(conversation, null, 2))

    return (
        <div className="maincoantiner relative flex flex-col w-full">

            {
                conversation?.map((item, index) => (
                    <div className="flex-1 p-6 overflow-y-auto" key={index}>
                        <h1 className="text-3xl font-bold mb-8">{item.question}</h1>
                        <div className="bg-gray-700 p-4 rounded-lg mb-4">
                            <p>{item.answer}</p>
                        </div>
                    </div>
                ))
            }

            {
                prompt && !promptAns && <div className="flex-1 p-6 overflow-y-auto">
                    <h1 className="text-3xl font-bold mb-8">{prompt}</h1>
                    <ChatGpt />
                </div>
            }

            <InputBoxForAdd chatid={params.chatid} />
        </div>
    );
}

export default page