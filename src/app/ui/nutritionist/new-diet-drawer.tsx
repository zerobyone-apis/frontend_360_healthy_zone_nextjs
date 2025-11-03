
"use client";
import { createNewDiet } from "@/actions/diets/new-diet";
import { getLatestGoalByClientID } from "@/actions/goals/get-latest-goal";
import { Button, Drawer, Label, Select, TextInput, Textarea } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
    open: boolean;
    handleCloseFn: () => void;
    hint?: {
        title: string;
        href: string;
    },
    clients: any[];
}
export function NewDietDrawer({ open = false, handleCloseFn, hint, clients }: Props) {
    const [isOpen, setIsOpen] = useState(open);
    const [goalAssigned, setGoalAssigned] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const handleSubmit = async (event: any) => {
        setLoading(true);
        event.preventDefault();
        const customerID = event.target.customer.value;
        const dietObj = {
            goal_id: goalAssigned.id,
            amount_of_days: event.target.amount_of_days.value,
            nutritionist_plans: event.target.nutritionist_plans.value,
            type: event.target.type.value,
            description_diet: event.target.description_diet.value,
            balanced_meal_plan: event.target.balanced_meal_plan.value,
            portion_size_guide: event.target.portion_size_guide.value,
            healthy_shopping_list: event.target.healthy_shopping_list.value,
            healthy_recipes: event.target.healthy_recipes.value,
            tips_for_change_eating_habits: event.target.tips_for_change_eating_habits.value,
            nutrition_information: event.target.nutrition_information.value,
            hydratation: event.target.hydratation.value,
            food_education: event.target.food_education.value,
        }

        if (!goalAssigned) {
            return toast.warn("This customer doesn't have an active goal");
        }

        if (!dietObj.description_diet || !dietObj.amount_of_days || !dietObj.nutritionist_plans || !dietObj.type || !customerID) {
            return toast.warn("Some required fields are missing");
        }

        try {
            await createNewDiet(customerID, dietObj);
            toast.success("Diet successfully created");
            handleCloseFn();
            setTimeout(() => {
                window.location.reload();
            }, 100);
        } catch (e: any) {
            toast.error(e);
        }
        setLoading(false);
    }

    const checkGoalByClientD = async (clientID: string) => {
        try {
            setLoading(true);
            const resp = await getLatestGoalByClientID(clientID);
            setGoalAssigned(resp);
        } catch (e) {
            setGoalAssigned(null)
        }
        setLoading(false);
    }

    return (
        <Drawer open={isOpen} onClose={handleCloseFn} className="z-[55] w-full md:w-80" >
            <Drawer.Header title="New diet" titleIcon={() => <></>} closeIcon={() => <></>} />
            <Drawer.Items>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <div className="mb-2 block">
                            <Label htmlFor="customers" value="*Select a customer" />
                        </div>
                        <Select id="customers" required name={"customer"} onChange={(e) => checkGoalByClientD(e.target.value)}
                            color={loading ? "success" : goalAssigned ? "success" : "failure"}
                            helperText={
                                <>
                                    {
                                        loading ?
                                            <span className="font-medium">Loading...</span>
                                            :
                                            goalAssigned ?
                                                <span className="font-medium">Looks good!</span>
                                                :
                                                <span className="font-medium">This user doesn&apos;t have a goal assigned yet</span>
                                    }
                                </>
                            }>
                            <option>Select an option</option>
                            {clients.map((client) => <option value={client.client.id} key={client.client.id}>{client.client.edited_name}, {client.client.country}</option>)}
                        </Select>
                    </div>
                    <div className="mb-6">
                        <div className="mb-2 block">
                            <Label htmlFor="amount_of_days" value="*Amount of days" />
                        </div>
                        <TextInput id="amount_of_days" type="number" required />
                    </div>
                    <div className="mb-6">
                        <div className="mb-2 block">
                            <Label htmlFor="type" value="*Select a type of diet" />
                        </div>
                        <Select id="type" required name="*type">
                            <option>Select an option</option>
                            <option value={"LOSE_WEIGHT"}>Lose Weight</option>
                            <option value={"INCREASE_MASS_MUSCLE"}>Increase mass muscle</option>
                            <option value={"LOSE_WEIGHT"}>Lose weight and healthy habits</option>
                        </Select>
                    </div>
                    <div className="mb-6">
                        <div className="mb-2 block">
                            <Label htmlFor="nutritionist_plans" value="*Select a nutritionist plan" />
                        </div>
                        <Select id="nutritionist_plans" required name="nutritionist_plans">
                            <option>Select an option</option>
                            <option value={"HEALTH_WEIGHT"}>Healthy Weight</option>
                            <option value={"HEALTHY_EAT"}>Healthy Eat</option>
                            <option value={"HEALTHY_EAT_AND_LOSE_WEIGHT"}>Healthy eat and lose weight</option>
                        </Select>
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="description_diet" className="mb-2 block">
                            *Description
                        </Label>
                        <Textarea id="description_diet" name="description_diet" placeholder="In this diet you will have to..." rows={4} />
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="balanced_meal_plan" className="mb-2 block">
                            Balanced Meal Plan
                        </Label>
                        <Textarea id="balanced_meal_plan" name="balanced_meal_plan" placeholder="This plan will help you with..." rows={4} />
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="portion_size_guide" className="mb-2 block">
                            Portion size guide
                        </Label>
                        <Textarea id="portion_size_guide" name="portion_size_guide" placeholder="Your portion size guide is..." rows={4} />
                    </div>

                    <div className="mb-6">
                        <Label htmlFor="healthy_shopping_list" className="mb-2 block">
                            Healthy shopping list
                        </Label>
                        <Textarea id="healthy_shopping_list" name="healthy_shopping_list" placeholder="Your healthy shopping list is..." rows={4} />
                    </div>

                    <div className="mb-6">
                        <Label htmlFor="healthy_recipes" className="mb-2 block">
                            Healthy recipes
                        </Label>
                        <Textarea id="healthy_recipes" name="healthy_recipes" placeholder="Your healthy recipes guide is..." rows={4} />
                    </div>

                    <div className="mb-6">
                        <Label htmlFor="tips_for_change_eating_habits" className="mb-2 block">
                            Tips for change eating habits
                        </Label>
                        <Textarea id="tips_for_change_eating_habits" name="tips_for_change_eating_habits" placeholder="Your portion size guide is..." rows={4} />
                    </div>

                    <div className="mb-6">
                        <Label htmlFor="nutrition_information" className="mb-2 block">
                            Nutrition information
                        </Label>
                        <Textarea id="nutrition_information" name="nutrition_information" placeholder="Your nutrition information is..." rows={4} />
                    </div>

                    <div className="mb-6">
                        <Label htmlFor="hydratation" className="mb-2 block">
                            Hydratation
                        </Label>
                        <Textarea id="hydratation" name="hydratation" placeholder="Your hydratation information is..." rows={4} />
                    </div>

                    <div className="mb-6">
                        <Label htmlFor="food_education" className="mb-2 block">
                            Food Education
                        </Label>
                        <Textarea id="food_education" name="food_education" placeholder="Your food education information is..." rows={4} />
                    </div>

                    <div className="mb-2">
                        <Button type="submit" disabled={goalAssigned ? false : true} className="w-full text-jungle-green-500 hover:bg-jungle-green-500 hover:text-white">
                            Create diet
                        </Button>
                    </div>
                    {hint && <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        <Link href={hint.href} className="hover:underline">
                            {hint.title}
                        </Link>
                    </p>}
                </form>
            </Drawer.Items>
        </Drawer>
    );
}
