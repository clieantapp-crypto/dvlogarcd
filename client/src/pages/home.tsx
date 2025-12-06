import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary" />
            <span className="font-semibold text-lg" data-testid="text-logo">GeoGate</span>
          </div>
          <nav className="flex items-center gap-4 flex-wrap">
            <Button variant="ghost" size="sm" data-testid="link-about">
              About
            </Button>
            <Button variant="ghost" size="sm" data-testid="link-contact">
              Contact
            </Button>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 
              className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
              data-testid="text-hero-title"
            >
              Welcome to Our Platform
            </h1>
            <p 
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              data-testid="text-hero-subtitle"
            >
              Discover our services and explore what we have to offer. A seamless experience tailored just for you.
            </p>
            <Button size="lg" data-testid="button-get-started">
              Get Started
            </Button>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-card">
          <div className="max-w-7xl mx-auto px-4">
            <h2 
              className="text-3xl font-bold text-center mb-12"
              data-testid="text-features-title"
            >
              Why Choose Us
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border border-card-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" data-testid="text-feature-1-title">
                    Lightning Fast
                  </h3>
                  <p className="text-muted-foreground" data-testid="text-feature-1-desc">
                    Experience blazing fast performance with our optimized infrastructure. Every millisecond counts.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-card-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" data-testid="text-feature-2-title">
                    Secure & Reliable
                  </h3>
                  <p className="text-muted-foreground" data-testid="text-feature-2-desc">
                    Your data is protected with enterprise-grade security. Trust in our reliable platform.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-card-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" data-testid="text-feature-3-title">
                    Global Reach
                  </h3>
                  <p className="text-muted-foreground" data-testid="text-feature-3-desc">
                    Connect with users worldwide through our globally distributed network infrastructure.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 
              className="text-3xl font-bold mb-4"
              data-testid="text-cta-title"
            >
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-cta-desc">
              Join thousands of satisfied users and experience the difference today.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button size="lg" data-testid="button-start-free">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" data-testid="button-learn-more">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground" data-testid="text-copyright">
                2024 GeoGate. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-privacy"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-terms"
              >
                Terms of Service
              </a>
              <a 
                href="mailto:contact@example.com" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-email"
              >
                contact@example.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
