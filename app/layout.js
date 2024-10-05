import localFont from "next/font/local";
import "./globals.css";
import Homepage from './components/Button/Button';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>
        {children}
        </div>
      </body>
    </html>
  );
}
