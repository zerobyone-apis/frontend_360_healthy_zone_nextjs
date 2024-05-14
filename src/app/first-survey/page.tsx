'use client'
import { useRouter } from "next/navigation";
import { SURVEY_PAGES } from "../ui/mind-logger/libs/questions"
import { Survey } from "../ui/mind-logger/survey"

export default function Page() {
    const router = useRouter();

    const onSubmit = (values: any) => {
        console.log(values)
        alert("redirect")
        router.push("/")
    }
    return <Survey pages={SURVEY_PAGES} onSubmit={onSubmit} />
}
