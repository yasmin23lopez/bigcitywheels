import Badge from "@/components/Badge";

export default function PrivacyPage() {
  return (
    <section className="pt-52 pb-20 sm:pt-60 sm:pb-28 bg-[#050505]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge>Legal</Badge>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight">
            Privacy Policy
          </h1>
          <div className="mt-4 w-16 h-[2px] bg-red mx-auto" />
        </div>

        <div className="prose prose-invert prose-sm max-w-none font-body text-white/50 leading-relaxed space-y-6">
          <p><strong className="text-white/80">Last Updated:</strong> May 2025</p>

          <h2 className="font-display text-xl font-bold text-white uppercase tracking-wider">1. Information We Collect</h2>
          <p>When you submit a quote request or contact form, we collect your name, phone number, email address, and vehicle information. We do not collect payment information through this website.</p>

          <h2 className="font-display text-xl font-bold text-white uppercase tracking-wider">2. How We Use Your Information</h2>
          <p>We use your information solely to respond to your quote requests, provide customer service, and communicate about our products and services. We do not sell or share your personal information with third parties for marketing purposes.</p>

          <h2 className="font-display text-xl font-bold text-white uppercase tracking-wider">3. Data Storage</h2>
          <p>Quote requests are processed through Web3Forms and delivered to our business email. We do not store your personal data on our website servers beyond what is necessary to process your request.</p>

          <h2 className="font-display text-xl font-bold text-white uppercase tracking-wider">4. Cookies</h2>
          <p>This website uses localStorage to save your quote cart items for convenience. We do not use tracking cookies or third-party analytics that collect personal information.</p>

          <h2 className="font-display text-xl font-bold text-white uppercase tracking-wider">5. Third-Party Services</h2>
          <p>Product images may be loaded from third-party servers. These services may collect basic access logs (IP address, browser type) as part of their normal operations.</p>

          <h2 className="font-display text-xl font-bold text-white uppercase tracking-wider">6. Your Rights</h2>
          <p>You may request deletion of any personal information we hold about you by contacting us directly. We will respond to such requests within 30 days.</p>

          <h2 className="font-display text-xl font-bold text-white uppercase tracking-wider">7. Contact</h2>
          <p>For privacy-related questions, contact us at <a href="mailto:Bcwtires@gmail.com" className="text-red hover:text-red-dark">Bcwtires@gmail.com</a> or call <a href="tel:7135615519" className="text-red hover:text-red-dark">(713) 561-5519</a>.</p>
        </div>
      </div>
    </section>
  );
}
