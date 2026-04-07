import type { Metadata } from 'next'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'BuildSpace | Student Developer Collaboration',
  description: 'Connect with developers, find projects, and discover opportunities.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn("font-sans", inter.variable, "antialiased")} suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <TooltipProvider>
            <div className="relative flex min-h-screen flex-col bg-background">
              <Navbar />
              <main className="flex-1">{children}</main>
            </div>
            <Toaster richColors position="top-center" />
          </TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
