import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import NavbarWithModal from "@/components/NavbarWithModal";
import { Toaster } from "@/components/ui/sonner";

const space = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moodjournal",
  description: "A place to gather your thoughts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={space.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <NavbarWithModal />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
