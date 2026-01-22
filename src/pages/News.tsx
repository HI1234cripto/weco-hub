import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NewsPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string | null;
  read_time: string;
  published_date: string;
}

const News = () => {
  const [newsItems, setNewsItems] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from("news_posts")
      .select("id, title, excerpt, content, category, image_url, read_time, published_date")
      .order("published_date", { ascending: false });

    if (!error && data) {
      setNewsItems(data);
    }
    setLoading(false);
  };

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

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <p className="text-muted-foreground">Loading news...</p>
      </div>
    );
  }

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
        {newsItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No news posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-card transition-all duration-300 hover:-translate-y-1 bg-card border-border cursor-pointer"
                onClick={() => setSelectedPost(item)}
              >
                <div className="relative h-48 overflow-hidden">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">No image</span>
                    </div>
                  )}
                  <Badge className={`absolute top-4 right-4 ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </Badge>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{item.published_date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{item.read_time}</span>
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
        )}

        {/* Post Detail Dialog */}
        <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedPost && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getCategoryColor(selectedPost.category)}>
                      {selectedPost.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {selectedPost.published_date} • {selectedPost.read_time}
                    </span>
                  </div>
                  <DialogTitle className="text-2xl">{selectedPost.title}</DialogTitle>
                </DialogHeader>
                {selectedPost.image_url && (
                  <div className="relative h-64 overflow-hidden rounded-lg my-4">
                    <img
                      src={selectedPost.image_url}
                      alt={selectedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="prose prose-sm max-w-none text-foreground">
                  <p className="text-muted-foreground font-medium mb-4">{selectedPost.excerpt}</p>
                  <div className="whitespace-pre-wrap">{selectedPost.content}</div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default News;
