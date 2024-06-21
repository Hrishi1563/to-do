import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html className="bg-yellow-100" lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
