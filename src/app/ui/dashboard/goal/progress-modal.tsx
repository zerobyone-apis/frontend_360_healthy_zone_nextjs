import { postProffesionalFeedback } from '@/actions/progress/professionalFeedback';
import { GoalResponseDTO, ProgressResponseDTO } from '@/interfaces';
import clsx from 'clsx';
import { Accordion, Alert, Avatar, Badge, Button, Label, Modal, RangeSlider, Rating, Textarea } from 'flowbite-react'
import React, { ReactElement, useEffect, useState } from 'react'
import { HiArrowUturnLeft } from "react-icons/hi2";
import { toast } from 'react-toastify';


type Props = {
    open: boolean;
    handleCloseFn: () => void;
    goal: GoalResponseDTO;
    progress: ProgressResponseDTO;
    professionalView: boolean;
}

export default function ProgressModal({ open = false, handleCloseFn, goal, progress, professionalView }: Props) {

    const [comment, setComment] = useState("");
    const [goalPercentage, setGoalPercentage] = useState(goal.isCompleted ? "100" : goal.percentage || "0");
    const [fatPercentage, setFatPercentage] = useState(progress.current_body_fat_percentage || "0");

    let stars = [];
    const level = {
        "EXELENTE": 5,
        "BIEN": 4,
        "MAS_O_MENOS": 3,
        "MAL": 2,
        "MUY_MAL": 1,
    }

    const levelName = {
        "EXELENTE": "Exellent",
        "BIEN": "Good",
        "MAS_O_MENOS": "So so...",
        "MAL": "Bad",
        "MUY_MAL": "Very bad",
    }

    for (let i = 1; i <= 5; i++) {
        stars.push(level[progress.satisfaction_level] < i ? <Rating.Star filled={false} key={i} /> : <Rating.Star key={i} filled={true} />)
    }

    const handleUpdateComment = async () => {
        if (!comment) {
            return toast.warning("Add a feedback comment");
        }

        try {
            await postProffesionalFeedback({
                client_id: progress.client_id,
                goal_id: goal.id,
                client_progress_id: progress.id,
                comment,
                current_body_fat_percentage: Number(fatPercentage),
                general_goal_percentage: Number(goalPercentage)
            });
            toast.success("Feedback has been send successfully");
            setTimeout(() => {
                window.location.reload();
            }, 300);

        } catch (e) {
            toast.error("Something went wrong");
        }

    }


    return (
        <Modal show={open} onClose={handleCloseFn}>
            <Modal.Header>
                <p>Progress</p>
                <Rating>
                    {stars}
                    <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{levelName[progress.satisfaction_level]}</p>
                </Rating>

            </Modal.Header>
            <Modal.Body>
                <div className="space-y-3">
                    <p className="text-xs text-gray-500">
                        Progress sent: {formatDate(progress.created_on)}
                    </p>
                    <ProgressPhotos pics={progress.advace_pictures_uris_form} />
                    <div className="flex flex-wrap gap-2">
                        <Badge icon={undefined} size='md'>{progress.current_weight} KG</Badge>
                        <Badge icon={undefined} size='md'>{progress.initial_height} CM</Badge>
                        {progress.current_body_fat_percentage && <Badge icon={undefined} size='md'>Fat {progress.current_body_fat_percentage || "0"}%</Badge>}
                    </div>
                    <div className="flex items-start flex-col w-full bg-gray-200 border border-gray-300 p-3 rounded-lg">
                        <div className="inline-flex w-full items-center mb-4">
                            <span className="inline-flex items-center mr-3 text-sm text-gray-500 dark:text-white font-semibold gap-2" >
                                <Avatar rounded size='sm' />
                                {professionalView ? "Customer comment" : "Me"}
                            </span>
                        </div>
                        <p className="text-base leading-relaxed text-gray-500 ml-5">
                            {progress.description_advance}
                        </p>
                    </div>


                    {progress.professionalComment && !progress.is_feedback_approved &&
                        <Alert color="gray">
                            <span className="font-medium">The admin need to approve the comment from your professional 👌</span> Check your notifications, we will notify you when this comment is ready
                        </Alert>
                    }
                    {!progress.professionalComment &&
                        <Alert color="info">
                            <span className="font-medium">Waiting for professional to give you a feedback</span>
                        </Alert>
                    }
                    {progress.professionalComment && progress.is_feedback_approved &&
                        <div className="flex items-start flex-col w-full bg-gray-200 border border-gray-300 p-3 rounded-lg md:ml-2">
                            <div className="inline-flex w-full items-center mb-4">
                                <span className="inline-flex items-center mr-3 text-sm text-gray-500 dark:text-white font-semibold gap-2">
                                    <HiArrowUturnLeft />
                                    {
                                        professionalView ?
                                            "My Feedback"
                                            : `Reply from ${progress.selected_type == "DIET" ? "Nutritionist" : "Coach"}`
                                    }

                                </span>
                                <p className="text-sm text-gray-400 dark:text-gray-400"><time dateTime={progress.professional_comment_date || ""}
                                    title={formatDate(progress.professional_comment_date || "")}>{formatDate(progress.professional_comment_date || "")}</time></p>
                            </div>
                            <p className="text-base leading-relaxed text-gray-500 ml-5">
                                {progress.professionalComment}
                            </p>
                        </div>
                    }

                    {professionalView &&
                        <div className='bg-gray-100 p-2 rounded gap-2'>
                            <div className="md:w-[50%] w-full">
                                <div className="mb-1 block">
                                    <Label htmlFor="md-range" value={`Set the goal percentage (${goalPercentage}%)`} />
                                </div>
                                <RangeSlider
                                    id="md-range"
                                    sizing="md"
                                    value={goalPercentage}
                                    onChange={(e) => setGoalPercentage(e.target.value)} />
                            </div>
                            <div className="md:w-[50%] w-full">
                                <div className="mb-1 block">
                                    <Label htmlFor="md-range" value={`Set fat percentage (${fatPercentage}%)`} />
                                </div>
                                <RangeSlider
                                    id="md-range"
                                    sizing="md"
                                    value={fatPercentage}
                                    onChange={(e) => setFatPercentage(e.target.value)} />
                            </div>
                            <div className="max-w-md md:ml-2">
                                <div className="mb-2 block">
                                    <Label htmlFor="comment" value="Your feedback" />
                                </div>
                                <Textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder={progress.professionalComment ? progress.professionalComment : "Leave a comment..."} required rows={4} />
                            </div>
                            <div className='w-full flex justify-end mr-2'>
                                <Button className="mt-5" color='success' onClick={handleUpdateComment} >Update comment</Button>
                            </div>
                        </div>
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCloseFn}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}


function ProgressPhotos({ pics }: { pics: any }) {
    let photosFormatted: ReactElement[] = [];

    if (pics) {
        Object.keys(pics).forEach((key: string, index: number) => {
            const pic = pics[key];
            if (pic)
                photosFormatted.push(
                    <a href={pic} target="_blank" key={index}>
                        <img
                            src={pic}
                            alt={"training-pic-" + index}
                            className={clsx(
                                "w-[10rem] h-[10rem] object-cover border-2 border-white hover:border-blue-300 transition-colors rounded"
                            )}
                        />
                    </a>
                );
        });
    } else {
        for (let i = 0; i < 4; i++) {
            photosFormatted.push(
                <img
                    src={"/imgs/placeholder_not_found.png"}
                    alt=""
                    className={clsx(
                        "w-[8rem] h-[8rem] object-cover rounded-full border-2 border-white "
                    )}
                />
            );
        }
    }

    return (
        <div className="inline-flex flex-wrap">
            {photosFormatted}
        </div>
    )
}


function formatDate(dateString: string): string {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    // Parse the input date string into a Date object
    try {
        const [day, month, year, time] = dateString.split(/[\s-:]+/);
        const date = new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
            Number(time.slice(0, 2)),
            Number(time.slice(2, 4)),
            Number(time.slice(4, 6))
        );

        // Format the date
        const formattedDate = `${months[date.getMonth()]
            } ${date.getDate()}, ${date.getFullYear()} at ${date
                .getHours()
                .toString()
                .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

        return formattedDate;
    } catch (e) {
        return dateString;
    }

}
