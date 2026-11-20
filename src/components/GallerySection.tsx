import { Flame, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";
import canGreenHorizontal from "../assets/can-green-horizontal.png";
import heroSoccer from "../assets/hero-soccer.png";
import { NITRO_PRODUCTS } from "../data/products";

const HIGHLIGHTS = [
  {
    icon: Zap,
    metric: "220 mg",
    label: "Clean Caffeine Surge",
    detail: "Sustained alertness tuned for peak training, gaming, and late-night creation.",
  },
  {
    icon: ShieldCheck,
    metric: "0g",
    label: "Zero Added Sugar",
    detail: "Pure crisp taste with zero sugar crash and ultra-low calories per 500ml can.",
  },
  {
    icon: Flame,
    metric: "5x",
    label: "Signature Intensities",
    detail: "From flagship Electric Lime to Cobalt Berry, engineered for every adrenaline mood.",
  },
  {
    icon: Sparkles,
    metric: "2002",
    label: "Legacy Formula",
    detail: "Over twenty years of cold-filtered carbonation and B-vitamin electrolyte balance.",
  },
];

export function GallerySection() {
  return (
    <section
      id="gallery"
      className="nitro-radial-bg-soft relative w-full border-t border-white/10 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 lg:px-14 xl:px-[88px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#e0e600]">
              Performance Gallery
            </p>
            <h2 className="mt-2 font-display text-[34px] sm:text-[46px] lg:text-[54px] leading-[1.05] text-white">
              ENGINEERED FOR <span className="text-[#e0e600]">PURE IMPACT</span>
            </h2>
          </div>
          <p className="max-w-[420px] text-[15px] sm:text-[16px] leading-[24px] text-white/65">
            Every drop is balanced for zero-lag mental clarity, hydration, and
            explosive physical output.
          </p>
        </div>

        {/* Editorial Bento Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
          {/* Left Tall Visual Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0b0b] md:col-span-2 lg:col-span-5 min-h-[320px] sm:min-h-[380px]"
          >
            <img
              src={heroSoccer}
              alt="High intensity athletic performance"
              className="h-full w-full object-cover grayscale contrast-125 opacity-70 transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <span className="inline-block bg-[#e0e600] px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-black">
                Zero Sugar
              </span>
              <h3 className="mt-3 font-display text-[26px] sm:text-[30px] leading-tight text-white">
                BUILT FOR THE FINAL MINUTE
              </h3>
              <p className="mt-2 text-[14px] sm:text-[15px] text-white/70">
                Electrolytes + Taurine + B3, B5, B6, B12 complex.
              </p>
            </div>
          </motion.div>

          {/* Right Metrics + Flavor Showcase */}
          <div className="flex flex-col gap-5 md:col-span-2 lg:col-span-7">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {HIGHLIGHTS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: "some" }}
                    transition={{ duration: 0.45, delay: idx * 0.06 }}
                    className="group rounded-[20px] border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[#e0e600]/60 hover:bg-white/[0.05]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-[32px] sm:text-[36px] leading-none text-[#e0e600]">
                        {item.metric}
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0e600]/40 text-[#e0e600] transition-colors group-hover:bg-[#e0e600] group-hover:text-black">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                    <h3 className="mt-4 text-[17px] font-semibold text-white">
                      {item.label}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-[21px] text-white/60">
                      {item.detail}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Wide Strip with Flavor Lineup Preview */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-r from-[#141414] via-[#1b1b1b] to-[#0a0a0a] p-6 sm:p-8"
            >
              <div className="z-10 max-w-[360px] text-center sm:text-left">
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#e0e600]">
                  5 Voltage Editions
                </p>
                <h3 className="mt-1 font-display text-[22px] sm:text-[26px] text-white">
                  CHOOSE YOUR CHARGE
                </h3>
                <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                  {NITRO_PRODUCTS.map((p) => (
                    <span
                      key={p.id}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[12px] text-white/85"
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: p.accentColor }}
                      />
                      {p.shortName}
                    </span>
                  ))}
                </div>
              </div>

              <img
                src={canGreenHorizontal}
                alt="Nitro Green horizontal showcase"
                className="w-[240px] sm:w-[290px] h-auto object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.85)]"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
