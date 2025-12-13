import ThemeRegistry from "../theme/theme";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Video Size Reducer | Compress Videos Online",
  description: "Reduce video size easily online with high-quality compression",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className} style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)'
, minHeight: '100vh' }}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}