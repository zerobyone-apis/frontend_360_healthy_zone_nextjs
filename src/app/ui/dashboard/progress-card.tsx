import ProgressBar from "./progress-bar";
import clsx from "clsx";

type Props = {
	bcolor: string;
	tcolor: string;
	target: string;
	percent: number;
	title: string;
	currentProgress: string;
	icon?: string;
};

export default function ProgressCard({
	target,
	percent,
	bcolor,
	tcolor,
	currentProgress,
	title,
	icon,
}: Props) {
	return (
		<div className="h-[275px] flex justify-end flex-col w-full">
			<div className="w-full h-[237px] max-w-full max-h-full border rounded-3xl shadow-lg flex flex-col justify-around items-center bg-white">
				<div
					className={clsx(
						`rounded-3xl w-[92px] h-[83px] relative flex justify-center items-center -top-8`,
						bcolor
					)}
				>
					<i
						className={clsx(
							icon ? icon : "bx bx-run",
							"text-4xl font-bold text-white"
						)}
					></i>
				</div>
				<div className="">
					<h3 className={clsx("text-2xl font-bold text-center", tcolor)}>
						{title}
					</h3>
					<h5 className="text-4xl font-bold text-center">{currentProgress}</h5>
				</div>
				<footer className="w-[90%] justify-center flex flex-col p-1 gap-2">
					<ProgressBar bcolor={bcolor} tcolor={tcolor} percent={percent} />
					<p className="text-sm">Target: {target}</p>
				</footer>
			</div>
		</div>
	);
}
