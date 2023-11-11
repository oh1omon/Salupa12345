import LoadingIcon from "./LoadingIcon"

const LoadingComponent = () => {
    return (
        <div className="bg-dark-gray h-full w-full rounded-3xl p-5">
            <div className="flex h-full w-full flex-col items-center justify-center gap-5">
                <LoadingIcon />
                <h1>Searching for an opponent</h1>
            </div>
        </div>
    )
}

export default LoadingComponent
