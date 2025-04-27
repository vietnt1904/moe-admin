import { useQuery } from "@tanstack/react-query";
import ChapterService from "../services/ChapterService.js";

export const useChaptersByStoryId = (id) => {
    return useQuery({
        queryKey: ["chapters", id],
        queryFn: () => ChapterService.getChaptersByStoryId(id),
        keepPreviousData: true,
    });
};

export const useChapter = (id, slug) => {
    return useQuery({
        queryKey: ["chapter", id, slug],
        queryFn: () => ChapterService.getChapterById(id, slug),
        keepPreviousData: true,
    });
};

export const usePreviousChapter = (id, storyId, chapterNumber) => {
    return useQuery({
        queryKey: ["previousChapter", id, storyId, chapterNumber],
        queryFn: () => ChapterService.getPreviousChapter(id, storyId, chapterNumber),
        keepPreviousData: true,
    });
};

export const useNextChapter = (id, storyId, chapterNumber) => {
    return useQuery({
        queryKey: ["nextChapter", id, storyId, chapterNumber],
        queryFn: () => ChapterService.getNextChapter(id, storyId, chapterNumber),
        keepPreviousData: true,
    });
};