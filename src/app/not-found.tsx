import Logo from "@/app/ui/svgs/logo-360-healthy-zone-white.svg"

export default function NotFound() {
    return (
        <div className="fixed top-0 left-0 z-50 h-full p-4 w-full max-w-full bg-jungle-green-500">
            <div className="flex justify-center items-center h-full w-full flex-col">
                <Logo width="none" className="text-6xl"></Logo>
                <h1 className="text-3xl text-white font-bold">404 Site not found</h1>
                <span className='text-xl text-white font-sans font-semibold'>Not </span>
            </div>
        </div>
    )
}