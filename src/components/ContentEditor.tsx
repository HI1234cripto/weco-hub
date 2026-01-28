import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSiteContent, useUpdateSiteContent, LandingHeroContent, AboutPageContent, FooterContent, SiteContent } from "@/hooks/useSiteContent";
import { Save, Loader2 } from "lucide-react";

const ContentEditor = () => {
  const { data: allContent, isLoading } = useSiteContent();
  const updateContent = useUpdateSiteContent();
  
  const [landingHero, setLandingHero] = useState<LandingHeroContent>({
    title: "",
    description: "",
    cta_primary: "",
    cta_secondary: "",
  });
  
  const [aboutPage, setAboutPage] = useState<AboutPageContent>({
    title: "",
    subtitle: "",
    description: "",
    mission_title: "",
    mission_description: "",
    values: [],
  });
  
  const [footer, setFooter] = useState<FooterContent>({
    description: "",
    contact_name: "",
    contact_email: "",
    copyright: "",
  });

  useEffect(() => {
    if (allContent && Array.isArray(allContent)) {
      allContent.forEach((item: SiteContent) => {
        if (item.section_key === "landing_hero") {
          setLandingHero(item.content as LandingHeroContent);
        } else if (item.section_key === "about_page") {
          setAboutPage(item.content as AboutPageContent);
        } else if (item.section_key === "footer") {
          setFooter(item.content as FooterContent);
        }
      });
    }
  }, [allContent]);

  const handleSaveLandingHero = () => {
    updateContent.mutate({ sectionKey: "landing_hero", content: landingHero });
  };

  const handleSaveAboutPage = () => {
    updateContent.mutate({ sectionKey: "about_page", content: aboutPage });
  };

  const handleSaveFooter = () => {
    updateContent.mutate({ sectionKey: "footer", content: footer });
  };

  const handleValuesChange = (index: number, value: string) => {
    const newValues = [...aboutPage.values];
    newValues[index] = value;
    setAboutPage({ ...aboutPage, values: newValues });
  };

  const addValue = () => {
    setAboutPage({ ...aboutPage, values: [...aboutPage.values, ""] });
  };

  const removeValue = (index: number) => {
    const newValues = aboutPage.values.filter((_, i) => i !== index);
    setAboutPage({ ...aboutPage, values: newValues });
  };

  if (isLoading) {
    return (
      <Card className="p-8 text-center bg-card border-border">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="mt-4 text-muted-foreground">Loading content...</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="w-full">
        {/* Landing Page Hero */}
        <AccordionItem value="landing-hero">
          <AccordionTrigger className="text-lg font-semibold">
            Landing Page Hero
          </AccordionTrigger>
          <AccordionContent>
            <Card className="p-6 bg-card border-border space-y-4">
              <div>
                <Label htmlFor="hero-title">Hero Title</Label>
                <Input
                  id="hero-title"
                  value={landingHero.title}
                  onChange={(e) => setLandingHero({ ...landingHero, title: e.target.value })}
                  maxLength={100}
                />
              </div>
              <div>
                <Label htmlFor="hero-description">Hero Description</Label>
                <Textarea
                  id="hero-description"
                  value={landingHero.description}
                  onChange={(e) => setLandingHero({ ...landingHero, description: e.target.value })}
                  maxLength={300}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cta-primary">Primary Button Text</Label>
                  <Input
                    id="cta-primary"
                    value={landingHero.cta_primary}
                    onChange={(e) => setLandingHero({ ...landingHero, cta_primary: e.target.value })}
                    maxLength={30}
                  />
                </div>
                <div>
                  <Label htmlFor="cta-secondary">Secondary Button Text</Label>
                  <Input
                    id="cta-secondary"
                    value={landingHero.cta_secondary}
                    onChange={(e) => setLandingHero({ ...landingHero, cta_secondary: e.target.value })}
                    maxLength={30}
                  />
                </div>
              </div>
              <Button 
                onClick={handleSaveLandingHero} 
                disabled={updateContent.isPending}
                className="w-full"
              >
                {updateContent.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Landing Hero
              </Button>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* About Page */}
        <AccordionItem value="about-page">
          <AccordionTrigger className="text-lg font-semibold">
            About Page
          </AccordionTrigger>
          <AccordionContent>
            <Card className="p-6 bg-card border-border space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="about-title">Page Title</Label>
                  <Input
                    id="about-title"
                    value={aboutPage.title}
                    onChange={(e) => setAboutPage({ ...aboutPage, title: e.target.value })}
                    maxLength={50}
                  />
                </div>
                <div>
                  <Label htmlFor="about-subtitle">Subtitle</Label>
                  <Input
                    id="about-subtitle"
                    value={aboutPage.subtitle}
                    onChange={(e) => setAboutPage({ ...aboutPage, subtitle: e.target.value })}
                    maxLength={100}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="about-description">Description</Label>
                <Textarea
                  id="about-description"
                  value={aboutPage.description}
                  onChange={(e) => setAboutPage({ ...aboutPage, description: e.target.value })}
                  maxLength={500}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="mission-title">Mission Title</Label>
                <Input
                  id="mission-title"
                  value={aboutPage.mission_title}
                  onChange={(e) => setAboutPage({ ...aboutPage, mission_title: e.target.value })}
                  maxLength={50}
                />
              </div>
              <div>
                <Label htmlFor="mission-description">Mission Description</Label>
                <Textarea
                  id="mission-description"
                  value={aboutPage.mission_description}
                  onChange={(e) => setAboutPage({ ...aboutPage, mission_description: e.target.value })}
                  maxLength={500}
                  rows={3}
                />
              </div>
              <div>
                <Label>Values (displayed as tags)</Label>
                <div className="space-y-2 mt-2">
                  {aboutPage.values.map((value, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={value}
                        onChange={(e) => handleValuesChange(index, e.target.value)}
                        maxLength={50}
                        placeholder={`Value ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeValue(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addValue}>
                    Add Value
                  </Button>
                </div>
              </div>
              <Button 
                onClick={handleSaveAboutPage} 
                disabled={updateContent.isPending}
                className="w-full"
              >
                {updateContent.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save About Page
              </Button>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Footer */}
        <AccordionItem value="footer">
          <AccordionTrigger className="text-lg font-semibold">
            Footer
          </AccordionTrigger>
          <AccordionContent>
            <Card className="p-6 bg-card border-border space-y-4">
              <div>
                <Label htmlFor="footer-description">Footer Description</Label>
                <Textarea
                  id="footer-description"
                  value={footer.description}
                  onChange={(e) => setFooter({ ...footer, description: e.target.value })}
                  maxLength={200}
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-name">Contact Name</Label>
                  <Input
                    id="contact-name"
                    value={footer.contact_name}
                    onChange={(e) => setFooter({ ...footer, contact_name: e.target.value })}
                    maxLength={50}
                  />
                </div>
                <div>
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={footer.contact_email}
                    onChange={(e) => setFooter({ ...footer, contact_email: e.target.value })}
                    maxLength={100}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="copyright">Copyright Text</Label>
                <Input
                  id="copyright"
                  value={footer.copyright}
                  onChange={(e) => setFooter({ ...footer, copyright: e.target.value })}
                  maxLength={100}
                />
              </div>
              <Button 
                onClick={handleSaveFooter} 
                disabled={updateContent.isPending}
                className="w-full"
              >
                {updateContent.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Footer
              </Button>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ContentEditor;
