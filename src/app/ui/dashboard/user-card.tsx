import Image from "next/image";
import MenuDropdown from "../menu-dropdown";

type Props = {
    user: {
        id: string | number;
        first_name: string;
        last_name: string;
        city: string;
        country: string;
        description: string;
        client_status: string;
        diet: any[];
        trainings: any[];
        profile_picture: string;
    }
}

export function UserCard({ user }: Props) {
    const initials = user.first_name.split("")[0] + "." + user.last_name.split("")[0];

    return (
        <div className="text-sm leading-6">
            <figure className="relative flex flex-col-reverse bg-slate-100 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
                <blockquote className="mt-6 text-slate-700 dark:text-slate-300">
                    <p>{user.description || "This is a description"}</p>
                </blockquote>
                <figcaption className="flex items-center space-x-4">
                    <Image src={user.profile_picture || "/imgs/blank-profile-pic.jpeg"} alt={user.first_name + " picture profile"} width={56} height={56} className="flex-none w-14 h-14 rounded-full object-cover" />
                    <div className="flex-auto">
                        <div className="text-base text-slate-900 font-semibold dark:text-slate-200">
                            {initials}
                        </div>
                        <div className="mt-0.5 dark:text-slate-300">
                            {user.country}
                        </div>
                    </div>
                    <MenuDropdown items={[
                        { title: "New training", href: "?new-training=true&client-id=" + user.id },
                        { title: "View trainings", href: "/coach/dashboard/trainings/" + user.id },
                        { title: "Custom form", href: "?custom-form=true&client-id=" + user.id },
                        { title: "Current Progress", href: "/coach/dashboard/goals/" + user.id }]} />
                </figcaption>
            </figure>
        </div>
    )
}
