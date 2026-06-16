import { useLanguage } from "@/contexts/LanguageContext";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { useSubmitContact } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactPage() {
  const { t, isRtl } = useLanguage();
  const { toast } = useToast();
  const submitContact = useSubmitContact();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    submitContact.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: t("Message sent!", "تم إرسال رسالتك!"),
            description: t("We'll get back to you shortly.", "سنرد عليك في أقرب وقت ممكن."),
          });
          form.reset();
        },
        onError: () => {
          toast({
            title: t("Error", "خطأ"),
            description: t("Failed to send message. Please try again.", "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى."),
            variant: "destructive",
          });
        }
      }
    );
  };

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              {t("Get in Touch", "تواصل معنا")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t(
                "Have a question about an order or want to become a partner? We'd love to hear from you.",
                "لديك سؤال حول طلب أو تريد الانضمام كشريك؟ يسعدنا تواصلك معنا."
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
            {/* Contact Info */}
            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-bold mb-6 border-b pb-4">{t("Contact Info", "معلومات الاتصال")}</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-foreground">7, 161 Street</p>
                      <p className="text-muted-foreground text-sm">Maadi, Cairo, Egypt, 11728</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-primary shrink-0" />
                    <p dir="ltr" className={`font-medium text-foreground ${isRtl ? 'text-right w-full' : ''}`}>
                      +20 10 27671111
                    </p>
                  </li>
                  <li className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-primary shrink-0" />
                    <p className="font-medium text-foreground">info@getmumm.com</p>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-6 border-b pb-4">{t("Follow Us", "تابعنا")}</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2 bg-card border rounded-3xl p-8 shadow-sm">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("Full Name", "الاسم الكامل")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("John Doe", "أحمد محمد")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("Email", "البريد الإلكتروني")}</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("Phone Number (Optional)", "رقم الهاتف (اختياري)")}</FormLabel>
                          <FormControl>
                            <Input placeholder="+20 100 000 0000" {...field} dir="ltr" className={isRtl ? 'text-right' : ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("Subject (Optional)", "الموضوع (اختياري)")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("How can we help?", "كيف يمكننا المساعدة؟")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("Message", "الرسالة")}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t("Tell us more...", "أخبرنا المزيد...")} 
                            className="min-h-[150px] resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full h-14 text-lg rounded-xl" disabled={submitContact.isPending}>
                    {submitContact.isPending ? t("Sending...", "جاري الإرسال...") : t("Send Message", "إرسال الرسالة")}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
