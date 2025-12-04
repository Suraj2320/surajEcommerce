"use client";
import Link from "next/link";
import { Button } from "../components/ui/button.jsx";
import { SalesHero } from "../components/landing/SalesHero.jsx";
import { ImageSlider } from "../components/landing/ImageSlider.jsx";
import { InfoSection } from "../components/landing/InfoSection.jsx";
import { EcommerceFeatures } from "../components/landing/EcommerceFeatures.jsx";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <SalesHero />

            <ImageSlider />

            <InfoSection />

            <EcommerceFeatures />

            <section className="py-16 bg-primary text-primary-foreground">
                <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                    <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
                        Get updates on new arrivals, special offers, and exclusive deals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-md bg-primary-foreground text-foreground" data-testid="input-newsletter" />
                        <Button variant="secondary" data-testid="button-subscribe">
                            Subscribe
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
