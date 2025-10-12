'use client';
import { SearchProvider } from "./context/searchContext";
import { UserProvider } from "./context/userContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <SearchProvider>{children}</SearchProvider>
    </UserProvider>
  );
}
