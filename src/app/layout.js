import "@/app/globals.css";

export const metadata = {
  title: "David Victoria",
  description: "Aprendizajes y experiencias de un ingeniero de software",
  openGraph: {
    title: "David Victoria",
    description: "Aprendizajes y experiencias de un ingeniero de software",
    url: "https://www.davidvictoria.io",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "David Victoria",
    description: "Aprendizajes y experiencias de un ingeniero de software",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
