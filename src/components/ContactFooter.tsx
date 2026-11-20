import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SocialIcons } from "./SocialIcons";

const CURRENT_YEAR = new Date().getFullYear();

export function ContactFooter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
    setMessage("");
  };

  return (
    <footer
      id="contact"
      className="relative w-full border-t border-white/10 bg-[#050505] pt-16 pb-10 sm:pt-20 sm:pb-12"
    >
      <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 lg:px-14 xl:px-[88px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a
              href="#home"
              className="font-display text-[32px] leading-none tracking-[-0.03em] text-[#e0e600]"
            >
              NiTRO
            </a>
            <p className="mt-4 max-w-[360px] text-[15px] leading-[24px] text-white/65">
              Since 2002 producing zero-sugar, high-intensity energy drinks
              crafted for peak focus, endurance, and bold performance.
            </p>
            <div className="mt-7">
              <SocialIcons size="sm" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:col-span-3">
            <div>
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white/45">
                Explore
              </h3>
              <ul className="mt-4 space-y-3 text-[15px] text-white/80">
                <li>
                  <a href="#home" className="hover:text-[#e0e600] transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#shop" className="hover:text-[#e0e600] transition-colors">
                    Shop
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#e0e600] transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-[#e0e600] transition-colors">
                    Gallery
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white/45">
                Flavors
              </h3>
              <ul className="mt-4 space-y-3 text-[15px] text-white/80">
                <li>
                  <a href="#shop" className="hover:text-[#e0e600] transition-colors">
                    Nitro Green
                  </a>
                </li>
                <li>
                  <a href="#shop" className="hover:text-[#e0e600] transition-colors">
                    Nitro Red
                  </a>
                </li>
                <li>
                  <a href="#shop" className="hover:text-[#e0e600] transition-colors">
                    Nitro Sky
                  </a>
                </li>
                <li>
                  <a href="#shop" className="hover:text-[#e0e600] transition-colors">
                    Nitro ENG &amp; Blue
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact / Distribution Inquiry Form */}
          <div className="lg:col-span-5">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#e0e600]">
              Contact &amp; Wholesale
            </h3>
            <p className="mt-2 text-[15px] text-white/65">
              Drop your email for wholesale inquiries, event sponsorships, or
              flavor drops.
            </p>

            {submitted ? (
              <div className="mt-5 flex items-center gap-3 border border-[#e0e600]/40 bg-[#e0e600]/10 p-4 text-[14px] text-[#e0e600]">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>
                  Thanks! Your message has been received by the Nitro team.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    aria-label="Email address"
                    className="h-[44px] flex-1 border border-white/20 bg-white/[0.04] px-4 text-[15px] text-white placeholder:text-white/40 focus:border-[#e0e600] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-[44px] items-center justify-center gap-1.5 bg-[#e0e600] px-6 text-[15px] font-medium text-black transition-colors hover:bg-[#f2f736] cursor-pointer"
                  >
                    Send
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Optional message (e.g. wholesale pack order)"
                  aria-label="Optional message"
                  className="h-[44px] w-full border border-white/15 bg-white/[0.03] px-4 text-[14px] text-white placeholder:text-white/35 focus:border-[#e0e600] focus:outline-none"
                />
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-[13px] text-white/45 sm:flex-row">
          <p>&copy; {CURRENT_YEAR} NiTRO Energy Drink. All rights reserved.</p>
          <p>High Intensity &middot; Zero Sugar &middot; Since 2002</p>
        </div>
      </div>
    </footer>
  );
}
