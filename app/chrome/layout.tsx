export default function ChromeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pt-6 sm:pt-8">{children}</div>;
}
