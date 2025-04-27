import { useQuery } from "@tanstack/react-query";
import StoryService from "../services/StoryService";

export const useStories = () => {
  return useQuery({
    queryKey: ["stories"],
    queryFn: () => StoryService.getStories(),
    keepPreviousData: true,
  });
};

export const useStory = (id, slug) => {
  return useQuery({
    queryKey: ["story", id, slug],
    queryFn: () => StoryService.getStoryById(id, slug),
    keepPreviousData: true,
  });
};

export const useStoriesByAuthor = (id) => {
  return useQuery({
    queryKey: ["storiesByAuthor", id],
    queryFn: () => StoryService.getStoriesSameAuthor(id),
    keepPreviousData: true,
  });
};

export const useStoriesSameAuthor = (id) => {
  return useQuery({
    queryKey: ["storiesSameAuthor", id],
    queryFn: () => StoryService.getStoriesByAuthor(id),
    keepPreviousData: true,
  });
};
