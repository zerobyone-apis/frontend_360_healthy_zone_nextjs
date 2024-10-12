
"use client";

import { getProfileInfo } from "@/actions/profile/getProfileInfo";
import { calculateFatPercentage } from "@/utils/calculateFatPercentage";
import { Button, Drawer, Label, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState, ChangeEvent } from "react";
import { HiOutlineArrowTrendingUp, HiScale } from "react-icons/hi2";
import { toast } from "react-toastify";

type Props = {
    open: boolean;
    handleCloseFn: () => void;
}
export function CreateProgressDrawer({ open = false, handleCloseFn }: Props) {
    const [currentWeight, setCurrentWeight] = useState("0");
    const [photos, setPhotos] = useState<File[]>([]);
    const [descriptionAdvance, setDescriptionAdvance] = useState("");
    const [profile, setProfile] = useState<any>();


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

    const handleSubmit = () => {
        if (!photos.length) return toast.warning("No photos uploaded")

        toast.success("Progress submitted!");
    }

    const currentFatPercentage = () => {
        let pertcentage = calculateFatPercentage({
            age: 30,
            weight: Number(currentWeight),
            height: profile.initial_height,
            gender: "male"
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
