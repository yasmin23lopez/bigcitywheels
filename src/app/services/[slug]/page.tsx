import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import QuoteForm from "@/components/QuoteForm";
import Badge from "@/components/Badge";

const servicesData: Record<string, {
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  description: string[];
  features: { title: string; text: string }[];
}> = {
  tires: {
    badge: "Tire Service",
    title: "Tire Installation",
    image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=1400&q=80&fit=crop",
    subtitle: "Professional mounting and balancing for trucks, SUVs, and cars.",
    description: [
      "At Big City Wheels & Tires, we handle everything from mounting and balancing to rotations and flat repairs. Whether you're running all-terrain tires on your 3/4 ton or highway tires on your daily driver, we've got you covered.",
      "We carry top brands including BFGoodrich, Nitto, Toyo, Falken, and Cooper. Not sure what tire is right for your vehicle? Our team will help you find the perfect match for your driving style and budget.",
    ],
    features: [
      { title: "Mounting & Balancing", text: "Precision mounting with computerized balancing for a smooth ride every time." },
      { title: "Tire Rotation", text: "Regular rotation extends tire life and ensures even wear across all four corners." },
      { title: "Flat Repair", text: "Quick and reliable flat repairs to get you back on the road fast." },
      { title: "TPMS Service", text: "Tire pressure monitoring system diagnostics, sensor replacement, and relearn procedures." },
    ],
  },
  rims: {
    badge: "Wheel Service",
    title: "Rim Installation",
    image: "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?w=1400&q=80&fit=crop",
    subtitle: "Custom wheels fitted perfectly for your truck, SUV, or car.",
    description: [
      "Nothing transforms a vehicle like a fresh set of wheels. We carry off-road, street, classic, and matte/black styles from brands like Fuel, Moto Metal, XD Series, and American Force.",
      "Our team will help you choose the right size, offset, and bolt pattern for your vehicle. We handle everything from test fitting to final torque — no shortcuts.",
    ],
    features: [
      { title: "Custom Fitting", text: "We measure and test-fit every wheel to ensure perfect clearance and alignment." },
      { title: "Offset Consultation", text: "Get the right stance without rubbing. We'll dial in the perfect offset for your setup." },
      { title: "Hub-Centric Rings", text: "Eliminate vibrations with properly sized hub rings for aftermarket wheels." },
      { title: "Lug Nut Torque", text: "Every wheel torqued to manufacturer spec with a calibrated torque wrench." },
    ],
  },
  "lift-kits": {
    badge: "Suspension",
    title: "Lift Kits",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=1400&q=80&fit=crop",
    subtitle: "Level up your truck with professional suspension work.",
    description: [
      "Whether you want a 2-inch leveling kit or a full 6-inch lift, Big City Wheels & Tires has the expertise to get it done right. We work on RAM, Ford, Chevy, GMC, Toyota, Jeep, and Nissan trucks.",
      "Every lift kit installation includes a full alignment to ensure your truck drives straight and your tires wear evenly. We also offer shock upgrades and full suspension packages.",
    ],
    features: [
      { title: "Lift Kits", text: "2\" to 6\"+ lift kits for all major truck brands. Body lifts and suspension lifts available." },
      { title: "Leveling Kits", text: "Eliminate factory rake and fit larger tires with a simple leveling kit install." },
      { title: "Suspension Upgrades", text: "Performance shocks, coilovers, and complete suspension overhauls." },
      { title: "Free Alignment", text: "Every lift kit installation includes a complimentary 4-wheel alignment." },
    ],
  },
  alignment: {
    badge: "Precision",
    title: "Wheel Alignment",
    image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1400&q=80&fit=crop",
    subtitle: "Straight tracking and even tire wear — guaranteed.",
    description: [
      "A proper alignment is essential after any tire, wheel, or suspension work. Our computerized alignment system measures camber, caster, and toe to factory specifications.",
      "We recommend an alignment check every 6,000 miles or whenever you notice uneven tire wear, pulling, or a crooked steering wheel. It's one of the best investments you can make for your tires.",
    ],
    features: [
      { title: "4-Wheel Alignment", text: "Full four-wheel alignment with computerized measurements and adjustments." },
      { title: "Thrust Angle", text: "We check and correct thrust angle to ensure all four wheels track in the same direction." },
      { title: "Camber/Caster/Toe", text: "All three alignment angles measured and adjusted to manufacturer specifications." },
      { title: "Post-Install Check", text: "Complimentary alignment check included with every tire or suspension service." },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(servicesData).filter(slug => slug !== "lift-kits").map((slug) => ({ slug }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) notFound();

  return (
    <>
      <PageHeader badge={service.badge} title={service.title} subtitle={service.subtitle} image={service.image} />

      <section className="py-20 sm:py-28 bg-[#050505]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16">
            {/* Content */}
            <div>
              <div className="space-y-5 mb-12">
                {service.description.map((p, i) => (
                  <p key={i} className="font-body text-base sm:text-lg text-white/50 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((f, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.03] border border-white/[0.06] p-6"
                    style={{
                      clipPath: i % 2 === 0
                        ? "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)"
                        : "polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)",
                    }}
                  >
                    <h3 className="font-condensed text-xs font-bold tracking-[0.25em] uppercase text-red mb-2">
                      {f.title}
                    </h3>
                    <p className="font-body text-base text-white/40 leading-relaxed">{f.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote form */}
            <div className="lg:sticky lg:top-32">
              <QuoteForm variant="section" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
