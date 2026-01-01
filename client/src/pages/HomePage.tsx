import HeroSection from "../sections/HeroSection";
import FeaturesSection from "../sections/FeaturesSection";
import StatsSection from "../sections/StatsSection";
import PricingSection from "../sections/PricingSection";
import ContactSection from "../sections/ContactSection";
import CTASection from "../sections/CTASection";

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <FeaturesSection />
            <StatsSection />
            <PricingSection />
            <ContactSection />
            <CTASection />
        </>
    );
}