import { Card } from "@/components/ui/card";
import { Users, Target, Heart, Award } from "lucide-react";
import aboutImage from "@/assets/about-eco.jpg";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Environmental Stewardship",
      description: "We take responsibility for protecting and preserving our planet for future generations.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe in the power of working together to create meaningful change.",
    },
    {
      icon: Heart,
      title: "Passion for Nature",
      description: "We're driven by a genuine love for the natural world and all its inhabitants.",
    },
    {
      icon: Award,
      title: "Educational Excellence",
      description: "We promote learning about sustainability through hands-on experience and research.",
    },
  ];

  const team = [
    {
      role: "President",
      name: "Leadership Team",
      description: "Coordinating club activities and initiatives",
    },
    {
      role: "Events Coordinator",
      name: "Events Team",
      description: "Planning and organizing eco-friendly events",
    },
    {
      role: "Communications",
      name: "Media Team",
      description: "Managing social media and awareness campaigns",
    },
    {
      role: "Projects Lead",
      name: "Action Team",
      description: "Leading hands-on environmental projects",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-20">
        <div className="absolute inset-0">
          <img
            src={aboutImage}
            alt="Environmental conservation activities"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About WECO</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100">
            A student-led initiative at Wychwood School dedicated to environmental sustainability and positive change
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Our Story */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center text-foreground">Our Story</h2>
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Founded by passionate students who wanted to make a real difference, WECO (Wychwood Eco Club) 
              has grown into a vibrant community of environmental advocates. What started as a small group 
              of friends discussing climate change has evolved into a school-wide movement.
            </p>
            <p>
              Today, we're proud to lead numerous sustainability initiatives across Wychwood School, from 
              reducing single-use plastics to creating biodiversity-friendly spaces on campus. Our members 
              come from all year groups, bringing diverse perspectives and ideas to our mission.
            </p>
            <p>
              We believe that young people have the power to drive change. Through education, action, and 
              collaboration with the wider community, we're working towards a more sustainable future for 
              everyone.
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-20 bg-eco-light py-16 -mx-4 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="p-6 text-center hover:shadow-card transition-all duration-300 hover:-translate-y-1 bg-card border-border"
                >
                  <div className="bg-gradient-eco w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Structure */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card
                key={index}
                className="p-6 bg-card border-border hover:shadow-card transition-all duration-300"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-eco rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-1">{member.role}</h3>
                  <p className="text-base font-medium text-foreground mb-2">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Join Us */}
        <section className="bg-gradient-eco text-white rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            WECO welcomes all students who are passionate about the environment. No experience necessary - 
            just bring your enthusiasm and ideas!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Weekly Meetings</h3>
              <p className="opacity-90">Every Thursday at lunch</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Get in Touch</h3>
              <p className="opacity-90">weco@wychwoodschool.org</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
