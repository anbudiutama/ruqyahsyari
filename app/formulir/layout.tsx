import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formulir Pendaftaran — RuqyahSyari.com",
  description:
    "Daftarkan diri Anda untuk konsultasi atau layanan ruqyah syar'iyyah profesional. Gratis, tanpa komitmen.",
};

export default function FormulirLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
