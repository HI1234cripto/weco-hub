import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Droplet, Recycle, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-eco.jpg";

const Landing = () => {
  const initiatives = [
    {
      icon: Recycle,
      title: "Recycling Programs",
      description: "Leading school-wide recycling and waste reduction initiatives",
    },
    {
      icon: Droplet,
      title: "Water Conservation",
      description: "Implementing water-saving measures across campus",
    },
    {
      icon: Leaf,
      title: "Green Spaces",
      description: "Creating and maintaining sustainable gardens and habitats",
    },
    {
      icon: Users,
      title: "Community Action",
      description: "Engaging students and local community in environmental projects",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Students working together on environmental projects"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Together for a
            <span className="block mt-2 bg-gradient-to-r from-teal-300 to-green-300 bg-clip-text text-transparent">
              Greener Tomorrow
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-100 animate-slide-up">
            Wychwood Eco Club - Empowering students to create positive environmental change
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              <Link to="/about">
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
              <Link to="/news">Latest News</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-eco-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At WECO, we believe that small actions can create big change. We're dedicated to 
              fostering environmental awareness and taking practical steps to make our school 
              and community more sustainable. Through education, collaboration, and hands-on 
              projects, we're building a greener future together.
            </p>
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {initiatives.map((initiative, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-border bg-card"
              >
                <div className="bg-gradient-eco w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <initiative.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{initiative.title}</h3>
                <p className="text-muted-foreground">{initiative.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-eco text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Get Involved</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join us in making a difference. Every student can contribute to creating 
            a more sustainable future for our school and planet.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 font-semibold">
            <Link to="/about">
              Join WECO Today <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
