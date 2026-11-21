import { Navbar } from "@/components/Navbar";
import { NitroScrollExperience } from "@/components/NitroScrollExperience";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <NitroScrollExperience />
    </div>
  );
}
