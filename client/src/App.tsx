import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Radio, ArrowRight, Mail, Clock, MessageSquare, Users, Target, Eye, Newspaper, FileText, BarChart3, BookOpen, Heart, Shield, Lightbulb, Share2, HelpCircle } from "lucide-react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Admin from "@/pages/admin";

function PageLayout({ title, children }: { title: string; children: React.ReactNode }) {
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

      <main className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8" data-testid="text-page-title">{title}</h1>
          {children}
          <div className="mt-12">
            <Link href="/">
              <Button variant="outline" data-testid="button-back-home">
                <ArrowRight className="w-4 h-4 ml-2" />
                العودة للرئيسية
              </Button>
            </Link>
          </div>
        </div>
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

function About() {
  return (
    <PageLayout title="من نحن">
      <div className="prose prose-lg max-w-none" data-testid="content-about">
        
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">من نحن</h2>
            <p className="text-muted-foreground">
              مدونة الاتصالات العربية هي منصة رقمية متخصصة تأسست لتكون المصدر الأول والأشمل لأخبار وتحليلات قطاع الاتصالات في العالم العربي. نسعى لتقديم محتوى عالي الجودة باللغة العربية يواكب أحدث التطورات التقنية في مجال الاتصالات والشبكات والهواتف الذكية.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Eye className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">رؤيتنا</h2>
            <p className="text-muted-foreground">
              نطمح أن نكون المرجع الأول للمحتوى العربي المتخصص في مجال الاتصالات والتقنية، وأن نساهم في نشر الوعي التقني وتمكين القارئ العربي من فهم التحولات الرقمية التي تشهدها المنطقة والعالم.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">مهمتنا</h2>
            <p className="text-muted-foreground">
              مهمتنا هي سد الفجوة المعرفية في مجال الاتصالات والتقنية للقارئ العربي من خلال تقديم محتوى موثوق ومبسط يساعد على فهم التقنيات الحديثة مثل شبكات الجيل الخامس 5G والألياف البصرية وإنترنت الأشياء والذكاء الاصطناعي في الاتصالات.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">ما نقدمه</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-card-border">
            <Newspaper className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">أخبار الاتصالات</h3>
              <p className="text-sm text-muted-foreground">تغطية شاملة لأحدث أخبار قطاع الاتصالات في المنطقة العربية والعالم</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-card-border">
            <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">مراجعات تقنية</h3>
              <p className="text-sm text-muted-foreground">مراجعات متعمقة للأجهزة والتقنيات الجديدة في عالم الاتصالات</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-card-border">
            <BarChart3 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">تحليلات السوق</h3>
              <p className="text-sm text-muted-foreground">تحليلات معمقة لاتجاهات سوق الاتصالات وتوقعات المستقبل</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-card-border">
            <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">أدلة تعليمية</h3>
              <p className="text-sm text-muted-foreground">شروحات مبسطة للتقنيات المعقدة تناسب جميع المستويات</p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">فريقنا</h2>
            <p className="text-muted-foreground">
              يتكون فريقنا من مجموعة من الخبراء والمتخصصين في مجال الاتصالات والتقنية، يجمعهم شغف بنقل المعرفة التقنية للقارئ العربي. يضم فريقنا مهندسي اتصالات ومحللين تقنيين وكتّاب محتوى متخصصين يعملون معًا لتقديم محتوى دقيق وموثوق ومحدث باستمرار.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">قيمنا</h2>
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">الدقة والموثوقية</h3>
              <p className="text-sm text-muted-foreground">نلتزم بتقديم معلومات دقيقة ومُحققة من مصادر موثوقة</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">الشفافية</h3>
              <p className="text-sm text-muted-foreground">نتحلى بالشفافية في جميع محتوياتنا وعلاقاتنا مع قرائنا وشركائنا</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">الابتكار</h3>
              <p className="text-sm text-muted-foreground">نسعى دائمًا لتطوير محتوانا وأساليب تقديمه بطرق مبتكرة</p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Share2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">تواصل معنا</h2>
            <p className="text-muted-foreground">
              نرحب بتواصلكم واقتراحاتكم. تابعونا على منصات التواصل الاجتماعي أو راسلونا عبر صفحة الاتصال للمشاركة في رحلتنا نحو نشر المعرفة التقنية باللغة العربية.
            </p>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}

function Privacy() {
  return (
    <PageLayout title="سياسة الخصوصية">
      <div className="prose prose-lg max-w-none" data-testid="content-privacy">
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">مقدمة</h2>
        <p className="text-muted-foreground mb-6">
          نحن في مدونة الاتصالات العربية نلتزم بحماية خصوصية زوارنا ومستخدمينا. تشرح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا للمعلومات التي نحصل عليها من خلال موقعنا الإلكتروني. نحثكم على قراءة هذه السياسة بعناية لفهم ممارساتنا فيما يتعلق ببياناتكم الشخصية.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">المعلومات التي نجمعها</h2>
        <p className="text-muted-foreground mb-4">
          نقوم بجمع أنواع مختلفة من المعلومات لتوفير خدماتنا وتحسينها:
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">معلومات التصفح</h3>
        <p className="text-muted-foreground mb-4">
          نجمع معلومات حول كيفية تفاعلك مع موقعنا، بما في ذلك الصفحات التي تزورها، والوقت الذي تقضيه في كل صفحة، والروابط التي تنقر عليها، ومصدر الإحالة الذي أوصلك إلى موقعنا.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">ملفات تعريف الارتباط</h3>
        <p className="text-muted-foreground mb-4">
          نستخدم ملفات تعريف الارتباط (الكوكيز) وتقنيات تتبع مماثلة لجمع معلومات حول نشاط التصفح الخاص بك. تساعدنا هذه الملفات في تذكر تفضيلاتك وتحسين تجربتك على الموقع.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">معلومات الجهاز</h3>
        <p className="text-muted-foreground mb-6">
          نجمع معلومات تقنية عن الجهاز الذي تستخدمه للوصول إلى موقعنا، مثل نوع المتصفح، ونظام التشغيل، ودقة الشاشة، وعنوان بروتوكول الإنترنت (IP)، ومعرفات الجهاز الفريدة.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">كيف نستخدم المعلومات</h2>
        <p className="text-muted-foreground mb-4">
          نستخدم المعلومات التي نجمعها للأغراض التالية:
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">تحسين المحتوى</h3>
        <p className="text-muted-foreground mb-4">
          نستخدم بيانات التصفح لفهم اهتمامات زوارنا وتقديم محتوى أكثر صلة وفائدة في مجال الاتصالات والتقنية.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">تحليل الأداء</h3>
        <p className="text-muted-foreground mb-4">
          نحلل كيفية استخدام الزوار لموقعنا لتحسين أداء الموقع وسرعته وتجربة المستخدم العامة.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">تخصيص الإعلانات</h3>
        <p className="text-muted-foreground mb-6">
          نستخدم المعلومات المجمعة لعرض إعلانات مخصصة تتناسب مع اهتماماتك، مما يساعد في دعم موقعنا ماليًا وتقديم تجربة إعلانية أفضل.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">الإعلانات وجوجل أدسنس</h2>
        <p className="text-muted-foreground mb-4">
          يستخدم موقعنا خدمة جوجل أدسنس (Google AdSense) لعرض الإعلانات. جوجل أدسنس هي خدمة إعلانية تقدمها شركة جوجل تسمح لنا بعرض إعلانات على موقعنا.
        </p>
        <p className="text-muted-foreground mb-4">
          تستخدم جوجل وشركاؤها في مجال الإعلانات ملفات تعريف الارتباط لعرض إعلانات مخصصة بناءً على زياراتك السابقة لموقعنا أو مواقع أخرى على الإنترنت. تمكّن ملفات تعريف الارتباط هذه جوجل وشركائها من تقديم إعلانات تتناسب مع اهتماماتك.
        </p>
        <p className="text-muted-foreground mb-4">
          يمكنك الاطلاع على سياسة خصوصية جوجل من خلال زيارة:{" "}
          <a 
            href="https://policies.google.com/privacy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
            data-testid="link-google-privacy"
          >
            https://policies.google.com/privacy
          </a>
        </p>
        <p className="text-muted-foreground mb-6">
          إذا كنت ترغب في إلغاء الاشتراك في الإعلانات المخصصة، يمكنك القيام بذلك من خلال زيارة صفحة إعدادات الإعلانات من جوجل:{" "}
          <a 
            href="https://www.google.com/settings/ads" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
            data-testid="link-google-ads-settings"
          >
            https://www.google.com/settings/ads
          </a>
          {" "}أو يمكنك زيارة موقع aboutads.info للحصول على معلومات حول كيفية إلغاء الاشتراك في استخدام ملفات تعريف الارتباط من قبل البائعين الخارجيين.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">ملفات تعريف الارتباط (الكوكيز)</h2>
        <p className="text-muted-foreground mb-4">
          ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم تخزينها على جهازك عند زيارة موقعنا. نستخدم أنواعًا مختلفة من ملفات تعريف الارتباط:
        </p>
        <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
          <li><strong>ملفات تعريف الارتباط الأساسية:</strong> ضرورية لتشغيل الموقع وتمكين الوظائف الأساسية.</li>
          <li><strong>ملفات تعريف الارتباط التحليلية:</strong> تساعدنا في فهم كيفية استخدام الزوار للموقع.</li>
          <li><strong>ملفات تعريف الارتباط الإعلانية:</strong> تُستخدم لعرض إعلانات مخصصة وقياس فعالية الحملات الإعلانية.</li>
          <li><strong>ملفات تعريف الارتباط الخاصة بالطرف الثالث:</strong> تُستخدم من قبل شركائنا الإعلانيين مثل جوجل.</li>
        </ul>
        <p className="text-muted-foreground mb-6">
          يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات متصفحك. يرجى ملاحظة أن تعطيل بعض ملفات تعريف الارتباط قد يؤثر على وظائف الموقع وتجربة التصفح الخاصة بك.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">حقوق المستخدم</h2>
        <p className="text-muted-foreground mb-4">
          لديك حقوق معينة فيما يتعلق ببياناتك الشخصية:
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">حق الوصول للمعلومات</h3>
        <p className="text-muted-foreground mb-4">
          لديك الحق في طلب نسخة من المعلومات الشخصية التي نحتفظ بها عنك.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">حق التصحيح</h3>
        <p className="text-muted-foreground mb-4">
          لديك الحق في طلب تصحيح أي معلومات غير دقيقة أو غير كاملة نحتفظ بها عنك.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">حق الحذف</h3>
        <p className="text-muted-foreground mb-4">
          لديك الحق في طلب حذف معلوماتك الشخصية في ظروف معينة.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">حق إلغاء الاشتراك</h3>
        <p className="text-muted-foreground mb-6">
          لديك الحق في إلغاء الاشتراك في الإعلانات المخصصة وبعض أنشطة جمع البيانات. يمكنك ممارسة هذا الحق من خلال إعدادات المتصفح أو من خلال الروابط المذكورة أعلاه.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">أمان المعلومات</h2>
        <p className="text-muted-foreground mb-6">
          نتخذ إجراءات أمنية مناسبة لحماية المعلومات التي نجمعها من الوصول غير المصرح به أو التعديل أو الإفصاح أو التدمير. نستخدم تقنيات التشفير والخوادم الآمنة لضمان سلامة بياناتك. ومع ذلك، يرجى ملاحظة أنه لا توجد طريقة نقل عبر الإنترنت أو طريقة تخزين إلكتروني آمنة بنسبة 100%.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">تحديث السياسة</h2>
        <p className="text-muted-foreground mb-6">
          قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر لتعكس التغييرات في ممارساتنا أو لأسباب تشغيلية أو قانونية أو تنظيمية. سننشر أي تغييرات على هذه الصفحة ونشجعك على مراجعة سياسة الخصوصية بشكل دوري للبقاء على اطلاع بكيفية حمايتنا لمعلوماتك. تاريخ آخر تحديث سيكون مذكورًا في أعلى هذه الصفحة.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">اتصل بنا</h2>
        <p className="text-muted-foreground mb-4">
          إذا كانت لديك أي أسئلة أو استفسارات حول سياسة الخصوصية هذه أو ممارساتنا فيما يتعلق ببياناتك الشخصية، يرجى التواصل معنا عبر:
        </p>
        <p className="text-muted-foreground mb-2">
          البريد الإلكتروني: privacy@arabictelecom.blog
        </p>
        <p className="text-muted-foreground">
          أو من خلال صفحة "اتصل بنا" على موقعنا.
        </p>
      </div>
    </PageLayout>
  );
}

function Terms() {
  return (
    <PageLayout title="الشروط والأحكام">
      <div className="prose prose-lg max-w-none" data-testid="content-terms">
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">مقدمة</h2>
        <p className="text-muted-foreground mb-6">
          مرحبًا بكم في موقع مدونة الاتصالات العربية. باستخدامك لهذا الموقع الإلكتروني، فإنك توافق على الالتزام بهذه الشروط والأحكام وجميع القوانين واللوائح المعمول بها. إذا كنت لا توافق على أي من هذه الشروط، يُرجى عدم استخدام هذا الموقع. نحتفظ بالحق في تعديل هذه الشروط في أي وقت، واستمرارك في استخدام الموقع بعد أي تعديلات يعني موافقتك على الشروط المعدلة.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">تعريفات</h2>
        <p className="text-muted-foreground mb-4">
          لأغراض هذه الشروط والأحكام، تُطبق التعريفات التالية:
        </p>
        <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
          <li><strong>"الموقع":</strong> يشير إلى موقع مدونة الاتصالات العربية وجميع صفحاته ومحتوياته.</li>
          <li><strong>"المستخدم" أو "أنت":</strong> يشير إلى أي شخص يصل إلى الموقع أو يستخدمه.</li>
          <li><strong>"نحن" أو "إدارة الموقع":</strong> يشير إلى مالكي ومشغلي موقع مدونة الاتصالات العربية.</li>
          <li><strong>"المحتوى":</strong> يشمل جميع النصوص والصور والرسومات والفيديوهات والمواد الأخرى المتاحة على الموقع.</li>
          <li><strong>"الخدمات":</strong> تشير إلى جميع الخدمات والمعلومات المقدمة من خلال الموقع.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">استخدام الموقع</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">الاستخدام المسموح به</h3>
        <p className="text-muted-foreground mb-4">
          يُسمح لك باستخدام هذا الموقع للأغراض التالية:
        </p>
        <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
          <li>تصفح وقراءة المحتوى المتاح للأغراض الشخصية والتعليمية.</li>
          <li>مشاركة روابط المقالات على وسائل التواصل الاجتماعي مع الإشارة للمصدر.</li>
          <li>الاقتباس من المحتوى بشكل معقول مع ذكر المصدر والرابط.</li>
          <li>التواصل معنا عبر قنوات الاتصال المتاحة.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">الاستخدام المحظور</h3>
        <p className="text-muted-foreground mb-4">
          يُحظر عليك القيام بأي من الأفعال التالية:
        </p>
        <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
          <li>نسخ أو إعادة نشر المحتوى دون إذن كتابي مسبق.</li>
          <li>استخدام الموقع لأي أغراض غير قانونية أو غير مصرح بها.</li>
          <li>محاولة الوصول غير المصرح به إلى أي جزء من الموقع أو أنظمتنا.</li>
          <li>نشر أو توزيع أي برمجيات ضارة أو فيروسات.</li>
          <li>التدخل في عمل الموقع أو تعطيله بأي شكل.</li>
          <li>جمع معلومات المستخدمين الآخرين دون موافقتهم.</li>
          <li>استخدام أي وسيلة آلية لاستخراج البيانات من الموقع.</li>
          <li>انتحال هوية أي شخص أو جهة أو تقديم معلومات مضللة.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">حقوق الملكية الفكرية</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">ملكية المحتوى</h3>
        <p className="text-muted-foreground mb-6">
          جميع المحتويات المنشورة على هذا الموقع، بما في ذلك على سبيل المثال لا الحصر: المقالات، الصور، الرسومات، التصاميم، الشعارات، مقاطع الفيديو، والنصوص، هي ملك لموقع مدونة الاتصالات العربية أو لأصحابها المرخصين. جميع هذه المحتويات محمية بموجب قوانين حقوق الطبع والنشر وحقوق الملكية الفكرية المعمول بها.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">العلامات التجارية</h3>
        <p className="text-muted-foreground mb-6">
          اسم "مدونة الاتصالات العربية" والشعار المرتبط به هي علامات تجارية مملوكة لنا. لا يجوز استخدام أي من علاماتنا التجارية دون الحصول على إذن كتابي مسبق. جميع العلامات التجارية الأخرى المذكورة على الموقع هي ملك لأصحابها المعنيين.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">قيود الاستخدام</h3>
        <p className="text-muted-foreground mb-4">
          لا يجوز للمستخدم القيام بأي من الأفعال التالية دون الحصول على إذن كتابي مسبق:
        </p>
        <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
          <li>إعادة إنتاج أو توزيع أو نشر أي محتوى من الموقع.</li>
          <li>تعديل أو اشتقاق أعمال من محتوى الموقع.</li>
          <li>استخدام المحتوى لأغراض تجارية.</li>
          <li>إزالة أي إشارات لحقوق الطبع والنشر أو العلامات التجارية.</li>
          <li>نقل المحتوى إلى شخص آخر أو "عكسه" على أي خادم آخر.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">المحتوى المقدم من المستخدمين</h2>
        <p className="text-muted-foreground mb-4">
          في حال سمح الموقع للمستخدمين بتقديم محتوى (مثل التعليقات أو المشاركات)، فإنك توافق على ما يلي:
        </p>
        <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
          <li>أنت المسؤول الوحيد عن أي محتوى تقدمه.</li>
          <li>تمنحنا ترخيصًا غير حصري وعالمي ومجاني لاستخدام محتواك.</li>
          <li>لن تقدم أي محتوى مسيء أو غير قانوني أو ينتهك حقوق الآخرين.</li>
          <li>نحتفظ بالحق في إزالة أي محتوى نعتبره غير مناسب دون إشعار مسبق.</li>
          <li>لا نتحمل أي مسؤولية عن المحتوى المقدم من المستخدمين.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">الروابط الخارجية</h2>
        <p className="text-muted-foreground mb-6">
          قد يحتوي موقعنا على روابط لمواقع إلكترونية خارجية تديرها أطراف ثالثة. هذه الروابط مقدمة لراحتك ولا تعني تأييدنا أو موافقتنا على محتوى تلك المواقع. نحن لا نتحكم في محتوى أو سياسات هذه المواقع الخارجية ولا نتحمل أي مسؤولية عنها. ننصحك بمراجعة شروط الاستخدام وسياسات الخصوصية لأي موقع خارجي تزوره من خلال روابطنا.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">الإعلانات</h2>
        <p className="text-muted-foreground mb-4">
          يستخدم موقعنا خدمات إعلانية من أطراف ثالثة، بما في ذلك خدمة جوجل أدسنس (Google AdSense)، لعرض الإعلانات. باستخدامك لهذا الموقع، فإنك توافق على عرض الإعلانات.
        </p>
        <p className="text-muted-foreground mb-4">
          يُرجى ملاحظة ما يلي بخصوص الإعلانات:
        </p>
        <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
          <li>قد تستخدم جوجل وشركاؤها الإعلانيون ملفات تعريف الارتباط لعرض إعلانات مخصصة بناءً على تصفحك.</li>
          <li>لا نتحكم في محتوى الإعلانات المعروضة من قبل الأطراف الثالثة.</li>
          <li>لا نؤيد أو نضمن أي منتجات أو خدمات معلن عنها على موقعنا.</li>
          <li>التفاعل مع أي إعلان هو على مسؤوليتك الشخصية.</li>
          <li>يمكنك إلغاء الاشتراك في الإعلانات المخصصة من خلال إعدادات إعلانات جوجل.</li>
        </ul>
        <p className="text-muted-foreground mb-6">
          للمزيد من المعلومات حول كيفية استخدام جوجل للبيانات، يُرجى زيارة:{" "}
          <a 
            href="https://policies.google.com/technologies/partner-sites" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
            data-testid="link-google-partner-sites"
          >
            https://policies.google.com/technologies/partner-sites
          </a>
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">إخلاء المسؤولية</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">المحتوى للأغراض المعلوماتية فقط</h3>
        <p className="text-muted-foreground mb-6">
          جميع المعلومات والمحتويات المقدمة على هذا الموقع هي لأغراض تعليمية ومعلوماتية فقط. لا ينبغي اعتبار أي محتوى على هذا الموقع بمثابة نصيحة مهنية أو تقنية أو قانونية أو مالية. ننصحك باستشارة المتخصصين المؤهلين للحصول على نصائح محددة تتعلق بحالتك الخاصة.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">لا ضمان على الدقة</h3>
        <p className="text-muted-foreground mb-6">
          على الرغم من أننا نسعى جاهدين لتوفير معلومات دقيقة ومحدثة، إلا أننا لا نقدم أي ضمانات أو تعهدات، صريحة أو ضمنية، فيما يتعلق باكتمال أو دقة أو موثوقية أو ملاءمة أو توفر المعلومات أو المنتجات أو الخدمات أو الرسومات ذات الصلة المضمنة في الموقع. نحن لا نتحمل أي مسؤولية عن أي أخطاء أو سهو في المحتوى.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">تحديد المسؤولية</h2>
        <p className="text-muted-foreground mb-4">
          إلى أقصى حد يسمح به القانون المعمول به:
        </p>
        <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
          <li>لن نكون مسؤولين عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو خاصة أو تبعية ناتجة عن استخدامك للموقع.</li>
          <li>لا نتحمل المسؤولية عن أي انقطاع أو تأخير أو عدم توفر الموقع.</li>
          <li>لا نتحمل المسؤولية عن أي خسارة في البيانات أو الأرباح.</li>
          <li>لا نتحمل المسؤولية عن أي فيروسات أو برمجيات ضارة قد تصيب جهازك.</li>
          <li>لا نتحمل المسؤولية عن أي قرارات تتخذها بناءً على المعلومات الموجودة على الموقع.</li>
        </ul>
        <p className="text-muted-foreground mb-6">
          أنت توافق على تعويضنا وحمايتنا من أي مطالبات أو خسائر أو أضرار أو نفقات (بما في ذلك أتعاب المحاماة) الناشئة عن استخدامك للموقع أو انتهاكك لهذه الشروط.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">التعديلات على الشروط</h2>
        <p className="text-muted-foreground mb-6">
          نحتفظ بالحق في تعديل أو تحديث هذه الشروط والأحكام في أي وقت ودون إشعار مسبق. ستكون التعديلات سارية فور نشرها على هذه الصفحة. تاريخ آخر تحديث سيُذكر في أعلى هذه الصفحة. استمرارك في استخدام الموقع بعد نشر أي تعديلات يعني موافقتك على الشروط المعدلة. ننصحك بمراجعة هذه الصفحة بشكل دوري للاطلاع على أي تحديثات.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">القانون المعمول به</h2>
        <p className="text-muted-foreground mb-6">
          تخضع هذه الشروط والأحكام وتُفسر وفقًا للقوانين المعمول بها. أي نزاع ينشأ عن أو يتعلق بهذه الشروط أو استخدام الموقع سيخضع للاختصاص القضائي الحصري للمحاكم المختصة. إذا تم اعتبار أي حكم من أحكام هذه الشروط غير قانوني أو باطل أو غير قابل للتنفيذ، فإن ذلك الحكم سيُفصل عن باقي الشروط ولن يؤثر على صحة وقابلية تنفيذ الأحكام المتبقية.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">اتصل بنا</h2>
        <p className="text-muted-foreground mb-4">
          إذا كانت لديك أي أسئلة أو استفسارات حول هذه الشروط والأحكام، يُرجى التواصل معنا عبر:
        </p>
        <p className="text-muted-foreground mb-2">
          البريد الإلكتروني: legal@arabictelecom.blog
        </p>
        <p className="text-muted-foreground mb-6">
          أو من خلال صفحة "اتصل بنا" على موقعنا. سنسعى للرد على استفساراتكم في أقرب وقت ممكن.
        </p>

      </div>
    </PageLayout>
  );
}

function Contact() {
  return (
    <PageLayout title="اتصل بنا">
      <div className="prose prose-lg max-w-none" data-testid="content-contact">
        
        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-muted-foreground">
              نسعد بتواصلكم معنا ونرحب بجميع استفساراتكم ومقترحاتكم. فريقنا متاح للرد على رسائلكم ومساعدتكم في أي وقت. اختاروا الطريقة المناسبة للتواصل معنا.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">البريد الإلكتروني</h2>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-card border border-card-border">
                <p className="font-medium mb-1">للاستفسارات العامة</p>
                <p className="text-sm text-muted-foreground">info@arabictelecom.blog</p>
              </div>
              <div className="p-3 rounded-lg bg-card border border-card-border">
                <p className="font-medium mb-1">للتعاون والإعلانات</p>
                <p className="text-sm text-muted-foreground">ads@arabictelecom.blog</p>
              </div>
              <div className="p-3 rounded-lg bg-card border border-card-border">
                <p className="font-medium mb-1">لإرسال المقالات والمحتوى</p>
                <p className="text-sm text-muted-foreground">content@arabictelecom.blog</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">أوقات الرد</h2>
            <p className="text-muted-foreground mb-2">
              نحرص على الرد على جميع الرسائل في أسرع وقت ممكن:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>الاستفسارات العامة: خلال 24-48 ساعة عمل</li>
              <li>طلبات الإعلانات والتعاون: خلال 2-3 أيام عمل</li>
              <li>إرسال المحتوى: خلال أسبوع واحد</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Share2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">وسائل التواصل الاجتماعي</h2>
            <p className="text-muted-foreground mb-3">
              تابعونا على منصات التواصل الاجتماعي للحصول على آخر الأخبار والتحديثات الفورية:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>تويتر (X): للأخبار العاجلة والتحديثات السريعة</li>
              <li>فيسبوك: للمقالات والنقاشات المجتمعية</li>
              <li>لينكد إن: للمحتوى المهني والتقني</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">الأسئلة الشائعة</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">هل يمكنني نشر مقال على المدونة؟</h3>
                <p className="text-sm text-muted-foreground">نعم، نرحب بمساهمات الكتّاب المتخصصين. أرسل مقالك إلى content@arabictelecom.blog مع نبذة عنك.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">كيف يمكنني الإعلان على الموقع؟</h3>
                <p className="text-sm text-muted-foreground">للاستفسار عن فرص الإعلان والتعاون، تواصل معنا عبر ads@arabictelecom.blog.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">هل المحتوى مجاني بالكامل؟</h3>
                <p className="text-sm text-muted-foreground">نعم، جميع المقالات والمحتوى على المدونة متاح مجانًا للقراءة.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">اقتراحات المحتوى</h2>
            <p className="text-muted-foreground">
              هل لديك موضوع تود أن نغطيه؟ نرحب باقتراحاتكم لمواضيع جديدة في مجال الاتصالات والتقنية. شاركونا أفكاركم عبر البريد الإلكتروني أو منصات التواصل الاجتماعي، وسنسعى لتغطية المواضيع التي تهمكم.
            </p>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/about" component={About} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
