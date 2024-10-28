
"use client";

import { CreateClientProgress } from "@/actions/client/create-client-progress";
import { getProfileInfo } from "@/actions/profile/getProfileInfo";
import { GoalResponseDTO } from "@/interfaces/goals";
import { calculateFatPercentage } from "@/utils/calculateFatPercentage";
import { Button, Drawer, Label, Select, Textarea, TextInput } from "flowbite-react";
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

    const handleSubmit = async () => {
        if (!dietSelected && !trainingSelected) return toast.warning("No diet or training selected");

        if (!photos.length) return toast.warning("No photos uploaded")
        const selected_type = dietSelected && trainingSelected ? "BOTH" : dietSelected ? "DIET" : "TRAINING";


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
                selected_type,
                training_id: trainingSelected || "",
                diet_id: dietSelected || ""
            }

            let resp = await CreateClientProgress(data, photos);
            console.log(resp);
            toast.success("Progress submitted!");
            return true
        } catch (e) {
            console.log(e);
            toast.warning("Something went wrong");
        }

    }

    const currentFatPercentage = () => {
        let pertcentage = calculateFatPercentage({
            age: Number(profile.age),
            weight: Number(currentWeight),
            height: profile.initial_height,
            gender: profile.gender
        });

        if (!currentWeight || currentWeight === "0" || !pertcentage) return 0
        return Math.round(pertcentage);

    }

    if (!profile) return null
    return (
        <>
            <Drawer open={open} onClose={handleCloseFn} position="right" className="z-[55] w-full md:w-[25rem]">
                <Drawer.Header title="New Progress" titleIcon={HiOutlineArrowTrendingUp} />
                <Drawer.Items>
                    <form action={handleSubmit}>
                        <div className="mb-6"><ImageUpload handleChange={handlePhotosChange} /></div>
                        <div className="max-w-md mb-6">
                            <div className="max-w-md mb-6">
                                <div className="mb-2 block">
                                    <Label htmlFor="diet-selection" value="Select diet for..." />
                                </div>
                                <Select id="diet-selection" required value={dietSelected} onChange={(e) => setDietSelected(e.target.value)}>
                                    <option>Select a diet</option>
                                    {goal.diets.map((diet) => {
                                        const opt = `${diet.type.replaceAll("_", " ")} / Status ${diet.diet_status.replaceAll("_", " ").toLowerCase()} - ${diet.created_on.split(" ")[0]}`
                                        return <option key={diet.diet_id} value={diet.diet_id}>{opt}</option>
                                    })
                                    }
                                </Select>
                            </div>
                            <div className="max-w-md mb-6">
                                <div className="mb-2 block">
                                    <Label htmlFor="training-selection" value="Select training for..." />
                                </div>
                                <Select id="training-selection" required value={trainingSelected} onChange={(e) => setTrainingSelected(e.target.value)}>
                                    <option>Select a training</option>
                                    {goal.trainings.map((training) => {
                                        const opt = `${training.type.replaceAll("_", " ")} / Status ${training.training_status.replaceAll("_", " ").toLowerCase()} - ${training.created_on.split("T")[0]}`
                                        return <option key={training.training_id} value={training.training_id}>{opt}</option>
                                    })
                                    }
                                </Select>
                            </div>
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
                                <Label htmlFor="current-weight" value="Current fat percentage" />
                            </div>
                            <TextInput id="current-weight" placeholder="Your current fat percentage here..."
                                value={currentFatPercentage()}
                                disabled
                                type="text"
                                addon="%"
                                helperText={
                                    <>
                                        <span className="font-medium">This will be pre-filled automaticly</span>
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
                            <Button type="submit" className="w-full">
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
