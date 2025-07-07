"use client";
export type Task = {
    title: string;
    subtitle: string;
    id: string;
};
type Props = {
    tasks: Task[];
};

export function TasksList({ tasks }: Props) {
    return (
        <div className="gap-3 flex flex-col">
            {
                tasks.map(task => {
                    return (
                        <div key={task.id} className="w-full bg-gray-50 rounded-lg p-3 flex items-center gap-3">
                            <i className="bx bx-check-circle text-jungle-green-500"></i>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-800">{task.title}</span>
                                <span className="text-xs text-gray-500">{task.subtitle}</span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}