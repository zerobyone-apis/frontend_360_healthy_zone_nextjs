import { TasksList, Task } from "./tasks-list";

type Props = {
    tasks: Task[];
};

export function TasksCard({ tasks }: Props) {
    return (
        <div className="w-full bg-white rounded-2xl shadow p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-jungle-green-500">My Tasks</h3>
                <span className="text-sm text-gray-500">{tasks.length} pending</span>
            </div>
            <div className="max-h-72 overflow-auto pr-1">
                <TasksList tasks={tasks} />
            </div>
            <div className="flex justify-end">
                <a href="#" className="text-sm text-jungle-green-600 hover:underline">View all</a>
            </div>
        </div>
    )
}

