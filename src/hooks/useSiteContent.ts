import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Json } from "@/integrations/supabase/types";

export interface LandingHeroContent {
  title: string;
  description: string;
  cta_primary: string;
  cta_secondary: string;
}

export interface AboutPageContent {
  title: string;
  subtitle: string;
  description: string;
  mission_title: string;
  mission_description: string;
  values: string[];
}

export interface FooterContent {
  description: string;
  contact_name: string;
  contact_email: string;
  copyright: string;
}

export interface SiteContent {
  id: string;
  section_key: string;
  section_name: string;
  content: LandingHeroContent | AboutPageContent | FooterContent;
  updated_at: string;
}

export const useSiteContent = (sectionKey?: string) => {
  return useQuery({
    queryKey: ["site-content", sectionKey],
    queryFn: async () => {
      if (sectionKey) {
        const { data, error } = await supabase
          .from("site_content")
          .select("*")
          .eq("section_key", sectionKey)
          .single();
        
        if (error) throw error;
        return data as unknown as SiteContent;
      }
      
      const { data, error } = await supabase
        .from("site_content")
        .select("*");
      
      if (error) throw error;
      return data as unknown as SiteContent[];
    },
  });
};

export const useUpdateSiteContent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ sectionKey, content }: { sectionKey: string; content: LandingHeroContent | AboutPageContent | FooterContent }) => {
      const { data, error } = await supabase
        .from("site_content")
        .update({ content: content as unknown as Json })
        .eq("section_key", sectionKey)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
      toast.success("Content updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update content: " + error.message);
    },
  });
};
