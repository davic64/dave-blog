import { Header } from "@/ui";

const headerItems = [
  // { label: "Inicio", href: "/" },
  { label: "Inicio", href: "/blog" },
];

export default function RootLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header items={headerItems} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
