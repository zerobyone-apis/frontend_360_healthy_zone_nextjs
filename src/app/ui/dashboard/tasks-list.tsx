'use client'
type task = {
    title: string;
    subtitle: string;
    id: string;
}
type Props = {
    tasks: task[];
}

export function TasksList({ tasks }: Props) {
    console.log(tasks);

    return (
        <div className="gap-3 flex flex-col">
            {
                tasks.map(task => {
                    return (
                        <div key={task.id} className={'w-full min-h-[40px] bg-white rounded-xl p-2 flex gap-2 items-center'}>
                            <div className="bg-jungle-green-500 rounded-full w-10 h-10"></div>
                            <div className="">
                                <h3 className='text-base font-semibold'>{task.title}</h3>
                                <h5 className='text-sm font-light'>{task.subtitle}</h5>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}