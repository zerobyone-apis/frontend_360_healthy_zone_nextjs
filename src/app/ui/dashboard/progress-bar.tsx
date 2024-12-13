import { clsx } from "clsx";


type Props = {
    percent: number | string;
    bcolor?: string;
    tcolor: string;
}

export default function ProgressBar({ percent = 45, bcolor, tcolor }: Props) {
    return (
        <div className="w-full">
            <div className={clsx(" justify-between flex mb-2 w-full", tcolor)}>
                <p >Progress</p> <p>{percent}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className={clsx(bcolor, "h-2.5 rounded-full")} style={{ width: percent + "%" }}></div>
            </div>
        </div>
    )
}