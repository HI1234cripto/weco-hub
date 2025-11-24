import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

const News = () => {
  const newsItems = [
    {
      title: "Spring Garden Project Launch",
      date: "March 15, 2024",
      category: "Project",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=400&fit=crop",
      excerpt: "WECO is excited to announce the launch of our new community garden project. Students will learn about sustainable growing practices while creating a green space for the school.",
      readTime: "3 min read",
    },
    {
      title: "Recycling Drive Success",
      date: "March 8, 2024",
      category: "Achievement",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=400&fit=crop",
      excerpt: "Our February recycling drive collected over 500kg of recyclable materials! Thank you to everyone who participated in making this our most successful drive yet.",
      readTime: "2 min read",
    },
    {
      title: "World Water Day Workshop",
      date: "March 1, 2024",
      category: "Event",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop",
      excerpt: "Join us for an interactive workshop on water conservation. Learn practical tips for reducing water waste at home and school. Open to all students.",
      readTime: "2 min read",
    },
    {
      title: "New Solar Panel Installation",
      date: "February 20, 2024",
      category: "Project",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop",
      excerpt: "Thanks to collaborative efforts with the school administration, we're installing solar panels on the main building. This will reduce our carbon footprint significantly.",
      readTime: "4 min read",
    },
    {
      title: "Beach Clean-Up Day",
      date: "February 10, 2024",
      category: "Event",
      image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&h=400&fit=crop",
      excerpt: "WECO members joined forces with local environmental groups for a coastal clean-up. Together, we collected over 100kg of waste from the shoreline.",
      readTime: "3 min read",
    },
    {
      title: "Zero Waste Challenge Begins",
      date: "February 1, 2024",
      category: "Initiative",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop",
      excerpt: "This month, we're challenging all students to reduce their waste. Track your progress and compete with classmates to see who can go the longest without sending waste to landfill.",
      readTime: "2 min read",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Project":
        return "bg-primary text-primary-foreground";
      case "Achievement":
        return "bg-accent text-accent-foreground";
      case "Event":
        return "bg-sky-blue text-white";
      case "Initiative":
        return "bg-eco-green text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-foreground">News & Events</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest WECO activities, achievements, and upcoming events
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-card transition-all duration-300 hover:-translate-y-1 bg-card border-border"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <Badge className={`absolute top-4 right-4 ${getCategoryColor(item.category)}`}>
                  {item.category}
                </Badge>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{item.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.excerpt}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
