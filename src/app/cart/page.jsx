"use client";
import { useCart } from "../../context/CartContext.jsx";
import { Button } from "../../components/ui/button.jsx";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
export default function CartPage() {
    const { items, removeFromCart, updateQuantity, getTotal } = useCart();
    if (items.length === 0) {
        return (<div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-muted-foreground"/>
                </div>
                <h1 className="text-2xl font-bold">Your cart is empty</h1>
                <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                <Button asChild className="mt-4">
                    <Link href="/">Start Shopping</Link>
                </Button>
            </div>);
    }
    return (<div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (<div key={item.product.id} className="flex gap-4 p-4 border rounded-lg bg-card">
                            <div className="relative w-24 h-24 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                                {item.product.images && item.product.images[0] ? (<Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover"/>) : (<div className="w-full h-full flex items-center justify-center bg-secondary">
                                        <ShoppingBag className="w-8 h-8 text-muted-foreground"/>
                                    </div>)}
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-lg">{item.product.name}</h3>
                                        <p className="text-sm text-muted-foreground">${item.product.price}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90" onClick={() => removeFromCart(item.product.id)}>
                                        <Trash2 className="w-4 h-4"/>
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                                        <Minus className="w-3 h-3"/>
                                    </Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                                        <Plus className="w-3 h-3"/>
                                    </Button>
                                </div>
                            </div>
                        </div>))}
                </div>
                <div className="lg:col-span-1">
                    <div className="p-6 border rounded-lg bg-card sticky top-24">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${getTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>Free</span>
                            </div>
                        </div>
                        <div className="border-t pt-4 mb-6">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${getTotal().toFixed(2)}</span>
                            </div>
                        </div>
                        <Button className="w-full" size="lg" asChild>
                            <Link href="/checkout">Proceed to Checkout</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>);
}
