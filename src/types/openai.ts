import { z } from "zod"

export interface TextCompletionResponse {
    id: string
    object: string
    created: number
    model: string
    choices: Choice[]
    usage: {
        prompt_tokens: number
        completion_tokens: number
        total_tokens: number
    }
}

export interface Choice {
    text: string
    index: number
    logprobs: null | string
    finish_reason: string
}

export const ValidCreateMessageResponse = z.string().min(10)