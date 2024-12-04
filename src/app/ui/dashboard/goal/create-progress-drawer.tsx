
"use client";

import { CreateClientProgress } from "@/actions/progress/create-client-progress";
import { getProfileInfo } from "@/actions/profile/getProfileInfo";
import { GoalResponseDTO } from "@/interfaces/goals";
import { calculateFatPercentage } from "@/utils/calculateFatPercentage";
import clsx from "clsx";
import { Badge, Button, Drawer, Label, Radio, Select, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState, ChangeEvent } from "react";
import { HiOutlineArrowTrendingUp, HiScale } from "react-icons/hi2";
import { toast } from "react-toastify";

type Props = {
    open: boolean;
    handleCloseFn: () => void;
    goal: GoalResponseDTO;
}
export function CreateProgressDrawer({ open = false, handleCloseFn, goal }: Props) {
    const [currentWeight, setCurrentWeight] = useState("0");
    const [photos, setPhotos] = useState<File[]>([]);
    const [descriptionAdvance, setDescriptionAdvance] = useState("");
    const [profile, setProfile] = useState<any>();
    const [trainingSelected, setTrainingSelected] = useState("");
    const [dietSelected, setDietSelected] = useState("");
    const [treatment, setTreatment] = useState("DIET");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProfileInfo().then((data) => {
            setProfile(data);
        }).catch((e) => {
            setProfile(null);
        })
    }, []);

    const handlePhotosChange = (images: File[] | []) => {
        setPhotos(images);
    }

    const handleSubmit = async (event: any): Promise<boolean> => {
        event.preventDefault();
        setLoading(true);
        if (!dietSelected && !trainingSelected) {
            toast.warning("No diet or training selected");
            return false
        }

        if (!photos.length) {
            toast.warning("No photos uploaded");
            return false;
        }

        try {
            let data = {
                initial_height: profile.initial_height,
                initial_weight: profile.initial_weight,
                goal_id: goal.id,
                current_weight: currentWeight,
                current_body_fat_percentage: currentFatPercentage(),
                target_weight: goal.target_weight,
                target_body_fat_percentage: goal.target_body_fat_percentage,
                description_advance: descriptionAdvance,
                selected_type: treatment,
                training_id: treatment === "TRAINING" ? trainingSelected : "",
                diet_id: treatment === "DIET" ? dietSelected : ""
            }

            let resp = await CreateClientProgress(data, photos);
            toast.success("Progress submitted!");

            setTimeout(() => {
                window.location.reload();
                setLoading(false);
            }, 1200);

            return true

        } catch (e) {
            toast.warning("Something went wrong");
            return false
        }

    }

    const currentFatPercentage = () => {

        let pertcentage = calculateFatPercentage({
            age: Number(profile.age),
            weight: Number(currentWeight),
            height: profile.initial_height,
            gender: profile.gender
        });

        if (!currentWeight || currentWeight == "0" || !pertcentage || pertcentage < 0) {
            return 0
        }
        return Math.round(pertcentage);

    }

    if (!profile) return null
    return (
        <>
            <Drawer open={open} onClose={handleCloseFn} position="right" className="z-[55] w-full md:w-[25rem]">
                <Drawer.Header title="New Progress" titleIcon={HiOutlineArrowTrendingUp} />
                <Drawer.Items>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6"><ImageUpload handleChange={handlePhotosChange} /></div>
                        <div className="max-w-md mb-6">
                            <div className="mb-6">
                                <RaitingStars />
                            </div>

                            <fieldset className="flex max-w-md flex-col gap-4 mb-6">
                                <legend className="mb-4">Choose the related treatment</legend>
                                <div className="flex items-center gap-2">
                                    <Radio id="diet-radio" name="treatment"
                                        value="DIET"
                                        onChange={() => setTreatment("DIET")}
                                        checked={treatment === "DIET"} />
                                    <Label htmlFor="diet-radio">Diet</Label>
                                </div>
                                {treatment == "DIET" && <div className="max-w-md mb-3">
                                    <Select id="diet-selection" required value={dietSelected} onChange={(e) => setDietSelected(e.target.value)}>
                                        <option>Select a diet</option>
                                        {goal.diets.map((diet) => {
                                            const opt = `${diet.type.replaceAll("_", " ")} / Status ${diet.diet_status.replaceAll("_", " ").toLowerCase()} - ${diet.created_on.split(" ")[0]}`
                                            return <option key={diet.diet_id} value={diet.diet_id}>{opt} </option>
                                        })
                                        }
                                    </Select>
                                </div>}
                                <div className="flex items-center gap-2">
                                    <Radio id="training-radio" name="treatment" value="TRAINING"
                                        onChange={() => setTreatment("TRAINING")}
                                        checked={treatment === "TRAINING"} />
                                    <Label htmlFor="training-radio">Training</Label>
                                </div>
                                {treatment == "TRAINING" && <div className="max-w-md mb-3">
                                    <Select id="training-selection" required value={trainingSelected} onChange={(e) => setTrainingSelected(e.target.value)}>
                                        <option>Select a training</option>
                                        {goal.trainings.map((training) => {
                                            const opt = `${training.type.replaceAll("_", " ")} / Status ${training.training_status.replaceAll("_", " ").toLowerCase()} - ${training.created_on.split("T")[0]}`
                                            return <option key={training.training_id} value={training.training_id}>{opt}</option>
                                        })
                                        }
                                    </Select>
                                </div>}
                            </fieldset>


                            <div className="mb-2 block">
                                <Label htmlFor="current-weight" value="Current weight (kg)" />
                            </div>
                            <TextInput id="current-weight" placeholder="Your weight here..."
                                value={currentWeight}
                                onChange={(e) => setCurrentWeight(e.target.value)}
                                type="number" addon={<HiScale />} required
                                helperText={
                                    <>
                                        <span className="font-medium">Your initial weight was {profile.initial_weight}kg</span>
                                    </>
                                } />
                        </div>
                        <div className="max-w-md mb-6">
                            <div className="mb-2 block">
                                <Label htmlFor="current-fat-percentage" value="Current fat percentage" />
                            </div>
                            <TextInput id="current-fat-percentage" placeholder="Your current fat percentage here..."
                                value={currentFatPercentage()}
                                disabled
                                type="text"
                                addon="%"
                                helperText={
                                    <>
                                        <span className="font-medium">This will be pre-filled automatically</span>
                                    </>
                                } />
                        </div>
                        <div className="mb-6">
                            <Label htmlFor="message" className="mb-2 block">
                                Progress description
                            </Label>
                            <Textarea id="message" name="message"
                                value={descriptionAdvance}
                                onChange={(e) => setDescriptionAdvance(e.target.value)}
                                placeholder="Write your ideas, insights and progress here..." rows={4} required />
                        </div>
                        <div className="mb-6">
                            <Button type="submit" className="w-full" isProcessing={loading} disabled={loading}>
                                Submit progress
                            </Button>
                        </div>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            Submiting this info you are acepting the
                            <a href="#" className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                Terms and conditions
                            </a>
                        </p>
                    </form>
                </Drawer.Items>
            </Drawer>
        </>
    );
}


