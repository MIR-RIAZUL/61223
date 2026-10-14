import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RIAZUL // DEadEnD — Anti-Gravity Portfolio",
  description:
    "Full-Stack Web, App & Cross-Platform Flutter Architect portfolio powered by Three.js WebGPU, Rust Rapier WASM zero-gravity physics, and live GitHub ecosystem telemetry.",
  icons: {
    icon: "https://github.com/MIR-RIAZUL.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#050508] text-slate-100 font-sans selection:bg-[#00f0ff]/20 selection:text-[#00f0ff]">
        {children}
      </body>
    </html>
  );
}
