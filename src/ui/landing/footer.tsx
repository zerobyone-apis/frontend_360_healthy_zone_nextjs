import Logo from "@/ui/svgs/logo-360-healthy-zone.svg";

export function Footer() {
    return (
        <footer className="bg-white  m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <Logo className="text-4xl" width="none"></Logo>
                    </div>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Nutrition Plans</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center ">© 2023 <a href="https://creativelabs.dev/" className="hover:underline">Creative Labs™</a>. All Rights Reserved.</span>
            </div>
        </footer>
    )
}