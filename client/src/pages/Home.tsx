import { NetworkGraph } from "@/components/NetworkGraph";
import portraitImage from "@assets/generated_images/professional_black_and_white_portrait_of_a_woman_healer.png";
import texture3 from "@assets/sensativechaos3_1766315989988.jpg";

const SERVICES = [
  "Biodynamic Craniosacral Therapy",
  "Somatic Therapy",
  "Yoga Therapy",
  "Parenting & Family Coaching",
  "Birth Education",
  "Birth Support & Doula"
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/10">
      
      {/* Background Texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.07] z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${texture3})` }}
      />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12 md:py-24 flex flex-col items-center justify-center min-h-screen">
        
        {/* Header */}
        <header className="text-center mb-12 md:mb-20 space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-primary">
            Nancy Turnquist
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-lg mx-auto leading-relaxed">
            Multimodal Healer & Bodyworker
          </p>
          <div className="h-px w-24 bg-primary/20 mx-auto mt-8" />
        </header>

        {/* The Graph */}
        <div className="w-full mb-16">
          <NetworkGraph 
            services={SERVICES} 
            image={portraitImage}
          />
        </div>

        {/* Footer / CTA */}
        <div className="text-center space-y-8 max-w-xl mx-auto">
          <p className="text-muted-foreground italic font-serif text-lg">
            "Weaving together somatic wisdom, birth support, and therapeutic healing."
          </p>
          <button 
            className="px-8 py-3 rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300 tracking-wide text-sm font-medium uppercase hover-elevate"
          >
            Connect with Nancy
          </button>
        </div>

      </main>
    </div>
  );
}
