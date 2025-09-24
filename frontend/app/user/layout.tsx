"use client";
import Navbar from '../components/navbar/navbar';
import { useSearch } from "../components/context/searchContext";

export default function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { showSearch } = useSearch();
  return (
      <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
        <Navbar />
        <main className="flex-grow-1 d-flex">
          {children}
        </main>
      </div>
  );
}
