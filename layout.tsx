// app/layout.tsx (or wherever your root layout is)
import { CartProvider } from ".//store/useCart";
import './globals.css';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
