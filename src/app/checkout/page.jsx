"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext.jsx";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import { Separator } from "../../components/ui/separator.jsx";
import { useToast } from "../../hooks/use-toast.js";
import { Loader2, CheckCircle2, CreditCard, Truck } from "lucide-react";
import Link from "next/link";
export default function CheckoutPage() {
    const router = useRouter();
    const { items, getTotal, clearCart } = useCart();
    const { toast } = useToast();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const handleCheckout = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsProcessing(false);
        setIsSuccess(true);
        clearCart();
        toast({
            title: "Order Placed Successfully!",
            description: "Thank you for your purchase. You will receive an email confirmation shortly.",
        });
    };
    if (isSuccess) {
        return (<div className="container mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600"/>
                </div>
                <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                <p className="text-muted-foreground max-w-md mb-8">
                    Your order has been placed successfully. We've sent a confirmation email to your inbox.
                </p>
                <div className="flex gap-4">
                    <Button asChild variant="outline">
                        <Link href="/orders">View Order</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/">Continue Shopping</Link>
                    </Button>
                </div>
            </div>);
    }
    if (items.length === 0) {
        return (<div className="container mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center justify-center text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <p className="text-muted-foreground mb-8">Add some items to your cart to proceed with checkout.</p>
                <Button asChild>
                    <Link href="/">Browse Products</Link>
                </Button>
            </div>);
    }
    return (<div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Shipping Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Truck className="w-5 h-5"/> Shipping Information
                            </CardTitle>
                            <CardDescription>Enter your delivery address.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" placeholder="John" required/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" placeholder="Doe" required/>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="john@example.com" required/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" placeholder="123 Main St" required/>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" placeholder="New York" required/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="zip">ZIP Code</Label>
                                        <Input id="zip" placeholder="10001" required/>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Payment Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="w-5 h-5"/> Payment Details
                            </CardTitle>
                            <CardDescription>Enter your payment information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="cardName">Name on Card</Label>
                                <Input id="cardName" placeholder="John Doe" required/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <Input id="cardNumber" placeholder="0000 0000 0000 0000" required/>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <Input id="expiry" placeholder="MM/YY" required/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" placeholder="123" required/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                {items.map((item) => (<div key={item.product.id} className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            {item.quantity}x {item.product.name}
                                        </span>
                                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                                    </div>))}
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${getTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${getTotal().toFixed(2)}</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" size="lg" type="submit" form="checkout-form" disabled={isProcessing}>
                                {isProcessing ? (<>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                        Processing...
                                    </>) : (`Pay $${getTotal().toFixed(2)}`)}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>);
}
