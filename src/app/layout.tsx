// app/layout.tsx
'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "@/components/theme-provider"
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store'; // Import persistor
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <TooltipProvider>
                <AuthWrapper>{children}</AuthWrapper>
              </TooltipProvider>
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const current_page = useSelector((state: any) => state.app.current_page);
  const pathName = usePathname();

  useEffect(() => {
    const checkAuthStatus = async () => {
      // const response = await fetch("/api/checkAuthStatus");
      // const data = await response.json();
      const isAuthenticated = true;

      if (isAuthenticated) {
      } else {
        if (pathName !== current_page) {
          router.push(current_page);
        }
      }
    };

    checkAuthStatus();
  }, [dispatch, router, current_page, pathName]);

  return <>{children}</>;
}