interface ImageUploadProps {
    handleChange: (images: File[] | []) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ handleChange }) => {
    const [images, setImages] = useState<File[]>([]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (images.length + files.length > 4) {
            toast.error("You cant upload more than 4 photos")
            return;
        }
        setImages((prevImages) => [
            ...prevImages,
            ...files.slice(0, 4 - prevImages.length),
        ]);

    };

    useEffect(() => {
        handleChange(images);
    }, [images])

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <div className="max-w-md mx-auto mt-5">
            <h1 className="text-xl font-bold text-center mb-4">Upload your photos</h1>
            <div className="flex flex-wrap gap-4 justify-center">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative w-24 h-24 border-2 border-dashed border-gray-300 p-1"
                    >
                        <img
                            src={URL.createObjectURL(image)}
                            alt={`upload-${index}`}
                            className="w-full h-full object-cover"
                        />
                        <button
                            className="absolute top-0 right-0 bg-red-600 text-white p-1 text-xs rounded-full"
                            onClick={() => removeImage(index)}
                        >
                            &times;
                        </button>
                    </div>
                ))}
                {images.length < 4 && (
                    <label className="w-24 h-24 flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 cursor-pointer">
                        <span className="text-gray-500">+</span>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                )}
            </div>
        </div>
    );
};

