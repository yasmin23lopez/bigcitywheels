import Badge from "@/components/Badge";

export default function TermsPage() {
  return (
    <section className="pt-52 pb-20 sm:pt-60 sm:pb-28 bg-[#050505]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge>Legal</Badge>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight">
            Terms of Use
          </h1>
          <div className="mt-4 w-16 h-[2px] bg-red mx-auto" />
        </div>

        <div className="prose prose-invert prose-sm max-w-none font-body text-white/50 leading-relaxed space-y-6">
          <p><strong className="text-white/80">Last Updated:</strong> May 2025</p>

          <h2 className="font-display text-xl font-bold text-white uppercase tracking-wider">1. Acceptance of Terms</h2>
          <p>By accessing and using the Big City Wheels & Tires website, you accept and agree to be bound by these Terms of Use. If you do not agree, please do not use our website.</p>

          <h2 className="font-display text-xl font-bold text-white uppercase tracking-wider">2. Products & Pricing</h2>
          <p>All prices displayed on this website are subject to change without notice. Prices shown are estimates and final pricing will be confirmed at the time of purchase or quote. We reserve the right to correct any pricing errors.</p>

          <h2 className="font-display text-xl font-bold text-white uppercase tracking-wider">3. Quote Requests</h2>
          <p>Submitting a quote request does not constitute a binding agreement. All quotes are estimates and subject to product availability and current market pricing.</p>

          <h2 className="font-display text-xl font-bold text-white uppercase tracking-wider">4. Product Availability</h2>
          <p>Product availability is subject to change. We source products from third-party suppliers and cannot guarantee availability of any specific item at any given time.</p>

          <h2 className="font-display text-xl font-bold text-white uppercase tracking-wider">5. Limitation of Liability</h2>
          <p>Big City Wheels & Tires shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or our services.</p>

          <h2 className="font-display text-xl font-bold text-white uppercase tracking-wider">6. Intellectual Property</h2>
          <p>All content on this website, including text, images, logos, and design elements, is the property of Big City Wheels & Tires and is protected by applicable intellectual property laws.</p>

          <h2 className="font-display text-xl font-bold text-white uppercase tracking-wider">7. Contact</h2>
          <p>For questions about these terms, contact us at <a href="mailto:bcwtires@gmail.com" className="text-red hover:text-red-dark">bcwtires@gmail.com</a> or call <a href="tel:7135615519" className="text-red hover:text-red-dark">(713) 561-5519</a>.</p>
        </div>
      </div>
    </section>
  );
}
