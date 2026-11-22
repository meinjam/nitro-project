import { Navbar } from "@/components/navbar";
import { NitroPreloader } from "@/components/nitro-preloader";
import { NitroScrollExperience } from "@/components/nitro-scroll-experience";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <NitroPreloader />
      <Navbar />
      <NitroScrollExperience />
    </div>
  );
}
