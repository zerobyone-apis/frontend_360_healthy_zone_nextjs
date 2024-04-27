
import { PlanOfferCard } from '../../ui/dashboard/plan-offer-card'
import ProgressCard from '../../ui/dashboard/progress-card'
import { TasksCard } from '../../ui/dashboard/tasks-card'


export default function Page() {
    return (
        <div className='h-full grid grid-cols-3 gap-2'>
            <div className='md:col-span-2 col-span-3'>
                <TasksCard />
            </div>
            <div className='md:col-span-1 col-span-3'>
                <PlanOfferCard />
            </div>
            <div className="md:col-span-1 col-span-3">
                <ProgressCard bcolor="bg-yellow-green-500" tcolor="text-yellow-green-500" target="7km / week"
                    percent={30} currentProgress="5 km / week" title="Daily Running" />
            </div>
            <div className="md:col-span-1 col-span-3">
                <ProgressCard bcolor="bg-jungle-green-600" tcolor="text-jungle-green-600" target="1900cal / week"
                    percent={70} currentProgress="1500cal / week" title="Daily Calories" />
            </div>
            <div className="md:col-span-1 col-span-3">
                <ProgressCard bcolor="bg-red-600" tcolor="text-red-600" target="15 / Day"
                    percent={10} currentProgress="5 / Day" title="Water Glasses" />
            </div>
        </div>
    )
}