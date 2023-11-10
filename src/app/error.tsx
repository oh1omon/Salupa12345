'use client'

const Error = ({ error }: { error: Error }) => {
    return (
        <div>
            <h2>{error.message}</h2>
        </div>
    )
}

export default Error
