import localFont from "next/font/local";
import "./globals.css";
import Homepage from './components/Button/Button';

export const metadata = {
  title: "Quiz app",
  description: "Hey there! Welcome to the Quiz app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div>
        {children}
        </div>
      </body>
    </html>
  );
}
