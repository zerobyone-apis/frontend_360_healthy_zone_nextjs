import { clsx } from "clsx"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
    placeholder?: string;
}

export default function InputField({ label, className, placeholder, ...rest }: Props) {
    return (
        <div className={clsx("mb-5", className)} >
            {label && <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
            <input {...rest} type="text" placeholder={placeholder} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-jungle-green-500 focus:border-jungle-green-500 block w-full p-2.5" />
        </div>
    )
}