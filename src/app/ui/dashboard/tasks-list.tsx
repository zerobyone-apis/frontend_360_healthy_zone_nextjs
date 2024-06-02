import Link from "next/link";

type task = {
    title: string;
    subtitle: string;
    id: string;
    redirect: string;
}
type Props = {
    tasks: task[];
}

export function TasksList({ tasks }: Props) {
    return (
        <div className="gap-3 flex flex-col">
            {
                tasks.map((task, index: number) => {
                    return (
                        <Link key={index} href={task.redirect}>
                            <div key={task.id} className={'w-full min-h-[40px] bg-white rounded-xl p-2 flex gap-2 items-center'}>
                                <div className="w-full">
                                    <h3 className='text-base font-semibold'>{task.title}</h3>
                                    <h5 className='text-sm font-light truncate'>{task.subtitle}</h5>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}