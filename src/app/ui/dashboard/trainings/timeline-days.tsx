import { DayExercises } from '@/interfaces/trainings';
import { TrainingTimeLinePillStyles } from '@/use-cases/trainings-styles';
import clsx from 'clsx';


interface TimeLineDaysProps {
    exercises: DayExercises[]
}

export default function TimeLineDays({ exercises }: TimeLineDaysProps) {
    return (
        <div className='max-w-full overflow-auto flex gap-1'>
            {exercises.map((exercise, index) => <TimeLinePill key={index} status={exercise.status} number_of_day={exercise.number_of_day} />)}
        </div>
    )
}

function TimeLinePill({ status, number_of_day }: DayExercises) {
    return (
        <div className={clsx('rounded-full w-[36px] h-[46px] flex flex-col justify-center text-center text-xs', TrainingTimeLinePillStyles[status].pill)}>
            <span className={clsx(TrainingTimeLinePillStyles[status].text)}>DAY</span>
            <span className={clsx(TrainingTimeLinePillStyles[status].text, "font-bold")}>{number_of_day}</span>
        </div>
    )
}