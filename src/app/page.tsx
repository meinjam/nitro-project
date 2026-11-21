import { Navbar } from "@/components/navbar";
import { NitroScrollExperience } from "@/components/nitro-scroll-experience";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <NitroScrollExperience />
    </div>
  );
}
