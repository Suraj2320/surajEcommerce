"use client";
import { useParams } from "next/navigation";
import { categories, allProducts as products } from "../../../data/products.js";
import { ProductCard } from "../../../components/products/ProductCard.jsx";
import { Button } from "../../../components/ui/button.jsx";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function CategoryPage() {
    const params = useParams();
    const slug = params.slug;
    const category = categories.find((c) => c.slug === slug);
    // In a real app, you would fetch products based on the category
    // For now, we'll just filter the mock products if they have a category field, 
    // or just show all products for demonstration if no specific filtering logic exists in mock data
    const categoryProducts = products.filter(p => p.categorySlug === slug || !p.categorySlug);
    if (!category) {
        return (<div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
                <p className="text-muted-foreground mb-8">Sorry, we couldn't find the category you're looking for.</p>
                <Button asChild>
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4"/>
                        Back to Home
                    </Link>
                </Button>
            </div>);
    }
    return (<div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Link href="/" className="hover:text-primary">Home</Link>
                    <span>/</span>
                    <span className="text-foreground font-medium">{category.name}</span>
                </div>
                <h1 className="text-3xl font-bold">{category.name}</h1>
                <p className="text-muted-foreground mt-2">
                    Explore our collection of {category.name.toLowerCase()}.
                </p>
            </div>

            {categoryProducts.length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryProducts.map((product) => (<ProductCard key={product.id} product={product}/>))}
                </div>) : (<div className="text-center py-16 bg-muted/30 rounded-lg">
                    <p className="text-lg text-muted-foreground">No products found in this category.</p>
                </div>)}
        </div>);
}
