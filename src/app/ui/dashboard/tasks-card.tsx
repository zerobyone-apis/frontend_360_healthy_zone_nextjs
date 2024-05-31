import { TasksList } from "./tasks-list"


type task = {
    title: string;
    subtitle: string;
    id: string;
    redirect: string;
}

type Props = { tasks?: task[]; }

export function TasksCard({ tasks }: Props) {
    // const tasks = [{
    //     title: "Active training",
    //     subtitle: "This is a current training description...",
    //     id: "2dmai2ad",
    //     redirect: "/"
    // },
    // {
    //     title: "Active diet",
    //     subtitle: "99 Por ejemplo, reemplazar los snacks poco saludables por opciones más nutritivas como frutas frescas, nueces o yogur griego, y reducir gradualmente el consumo de alimentos procesados",
    //     id: "2dmai2a2d",
    //     redirect: "/"
    // },
    // {
    //     title: "Current Goal",
    //     subtitle: "Reducir un 8% del fatiga al hacer ejercicios en los próximos seis meses de manera sostenible y saludable.",
    //     id: "2dmai212313ad",
    //     redirect: "/"
    // }]

    if (!tasks || tasks.length === 0) {
        return (
            <div className="w-full  bg-jungle-green-500 flex flex-col justify-center p-4 rounded-3xl shadow gap-2">
                <div className="w-[90%] h-full flex justify-center text-center items-center gap-2">
                    <i className="bx bx-ghost text-xl text-white"></i>
                    <h5 className="text-xl text-white">No Activities Pending</h5>
                </div>
            </div>)
    }

    return (
        <div className="w-full  bg-jungle-green-500 flex flex-col justify-center p-4 rounded-3xl shadow gap-2">
            <div className="w-full p-2 flex justify-start">
                <p className="font-light text-white">Activities: <span className="font-bold">{tasks.length}</span></p>
            </div>
            <div className="w-[90%] h-full overflow-auto">
                <TasksList tasks={tasks} />
            </div>
        </div>
    )
}

