import { Prompt } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AiState {
    chatSessionId: string;
    conversation: Prompt[];
    prompt: string;
}

const initialState: AiState = {
    chatSessionId: "",
    conversation: [],
    prompt: ""
}

const aiSlice = createSlice({
    name: "ai",
    initialState,
    reducers: {
        setchatSessionId: (state, action) => {
            state.chatSessionId = action.payload
        },
        addConversation: (state, action) => {
            state.conversation.push(action.payload)
        },
        setconversation: (state, action) => {
            state.conversation = action.payload
        },
        setPrompt: (state, action) => {
            state.prompt = action.payload
        },

    }
})

export const aiAction = aiSlice.actions;
export const aiSliceReducer = aiSlice.reducer