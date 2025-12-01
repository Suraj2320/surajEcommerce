"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient.js";
import { TooltipProvider } from "../components/ui/tooltip.jsx";
import { CartProvider } from "../context/CartContext.jsx";
import { Toaster } from "../components/ui/toaster.jsx";
export function Providers({ children }) {
    return (<QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <CartProvider>
                {children}
                <Toaster />
            </CartProvider>
        </TooltipProvider>
    </QueryClientProvider>);
}