const RaitingStars = () => {
    const [selected, setSelected] = useState<number>(3);

    return (
        <ul className="flex gap-2 justify-center">
            <li onClick={() => setSelected(4)} className="hover:cursor-pointer">
                <svg className={clsx("w-10 text-cyan-500 hover:scale-105", selected === 4 && "scale-110 text-red-500")} role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512">
                    <path fill="currentColor"
                        d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm0-144c-33.6 0-65.2 14.8-86.8 40.6-8.5 10.2-7.1 25.3 3.1 33.8s25.3 7.2 33.8-3c24.8-29.7 75-29.7 99.8 0 8.1 9.7 23.2 11.9 33.8 3 10.2-8.5 11.5-23.6 3.1-33.8-21.6-25.8-53.2-40.6-86.8-40.6zm-48-72c10.3 0 19.9-6.7 23-17.1 3.8-12.7-3.4-26.1-16.1-29.9l-80-24c-12.8-3.9-26.1 3.4-29.9 16.1-3.8 12.7 3.4 26.1 16.1 29.9l28.2 8.5c-3.1 4.9-5.3 10.4-5.3 16.6 0 17.7 14.3 32 32 32s32-14.4 32-32.1zm199-54.9c-3.8-12.7-17.1-19.9-29.9-16.1l-80 24c-12.7 3.8-19.9 17.2-16.1 29.9 3.1 10.4 12.7 17.1 23 17.1 0 17.7 14.3 32 32 32s32-14.3 32-32c0-6.2-2.2-11.7-5.3-16.6l28.2-8.5c12.7-3.7 19.9-17.1 16.1-29.8z">
                    </path>
                </svg>
            </li>
            <li onClick={() => setSelected(3)} className="hover:cursor-pointer">
                <svg className={clsx("w-10 text-cyan-500 hover:scale-105", selected === 3 && "scale-110 text-orange-500")} role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512">
                    <path fill="currentColor"
                        d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 128c-40.2 0-78 17.7-103.8 48.6-8.5 10.2-7.1 25.3 3.1 33.8 10.2 8.4 25.3 7.1 33.8-3.1 16.6-19.9 41-31.4 66.9-31.4s50.3 11.4 66.9 31.4c8.1 9.7 23.1 11.9 33.8 3.1 10.2-8.5 11.5-23.6 3.1-33.8C326 321.7 288.2 304 248 304z">
                    </path>
                </svg>
            </li>
            <li onClick={() => setSelected(2)} className="hover:cursor-pointer">
                <svg className={clsx("w-10 text-cyan-500 hover:scale-105", selected === 2 && "scale-110 text-yellow-300")} role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512">
                    <path fill="currentColor"
                        d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm8 144H160c-13.2 0-24 10.8-24 24s10.8 24 24 24h176c13.2 0 24-10.8 24-24s-10.8-24-24-24z">
                    </path>
                </svg>
            </li>
            <li onClick={() => setSelected(1)} className="hover:cursor-pointer">
                <svg className={clsx("w-10 text-cyan-500 hover:scale-105", selected === 1 && "scale-110 text-jungle-green-300")} role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512">
                    <path fill="currentColor"
                        d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z">
                    </path>
                </svg>
            </li>
            <li onClick={() => setSelected(0)} className="hover:cursor-pointer">
                <svg className={clsx("w-10 text-cyan-500 hover:scale-105", selected === 0 && "scale-110 text-jungle-green-500")} role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512">
                    <path fill="currentColor"
                        d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm105.6-151.4c-25.9 8.3-64.4 13.1-105.6 13.1s-79.6-4.8-105.6-13.1c-9.8-3.1-19.4 5.3-17.7 15.3 7.9 47.2 71.3 80 123.3 80s115.3-32.9 123.3-80c1.6-9.8-7.7-18.4-17.7-15.3zm-227.9-57.5c-1 6.2 5.4 11 11 7.9l31.3-16.3 31.3 16.3c5.6 3.1 12-1.7 11-7.9l-6-34.9 25.4-24.6c4.5-4.5 1.9-12.2-4.3-13.2l-34.9-5-15.5-31.6c-2.9-5.8-11-5.8-13.9 0l-15.5 31.6-34.9 5c-6.2.9-8.9 8.6-4.3 13.2l25.4 24.6-6.1 34.9zm259.7-72.7l-34.9-5-15.5-31.6c-2.9-5.8-11-5.8-13.9 0l-15.5 31.6-34.9 5c-6.2.9-8.9 8.6-4.3 13.2l25.4 24.6-6 34.9c-1 6.2 5.4 11 11 7.9l31.3-16.3 31.3 16.3c5.6 3.1 12-1.7 11-7.9l-6-34.9 25.4-24.6c4.5-4.6 1.8-12.2-4.4-13.2z">
                    </path>
                </svg>
            </li>
        </ul>
    )
}