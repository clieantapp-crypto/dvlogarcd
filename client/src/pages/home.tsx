import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Wifi, Signal, Smartphone, Radio, Network, Rss, ArrowLeft } from "lucide-react";

export default function Home() {
  const articles = [
    {
      id: 1,
      title: "مستقبل شبكات الجيل الخامس في المنطقة العربية",
      excerpt: "تعرف على أحدث التطورات في تقنية 5G وكيف ستغير مستقبل الاتصالات في العالم العربي خلال السنوات القادمة.",
      icon: Signal,
    },
    {
      id: 2,
      title: "الألياف البصرية: ثورة في سرعة الإنترنت",
      excerpt: "اكتشف كيف تعمل تقنية الألياف البصرية وأهميتها في تحسين جودة الاتصالات والإنترنت المنزلي.",
      icon: Network,
    },
    {
      id: 3,
      title: "أفضل الهواتف الذكية لعام 2024",
      excerpt: "مراجعة شاملة لأحدث الهواتف الذكية مع التركيز على قدرات الاتصال والشبكات اللاسلكية.",
      icon: Smartphone,
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-50 bg-background">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/" data-testid="link-home-logo">
            <div className="flex items-center gap-2 cursor-pointer">
              <Radio className="w-6 h-6 text-primary" />
              <span className="font-semibold text-lg" data-testid="text-logo">مدونة الاتصالات العربية</span>
            </div>
          </Link>
          <nav className="flex items-center gap-2 flex-wrap">
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="link-nav-home">
                الرئيسية
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" size="sm" data-testid="link-nav-about">
                من نحن
              </Button>
            </Link>
            <Link href="/privacy">
              <Button variant="ghost" size="sm" data-testid="link-nav-privacy">
                سياسة الخصوصية
              </Button>
            </Link>
            <Link href="/terms">
              <Button variant="ghost" size="sm" data-testid="link-nav-terms">
                الشروط والأحكام
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="sm" data-testid="link-nav-contact">
                اتصل بنا
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wifi className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
              data-testid="text-hero-title"
            >
              مرحباً بكم في مدونة الاتصالات العربية
            </h1>
            <p 
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              data-testid="text-hero-subtitle"
            >
              مصدركم الموثوق لأحدث أخبار وتقنيات الاتصالات في العالم العربي. نغطي كل ما يتعلق بشبكات الجيل الخامس، الألياف البصرية، والهواتف الذكية.
            </p>
            <Link href="/about">
              <Button size="lg" data-testid="button-explore">
                اكتشف المزيد
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-card">
          <div className="max-w-7xl mx-auto px-4">
            <h2 
              className="text-3xl font-bold text-center mb-12"
              data-testid="text-features-title"
            >
              مجالات تغطيتنا
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border border-card-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Signal className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" data-testid="text-feature-5g-title">
                    تقنية الجيل الخامس 5G
                  </h3>
                  <p className="text-muted-foreground" data-testid="text-feature-5g-desc">
                    أحدث التطورات في شبكات الجيل الخامس وتأثيرها على مستقبل الاتصالات اللاسلكية وإنترنت الأشياء.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-card-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Network className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" data-testid="text-feature-fiber-title">
                    الألياف البصرية
                  </h3>
                  <p className="text-muted-foreground" data-testid="text-feature-fiber-desc">
                    كل ما تحتاج معرفته عن تقنية الألياف البصرية وكيف تُحدث ثورة في سرعات الإنترنت المنزلي والتجاري.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-card-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Smartphone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" data-testid="text-feature-mobile-title">
                    شبكات الهواتف المحمولة
                  </h3>
                  <p className="text-muted-foreground" data-testid="text-feature-mobile-desc">
                    مراجعات وأخبار أحدث الهواتف الذكية مع التركيز على قدرات الاتصال والتقنيات اللاسلكية.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between gap-4 mb-12 flex-wrap">
              <h2 
                className="text-3xl font-bold"
                data-testid="text-articles-title"
              >
                أحدث المقالات
              </h2>
              <Link href="/about">
                <Button variant="outline" data-testid="button-view-all">
                  عرض الكل
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article.id} className="border border-card-border hover-elevate" data-testid={`card-article-${article.id}`}>
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <article.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2" data-testid={`text-article-title-${article.id}`}>
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4" data-testid={`text-article-excerpt-${article.id}`}>
                      {article.excerpt}
                    </p>
                    <Button variant="ghost" size="sm" className="p-0" data-testid={`button-read-more-${article.id}`}>
                      <Rss className="w-4 h-4 ml-2" />
                      اقرأ المزيد
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-card">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 
              className="text-3xl font-bold mb-4"
              data-testid="text-cta-title"
            >
              ابق على اطلاع بأحدث أخبار الاتصالات
            </h2>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-cta-desc">
              تابعنا للحصول على أحدث الأخبار والتحليلات في عالم الاتصالات والتقنية. محتوى حصري ومراجعات موثوقة.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/contact">
                <Button size="lg" data-testid="button-subscribe">
                  تواصل معنا
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" data-testid="button-about-us">
                  تعرف علينا
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground" data-testid="text-copyright">
                © 2024 مدونة الاتصالات العربية. جميع الحقوق محفوظة.
              </span>
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <Link 
                href="/privacy" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-privacy"
              >
                سياسة الخصوصية
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-terms"
              >
                الشروط والأحكام
              </Link>
              <Link 
                href="/about" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-about"
              >
                من نحن
              </Link>
              <Link 
                href="/contact" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-contact"
              >
                اتصل بنا
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
