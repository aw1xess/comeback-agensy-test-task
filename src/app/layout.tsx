import "./globals.scss";
import Providers from "./providers";

export const metadata = {
  title: "Weather SPA",
  description: "Next.js + RTK Query + MUI + SCSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
