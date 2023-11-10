export const getBaseUrl = () => {
    if (process.env.SERVER_URL) {
        return `https://${process.env.SERVER_URL}`
    }
    // assume localhost
    return `http://localhost:${process.env.PORT ?? 3000}`
}
