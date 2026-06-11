import DashboardNavbar from "./components/DashboardNavbar";

export default function RestoranLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F4F6F0] flex flex-col">
      <DashboardNavbar />
      <main className="flex-1 pt-20 pb-10 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto">{children}</div>
      </main>
    </div>
  );
}
