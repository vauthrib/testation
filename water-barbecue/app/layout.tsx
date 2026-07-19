import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Water-Barbecue 🚤🔥",
  description: "Compétition d'embarcations flottantes - Votez pour votre équipage préféré !",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <div className="min-h-screen max-w-lg mx-auto px-4 py-6">
          {children}
        </div>
      </body>
    </html>
  );
}
