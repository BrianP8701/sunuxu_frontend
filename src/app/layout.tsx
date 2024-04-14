// app/layout.tsx
'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./store/userSlice";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Provider store={store}>
            <AuthWrapper>{children}</AuthWrapper>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // const response = await fetch("/api/checkAuthStatus");
        // const data = await response.json();
        const data = {
          authenticated: false,
          user: {}
        }

        if (data.authenticated) {

          // dispatch(setUser(data.user));

          // if (data.user.user_type === "primary") {
          //   router.push("/primary_landing");
          // } else if (data.user.user_type === "secondary") {
          //   router.push("/secondary_landing");
          // }
        } else {
          router.push("/home");
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
        router.push("/home");
      }
    };

    checkAuthStatus();
  }, [dispatch, router]);

  return <>{children}</>;
}
