import { useQuery } from "@tanstack/react-query";
import StoryService from "../services/StoryService";

export const useStories = (page, limit) => {
  return useQuery({
    queryKey: ["stories"],
    queryFn: () => StoryService.getStories(page, limit),
    keepPreviousData: true,
  });
};

export const useStory = (id) => {
  return useQuery({
    queryKey: ["story", id],
    queryFn: () => StoryService.getStoryById(id),
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

export const usePendingStories = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["pendingStories"],
    queryFn: () => StoryService.getPendingStories(page, limit),
    keepPreviousData: true,
  });
};

export const usePendingStory = (id) => {
  return useQuery({
    queryKey: ["pendingStory", id],
    queryFn: () => StoryService.getPendingStoryById(id),
    keepPreviousData: true,
  });
};
