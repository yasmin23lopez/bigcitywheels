import PageHeader from "@/components/PageHeader";
import Badge from "@/components/Badge";
import TireIcon from "@/components/TireIcon";
import BrandsSlider from "@/components/BrandsSlider";
import Link from "next/link";

const services = [
  {
    slug: "tires",
    title: "Tire Installation",
    description: "Professional mounting, balancing, and rotation for all vehicle types. We carry top brands like BFGoodrich, Nitto, Toyo, Falken, and Cooper.",
    features: ["Mounting & Balancing", "Tire Rotation", "Flat Repair", "TPMS Service"],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
        <line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" />
        <line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    slug: "rims",
    title: "Rim Installation",
    description: "Custom rim fitting for trucks, SUVs, and cars. From off-road to street style, we have the perfect wheels for your ride.",
    features: ["Custom Fitting", "Offset Consultation", "Hub-Centric Rings", "Lug Nut Torque"],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    slug: "lift-kits",
    title: "Lift Kits & Suspension",
    description: "Level up your truck with professional suspension work. Lift kits, leveling kits, and full suspension upgrades.",
    features: ["Lift Kits", "Leveling Kits", "Suspension Upgrades", "Shock Replacement"],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path d="M12 3v18M8 7l4-4 4 4" />
        <path d="M5 12h14" />
        <path d="M3 17h4v4H3zM17 17h4v4h-4z" />
        <path d="M7 19h10" />
      </svg>
    ),
  },
  {
    slug: "alignment",
    title: "Wheel Alignment",
    description: "Precision alignment for straight tracking and even tire wear. Essential after any suspension or tire work.",
    features: ["4-Wheel Alignment", "Thrust Angle", "Camber/Caster/Toe", "Post-Install Check"],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v20M2 12h20" />
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        badge="What We Do"
        title="Our Services"
        subtitle="From tires to full suspension builds — we do it all right here in Crosby."
        image="https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=1400&q=80&fit=crop"
      />

      <section className="py-20 sm:py-28 bg-[#2142A1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white/[0.03] border border-white/[0.06] hover:border-red/30 p-8 sm:p-10 transition-all duration-300 hover:bg-white/[0.05]"
                style={{
                  clipPath: i % 2 === 0
                    ? "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)"
                    : "polygon(16px 0, 100% 0, 100% 100%, 0 100%, 0 16px)",
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <Badge>{String(i + 1).padStart(2, "0")}</Badge>
                  <div className="text-white/15 group-hover:text-red transition-all duration-500">
                    {service.icon}
                  </div>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3 group-hover:text-red transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="font-body text-base text-white/40 leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((f) => (
                    <span key={f} className="font-condensed text-[10px] tracking-[0.2em] uppercase text-white/25 bg-white/[0.04] px-3 py-1">
                      {f}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <BrandsSlider />
    </>
  );
}
