import Image from "next/image";


export function Navbar() {
    return (
        <nav className="w-full h-[50px] p-3  justify-between content-center flex">
            <form >
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-200  " placeholder="Search chats, diets, ingredients, etc..." required />
                </div>
            </form>

            <div className="border-2 p-1 border-jungle-green-400 rounded-full w-10 h-10">
                <Image alt="imagen" width={288} height={288} className="rounded-full" src={"/profile.png"}></Image>
            </div>
        </nav >
    )
}