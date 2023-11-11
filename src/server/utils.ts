// put utils here

export const constructQuestionPrompt = (input: string) => {
    const promptBase: string | null = process.env.OPEN_AI_PROMPT ?? null
    if (!promptBase) return null
    return promptBase + input
}