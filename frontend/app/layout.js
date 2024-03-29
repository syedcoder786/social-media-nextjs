import { Providers } from '@/store/provider'
import './globals.css'
import { Inter } from 'next/font/google'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "flowbite"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Social Media Nextjs',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ToastContainer />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
