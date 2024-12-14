"use client"
import { getRandomRecipes } from '@/actions/recipes/get-random-recipes'
import { recipesStore } from '@/stores/recipes.store'
import { Badge, Card, Label, Select, Tabs, TextInput } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { HiClock, HiChartPie, HiStar } from "react-icons/hi";

export default function Page() {
    const router = useRouter();
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const recipesFavorites = recipesStore((state: any) => state.favorites);

    useEffect(() => {
        setLoading(true);
        getRandomRecipes().then((data) => {
            setRecipes(data.recipes);
        }).catch(() => {
            setError(true);
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    const handleRedirect = (id: number) => {
        router.push("/dashboard/recipes/" + id);
    }

    if (loading && recipes.length && !error) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <p>Error...</p>
            </div>
        )
    }
    return (
        <div>
            <div className="gap-3 grid-cols-3 grid">
                <div className='md:col-span-1 col-span-3 mb-5'>
                    <div className="mb-2 block">
                        <Label htmlFor="Title" value="Title" />
                    </div>
                    <TextInput id="Title" type="text" placeholder="Salad" required />
                </div>
                <div className="col-span-3 md:col-span-1">
                    <div className="mb-2 block">
                        <Label htmlFor="type" value="Select type" />
                    </div>
                    <Select id="type" required>
                        <option>All</option>
                        <option>Salads</option>
                        <option>Launchs</option>
                        <option>Dinners</option>
                        <option>Breakfasts</option>
                    </Select>
                </div>
            </div>
            <Tabs aria-label="Default tabs" variant="default">
                <Tabs.Item active title="Recipes" >
                    <section className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center mt-4">
                        {recipes.map((recipe: any) => <Card
                            onClick={() => handleRedirect(recipe.id)}
                            key={recipe.id}
                            className="max-w-sm cursor-pointer"
                            imgAlt="Meaningful alt text for an image that is not purely decorative"
                            imgSrc={recipe.image}
                        >
                            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {recipe.title}
                            </h5>
                            <div className='inline-flex gap-2'>
                                <Badge color="gray" icon={HiClock}>
                                    {recipe.readyInMinutes} min
                                </Badge>
                                <Badge color="gray" icon={HiChartPie}>
                                    {recipe.servings}
                                </Badge>
                            </div>
                        </Card>)}
                    </section>
                </Tabs.Item>
                <Tabs.Item title="Favorites" icon={HiStar}>
                    {!recipesFavorites.length && "No favorites recipes yet!"}
                    <section className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center mt-4">
                        {recipesFavorites.map((recipe: any) => <Card
                            onClick={() => handleRedirect(recipe.id)}
                            key={recipe.id}
                            className="max-w-sm cursor-pointer"
                            imgAlt="Meaningful alt text for an image that is not purely decorative"
                            imgSrc={recipe.image}
                        >
                            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {recipe.title}
                            </h5>
                            <div className='inline-flex gap-2'>
                                <Badge color="gray" icon={HiClock}>
                                    {recipe.readyInMinutes} min
                                </Badge>
                                <Badge color="gray" icon={HiChartPie}>
                                    {recipe.servings}
                                </Badge>
                            </div>
                        </Card>)}
                    </section>
                </Tabs.Item>
            </Tabs>
        </div>
    )
}