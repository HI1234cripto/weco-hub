import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";
import { z } from "zod";

const newsPostSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  excerpt: z.string().trim().min(1, "Excerpt is required").max(500),
  content: z.string().trim().min(1, "Content is required").max(10000),
  category: z.string().min(1, "Category is required"),
  image_url: z.string().trim().url("Must be a valid URL").max(500),
  read_time: z.string().trim().min(1, "Read time is required").max(20),
  published_date: z.string().min(1, "Date is required"),
});

interface NewsPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string;
  read_time: string;
  published_date: string;
}

const Admin = () => {
  const { isAdmin, loading: authLoading, user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Project",
    image_url: "",
    read_time: "3 min read",
    published_date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/");
      toast.error("Access denied. Admin only.");
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchPosts();
    }
  }, [isAdmin]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("news_posts")
      .select("*")
      .order("published_date", { ascending: false });

    if (error) {
      toast.error("Failed to load posts");
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validation = newsPostSchema.safeParse(formData);
      if (!validation.success) {
        toast.error(validation.error.errors[0].message);
        return;
      }

      if (editingPost) {
        const { error } = await supabase
          .from("news_posts")
          .update({ ...formData })
          .eq("id", editingPost.id);

        if (error) throw error;
        toast.success("Post updated successfully!");
      } else {
        const { error } = await supabase
          .from("news_posts")
          .insert([{ ...formData, author_id: user?.id }]);

        if (error) throw error;
        toast.success("Post created successfully!");
      }

      resetForm();
      fetchPosts();
    } catch (error) {
      toast.error("Failed to save post");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const { error } = await supabase.from("news_posts").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete post");
    } else {
      toast.success("Post deleted successfully!");
      fetchPosts();
    }
  };

  const handleEdit = (post: NewsPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image_url: post.image_url,
      read_time: post.read_time,
      published_date: post.published_date,
    });
  };

  const resetForm = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "Project",
      image_url: "",
      read_time: "3 min read",
      published_date: new Date().toISOString().split("T")[0],
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Admin Panel</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="p-6 bg-card border-border h-fit">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">
              {editingPost ? "Edit Post" : "Create New Post"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  maxLength={200}
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  required
                  maxLength={500}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                  maxLength={10000}
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Project">Project</SelectItem>
                    <SelectItem value="Achievement">Achievement</SelectItem>
                    <SelectItem value="Event">Event</SelectItem>
                    <SelectItem value="Initiative">Initiative</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                  required
                  maxLength={500}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="read_time">Read Time</Label>
                  <Input
                    id="read_time"
                    value={formData.read_time}
                    onChange={(e) =>
                      setFormData({ ...formData, read_time: e.target.value })
                    }
                    required
                    maxLength={20}
                    placeholder="3 min read"
                  />
                </div>
                <div>
                  <Label htmlFor="published_date">Date</Label>
                  <Input
                    id="published_date"
                    type="date"
                    value={formData.published_date}
                    onChange={(e) =>
                      setFormData({ ...formData, published_date: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {editingPost ? "Update Post" : "Create Post"}
                </Button>
                {editingPost && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Card>

          {/* Posts List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">All Posts</h2>
            {posts.length === 0 ? (
              <Card className="p-8 text-center bg-card border-border">
                <Plus className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No posts yet. Create your first one!</p>
              </Card>
            ) : (
              posts.map((post) => (
                <Card key={post.id} className="p-4 bg-card border-border">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {post.excerpt}
                      </p>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <span className="bg-secondary px-2 py-1 rounded">
                          {post.category}
                        </span>
                        <span>{post.published_date}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(post)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(post.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
