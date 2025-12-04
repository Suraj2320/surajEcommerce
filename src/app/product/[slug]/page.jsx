"use client";
import { useParams, useRouter } from "next/navigation";
import { allProducts as products } from "../../../data/products.js";
import { Button } from "../../../components/ui/button.jsx";
import { Badge } from "../../../components/ui/badge.jsx";
import { useCart } from "../../../context/CartContext.jsx";
import { ArrowLeft, Star, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug;
    const product = products.find((p) => p.slug === slug);
    const { addToCart, isInCart } = useCart();
    const [selectedImage, setSelectedImage] = useState(0);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
                <p className="text-muted-foreground mb-8">
                    Sorry, we couldn't find the product you're looking for.
                </p>
                <Button asChild>
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
            </div>
        );
    }

    const discountPercent =
        product.price > product.discountPrice
            ? Math.round(
                ((product.price - product.discountPrice) / product.price) * 100
            )
            : 0;

    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Button
                variant="ghost"
                className="mb-6"
                onClick={() => router.back()}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Product Images */}
                <div className="space-y-4">
                    <div className="aspect-square overflow-hidden rounded-xl border bg-muted relative">
                        <img
                            src={product.images[selectedImage]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        {discountPercent > 0 && (
                            <Badge className="absolute top-4 left-4 bg-red-600 text-white">
                                {discountPercent}% OFF
                            </Badge>
                        )}
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {product.images.map((img, i) => (
                            <div
                                key={i}
                                className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer ${selectedImage === i ? "border-primary" : "border-transparent"
                                    }`}
                                onClick={() => setSelectedImage(i)}
                            >
                                <img
                                    src={img}
                                    alt={`${product.name} ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div>
                    <div className="mb-6">
                        <p className="text-sm text-muted-foreground font-medium mb-2 uppercase tracking-wide">
                            {product.brand}
                        </p>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1 bg-amber-500 text-white px-2 py-1 rounded text-sm font-bold">
                                <Star className="h-4 w-4 fill-current" />
                                {product.ratingAvg}
                            </div>
                            <span className="text-muted-foreground">
                                {product.reviewCount} reviews
                            </span>
                        </div>
                        <div className="flex items-baseline gap-4 mb-6">
                            <span className="text-3xl font-bold text-primary">
                                {formatPrice(product.discountPrice)}
                            </span>
                            {discountPercent > 0 && (
                                <span className="text-xl text-muted-foreground line-through">
                                    {formatPrice(product.price)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="prose prose-sm mb-8 text-muted-foreground">
                        <p>{product.description}</p>
                    </div>

                    <div className="space-y-4 mb-8">
                        <Button
                            size="lg"
                            className="w-full md:w-auto text-lg px-8"
                            onClick={() => addToCart(product, 1)}
                            disabled={product.stock === 0 || isInCart(product.id)}
                        >
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            {isInCart(product.id) ? "In Cart" : "Add to Cart"}
                        </Button>
                        {product.stock < 10 && product.stock > 0 && (
                            <p className="text-sm text-orange-600 font-medium">
                                Only {product.stock} items left in stock!
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t pt-8">
                        <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg">
                            <Truck className="h-6 w-6 text-primary mb-2" />
                            <span className="font-medium text-sm">Free Delivery</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg">
                            <Shield className="h-6 w-6 text-primary mb-2" />
                            <span className="font-medium text-sm">1 Year Warranty</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg">
                            <RotateCcw className="h-6 w-6 text-primary mb-2" />
                            <span className="font-medium text-sm">30 Day Returns</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
