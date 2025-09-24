// 'use client'
// import "./globals.css";
// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import { SearchProvider } from "./components/context/searchContext";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { UserProvider } from "./components/context/userContext";


// export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="UTF-8" />
//         <link rel="icon" type="image/svg+xml" href="/jira_logo.png" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>Jira</title>
//       </head>
//       <body>
//         <UserProvider>
//           <SearchProvider>
//             {children}
//           </SearchProvider>
//         </UserProvider>
//       </body>
//     </html>
//   );
// }

import "./globals.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
