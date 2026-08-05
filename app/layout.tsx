import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NEXA INDUSTRIES | Precision Engineering & Industrial Infrastructure',
  description: 'Immersive B2B manufacturing platform for precision engineered components, OEM supply chain, custom quotations, CRM pipeline, and industrial automation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#0B0C0E] text-[#F4F4F6] font-sans antialiased selection:bg-[#E11D48] selection:text-white min-h-screen flex flex-col overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
