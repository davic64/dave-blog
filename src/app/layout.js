import "@/app/globals.css";

export const metadata = {
  title: "Dave Victoria",
  description: "Espacio para compartir mis conocimientos y experiencias",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
