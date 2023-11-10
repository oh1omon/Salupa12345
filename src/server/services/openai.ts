/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import axios from 'axios';

import { ValidCreateMessageResponse, type TextCompletionResponse } from '~/types/openai';

// This function generates a valid chat message. Returns null if request is failed
export const generateValidChatMessage = async (
    prompt: string
): Promise<unknown | null> => {
    // Fetch chat message from OpenAI completion API, return null if request is failed
    try {
        const apiKey = process.env.OPENAI_API_KEY

        const { data } = await axios.post<TextCompletionResponse>(
            `https://api.openai.com/v1/completions`,
            {
                model: 'gpt-3.5-turbo-instruct',
                prompt: prompt,
                max_tokens: 3000,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        )

        // Check that completion API generated valid chat message, regenerate message if it's not valid
        try {
            const response = data.choices[0]?.text ?? null

            ValidCreateMessageResponse.parse(response)


            return response;
        } catch (error) {
            console.log(
                'Error while generating chat message. Most likely unappropriate response was generated, retrying...'
            )
            return await generateValidChatMessage(prompt)
        }
    } catch (error) {
        console.error('Unexpected error while fetching completion from OpenAI.')
        return null
    }
}
