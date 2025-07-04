import { PlanOfferCard } from "../ui/dashboard/plan-offer-card";
import ProgressCard from "../ui/dashboard/progress-card";
import { TasksCard } from "../ui/dashboard/tasks-card";
import { motion } from "framer-motion";
import { getDashboardStats } from "@/actions/dashboard/get-dashboard-stats-client";

export default async function Page() {
    let stats: any = null;
    try {
        stats = await getDashboardStats();
    } catch (e) {
        console.error(e);
    }

    const tasks = stats?.tasks ?? [
        {
            title: "Call with nutritionist",
            subtitle: "10 AM CST",
            id: "t1",
        },
        {
            title: "Follow coach instructions",
            subtitle: "Exercise post launch time",
            id: "t2",
        },
        {
            title: "Go, Go, Go!",
            subtitle: "Run for 2km and mark it done when you finish",
            id: "t3",
        },
    ];

    const weight = stats?.weight ?? {
        target: "73 kg",
        percent: 30,
        current: "89 kg",
    };

    const calories = stats?.calories ?? {
        target: "1900cal / week",
        percent: 70,
        current: "1500cal / week",
    };

    const water = stats?.water ?? {
        target: "15 / Day",
        percent: 10,
        current: "5 / Day",
    };

    return (
        <div className="h-full grid grid-cols-3 gap-2">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
                className="md:col-span-2 col-span-3"
            >
                <TasksCard tasks={tasks} />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0, 0.71, 0.2, 1.01] }}
                className="md:col-span-1 col-span-3"
            >
                <PlanOfferCard />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0, 0.71, 0.2, 1.01] }}
                className="md:col-span-1 col-span-3"
            >
                <ProgressCard
                    bcolor="bg-yellow-green-500"
                    tcolor="text-yellow-green-500"
                    target={weight.target}
                    percent={weight.percent}
                    currentProgress={weight.current}
                    title="Weight"
                />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0, 0.71, 0.2, 1.01] }}
                className="md:col-span-1 col-span-3"
            >
                <ProgressCard
                    bcolor="bg-jungle-green-600"
                    tcolor="text-jungle-green-600"
                    target={calories.target}
                    percent={calories.percent}
                    currentProgress={calories.current}
                    title="Daily Calories"
                />
            </motion.div>
            <div className="md:col-span-1 col-span-3">
                <ProgressCard
                    bcolor="bg-red-600"
                    tcolor="text-red-600"
                    target={water.target}
                    percent={water.percent}
                    currentProgress={water.current}
                    title="Water Glasses"
                />
            </div>
        </div>
    );
}
