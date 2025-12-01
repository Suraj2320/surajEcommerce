import { Providers } from "./providers.jsx";
import "./globals.css";
import { Navbar } from "../components/layout/Navbar.jsx";
import { Footer } from "../components/layout/Footer.jsx";
export const metadata = {
    title: "SurajHub",
    description: "Modern E-commerce Platform",
};
export default function RootLayout({ children, }) {
    return (<html lang="en">
        <body>
            <Providers>
                <div className="min-h-screen flex flex-col bg-background">
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </div>
            </Providers>
        </body>
    </html>);
}
