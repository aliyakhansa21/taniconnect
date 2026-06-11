import PetaniNavbar from "./components/PetaniNavbar";

export default function PetaniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F0F2EC] flex flex-col">
      <PetaniNavbar />
      <main className="flex-1 pt-20 pb-10 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto">{children}</div>
      </main>
    </div>
  );
}
