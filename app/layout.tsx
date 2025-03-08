import type { Metadata } from 'next'
import { SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Inter } from "next/font/google"
import './globals.css'

// Initialize Inter font
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} style={{ display: 'flex' }}>
        <SidebarProvider>
          <div style={{ flex: 1 }}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              {children}
              <Toaster />
            </ThemeProvider>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
  
}
