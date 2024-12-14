"use client";
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getRecipeByID } from '@/actions/recipes/get-recipe-by-id';
import LoadingPage from '@/app/ui/loading.page';
import { Badge, Blockquote, Button, List } from 'flowbite-react';
import { HiCheckCircle, HiClock, HiChartPie, HiCheck, HiOutlineStar, HiStar } from "react-icons/hi";
import { recipesStore } from '@/stores/recipes.store';


type Props = {}

export default function Page({ }: Props) {
    const params = useParams<{ id: string; }>()
    const [recipe, setRecipe] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const recipesFavorites = recipesStore((state: any) => state.favorites);
    const setFavoriteStore = recipesStore((state: any) => state.setFavorite);
    const removeFavoriteStore = recipesStore((state: any) => state.removeFavorite);
    const [favorite, setFavorite] = useState<boolean>(false);

    useEffect(() => {

        setFavorite(recipesFavorites.some((recipe: any) => recipe.id == params.id));
        setLoading(true);

        getRecipeByID(params.id).then((data) => {
            console.log(data);
            setRecipe(data);
        }).catch(() => {
            setError(true);
        }).finally(() => {
            setLoading(false);
        })
    }, [params.id])

    const handleFavorite = () => {
        if (favorite) {
            removeFavoriteStore(params.id);
            setFavorite(false);
        } else {
            setFavoriteStore(recipe);
            setFavorite(true);
        }
    };

    if (loading && !recipe && !error) {
        return (
            <LoadingPage />
        )
    }

    if (error) {
        return (
            <div>
                Error..
            </div>
        )
    }

    return (
        <div className=''>
            <img src={recipe.image || ""} className="w-full h-[200px] object-cover rounded-xl" ></img>
            <h4 className="text-xl font-bold tracking-tight text-gray-500 mt-3">
                {recipe.title}
            </h4>
            <div className='inline-flex flex-wrap mt-2 gap-1 items-center'>
                <Button color='yellow' size="sm" className='mr-3' onClick={handleFavorite}>
                    {favorite ? <HiStar className="mr-2 h-5 w-5" /> : <HiOutlineStar className="mr-2 h-5 w-5" />}
                    Favorite
                </Button>
                {recipe.glutenFree && <Badge icon={HiCheck}>Gluten Free</Badge>}
                {recipe.vegan && <Badge icon={HiCheck}>Vegan</Badge>}
                {recipe.vegetarian && <Badge icon={HiCheck}>Vegetarian</Badge>}
                {recipe.veryPopular && <Badge icon={HiCheck}>Popular!</Badge>}
                {recipe.dairyFree && <Badge icon={HiCheck}>Dairy Free</Badge>}
            </div>
            <Blockquote className="my-4 border-l-4 border-gray-300 bg-gray-50 p-4 dark:border-gray-500 dark:bg-gray-800 text-sm">
                <List className='mt-2'>
                    <List.Item icon={HiClock}>Ready in: {recipe.readyInMinutes} minutes</List.Item>
                    <List.Item icon={HiChartPie}>Servings: {recipe.servings}</List.Item>
                </List>
            </Blockquote>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 mt-3">
                Ingredients
            </h3>
            <List className='mt-2'>
                {recipe.extendedIngredients.map((ingredient: any) => <List.Item icon={HiCheckCircle}>{ingredient.original}</List.Item>)}
            </List>

            <hr className="border-gray-300 mt-2 mb-2" />

            <h3 className="text-2xl font-bold tracking-tight text-gray-900 mt-3">
                Instructions
            </h3>
            <List className='' ordered>
                {recipe.analyzedInstructions[0].steps.map((step: any) => <List.Item key={step.number}>{step.step}</List.Item>)}
            </List>



        </div>
    )
}