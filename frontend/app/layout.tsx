import "./globals.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar/navbar";
import ClientProviders from "./components/clientProvider";

export const metadata = {
  title: "Jira",
  icons: [
    { url: "/favicon.ico" },
    { url: "/jira_logo.png", type: "image/png", sizes: "32x32" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <Navbar/>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
