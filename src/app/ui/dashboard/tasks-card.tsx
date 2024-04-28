import { TasksList } from "./tasks-list"

type Props = {}

export function TasksCard({ }: Props) {
    const tasks = [{
        title: "Call with nutritionist",
        subtitle: "10 AM CST",
        id: "2dmai2ad"
    },
    {
        title: "Follow coach instructions",
        subtitle: "Exercise post launch time",
        id: "2dmai2a2d"
    },
    {
        title: "Go, Go, Go!",
        subtitle: "Run for 2km and mark it done when you finish",
        id: "2dmai212313ad"
    }]
    return (
        <div className="w-full  bg-jungle-green-500 flex flex-col justify-center p-4 rounded-3xl shadow gap-2">
            <div className="w-full p-2 flex justify-between">
                <p className="font-light text-white">Pending tasks: <span className="font-bold">{tasks.length}</span></p>
                <p className="text-white">View All...</p>
            </div>
            <div className="w-[90%] h-full overflow-auto">
                <TasksList tasks={tasks} />
            </div>
        </div>
    )
}

