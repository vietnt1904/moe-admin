import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Group,
  Text,
  Anchor,
  Button,
  Menu,
  Center,
  UnstyledButton,
  Breadcrumbs,
  Notification, // For error display
} from "@mantine/core";
import {
  IconStar,
  IconStarFilled,
  IconChevronLeft,
  IconChevronRight,
  IconList,
  IconSettings,
  IconX,
} from "@tabler/icons-react"; // Using Tabler Icons bundled with Mantine
import { useChapter, useChaptersByStoryId, useNextChapter, usePreviousChapter } from "../hooks/useChapter";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getIdTitleFromUrl, slugify } from "../utils";
import { useStory } from "../hooks/useStory";

// Helper function to format content (JS equivalent of the PHP logic)
const formatContent = (content) => {
  if (!content) return "";
  const contentWithoutAds = content.replace(
    /\(adsbygoogle\s*=\s*window\.adsbygoogle\s*\|\|\s*\[\]\)\.push\(\{\}\);/g,
    ""
  );
  // Basic word wrapping (CSS `word-wrap: break-word` or `overflow-wrap: break-word` is usually better)
  // Javascript doesn't have a direct equivalent of PHP's wordwrap that inserts newlines reliably for HTML rendering.
  // Instead, rely on CSS for wrapping within the container. We'll just return the cleaned content.
  // If you absolutely need hard breaks, you'd split the string and join with <br />, but it's fragile.
  return contentWithoutAds.split("\n").join("<br />"); // Preserve existing newlines as <br>
};

// Mock data structure - replace with your actual props/state
const mockData = {
  title: "Truyện ABC",
  chapter: "Chương 10 - Mở Đầu Mới",
  content: `Nội dung của chương truyện... Lorem ipsum dolor sit amet, consectetur adipiscing elit. (adsbygoogle = window.adsbygoogle || []).push({}); Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\n Đoạn văn thứ hai sau một khoảng trống. \n\n(adsbygoogle = window.adsbygoogle || []).push({}); Another paragraph here.`,
  form_doc: null, // Example: null, 0, or some other value indicating free/paid status
  users_id: 5, // Example author ID
};


// --- React Component ---

const ChapterPage = ({
  data = mockData, // Default to mock data for example
  isAuthenticated = true, // Example: user is logged in
  currentUser = { id: 10 }, // Example: logged in user ID
  isPurchased = false, // Example: user hasn't purchased this specific chapter yet
  purchaseSuccess = false, // Example: user just completed a purchase flow
  error = null, // Example: 'Không đủ tiền để mua chương này.'
  // Add props for actual bookmark status and update handler if needed from parent
}) => {
  const { title, chapter: chapterTitle } = useParams();
  const navigate = useNavigate();

  const {id: storyId, slug: titleSlug} = getIdTitleFromUrl(title); // id của story
  const { data: story } = useStory(storyId, titleSlug);
  if (!story) {
    navigate("/");
  }

  const {id: chapterId, slug: chapterSlug}  = getIdTitleFromUrl(chapterTitle);
  const {data: chapter} = useChapter(chapterId, chapterSlug );
  if (!chapter) {
    navigate("/");
  }
  const {data: chapters} = useChaptersByStoryId(chapter?.storyId);
  console.log(chapters);

  const [isBookmarked, setIsBookmarked] = useState(false); // Local state for bookmark toggle
  const [showError, setShowError] = useState(!!error); // Control error visibility
  const {data: previousChapter} = usePreviousChapter(chapter?.id, chapter?.storyId, chapter?.chapterNumber);
  const {data: nextChapter} = useNextChapter(chapter?.id, chapter?.storyId, chapter?.chapterNumber);


  // Simulate receiving error prop
  useEffect(() => {
    setShowError(!!error);
  }, [error]);

  const handleBookmarkToggle = () => {
    setIsBookmarked((prev) => !prev);
    // Add API call here to save/remove bookmark status on the server
    console.log("Bookmark toggled:", !isBookmarked);
  };

  const formattedContent = formatContent(chapter?.content);

  // Determine if the content should be displayed based on the logic
  let canViewContent = false;
  if (data?.form_doc == null || data?.form_doc === 0) {
    canViewContent = true; // Free chapter
  } else if (purchaseSuccess) {
    canViewContent = true; // Just purchased successfully
  } else if (isAuthenticated) {
    if (currentUser?.id === data?.users_id) {
      canViewContent = true; // User is the author
    } else if (isPurchased) {
      // Need more specific check if `isPurchased` relates *exactly* to this title/chapter
      // Assuming `isPurchased` prop means this specific chapter is bought
      canViewContent = true; // User has purchased this chapter previously
    }
  }
  // Note: The original logic for $boolpurchased comparison was complex.
  // Here, we simplify assuming `isPurchased` is a boolean prop indicating
  // if *this specific chapter* has been purchased by the logged-in user.
  // You might need more complex logic based on how `boolpurchased` works in your backend/state.

  const breadcrumbItems = [
    { title: "Trang chủ", href: "/" },
    { title: story?.title, href: `/story/${slugify(story?.title || "")}-${story?.id}` }, // Replace # with actual link to story page if needed
    { title: `Chương ${chapter?.chapterNumber}: ${chapter?.title}`, href: "#" }, // Current page, no link needed usually
  ].map((item, index, arr) => (
    <Link
      to={item.href}
      key={index}
      className={`text-red-400 ${index === arr.length - 1 ? "font-bold" : ""}`}
    >
      {item.title}
    </Link>
  ));

  return (
    <Container
      size="auto"
      p={0}
      className="w-full mt-[-40px] flex justify-center"
    >
      <Box className="w-3/4 mt-20 mb-12 md:mb-20">
        <Center className="my-12">
          <Breadcrumbs
            classNames={{
              separator: "text-red-400",
              breadcrumb: "text-red-400 text-2xl font-bold",
            }}
          >
            {breadcrumbItems}
          </Breadcrumbs>
        </Center>
        {/* Action Buttons */}
        <Center className="mb-12">
          <Group gap="xl">
            {" "}
            {/* Replaces flex mb-12 mx-4 */}
            {/* Đánh dấu Button */}
            <UnstyledButton
              onClick={handleBookmarkToggle}
              className="text-center"
            >
              <Center>
                {
                  isBookmarked ? (
                    <IconStarFilled size={32} className="text-yellow-500" /> // Or use Mantine primary color: color={theme.colors.yellow[6]}
                  ) : (
                    <IconStar size={32} className="text-gray-500" />
                  ) // Or color={theme.colors.gray[6]}
                }
              </Center>
              <Text size="xl" fw={700} c="gray.7">
                Đánh dấu
              </Text>
            </UnstyledButton>
            {/* Previous Chapter Button */}
            <Link
              to={
                previousChapter
                  ? `/story/${slugify(story?.title || "")}-${story?.id}/${slugify(previousChapter?.title)}-${previousChapter?.id}`
                  : "#"
              }
              className={`text-center ${
                !previousChapter ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <Center>
                <IconChevronLeft size={32} className="text-gray-500" />
              </Center>
              <Text size="xl" fw={700} c="gray.7">
                Trước
              </Text>
            </Link>
            <Menu shadow="md" width={250}>
              <Menu.Target>
                <UnstyledButton className="text-center">
                  <Center>
                    <IconList size={32} className="text-gray-500" />
                  </Center>
                  <Text size="xl" fw={700} c="gray.7">
                    Chương
                  </Text>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown mah={"40rem"} h={"40%"} className="!overflow-y-scroll !w-[70%] md:!w-[50%] lg:!w-[40%]">
                {chapters?.map((chap) => (
                  <Menu.Item
                    key={chap?.id}
                    className="text-xl font-bold !p-0 overflow-hidden my-1"
                  >
                    <Link to={`/story/${slugify(story?.title || "")}-${story?.id}/${slugify(chap?.title)}-${chap?.id}`}>
                    <Box className="block px-2 py-1 w-full border rounded border-gray-200 hover:bg-gray-200">
                      <Text truncate="end" size="lg" className="font-bold">
                        {`Chương ${chap?.chapterNumber}: ${chap?.title}`}
                      </Text>
                    </Box>
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>

            <Link
              to={
                nextChapter
                  ? `/story/${slugify(story?.title || "")}-${story?.id}/${slugify(nextChapter?.title)}-${nextChapter?.id}`
                  : "#"
              }
              className={`text-center ${
                !nextChapter ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <Center>
                <IconChevronRight size={32} className="text-gray-500" />
                {/* <Image src="/assets/images/sao_trang.png" className="w-8 h-8" alt="Next chapter" /> */}
              </Center>
              <Text size="xl" fw={700} c="gray.7">
                Sau
              </Text>
            </Link>
            {/* Cấu hình Button */}
            <UnstyledButton
              onClick={() => alert("Settings clicked!")}
              className="text-center"
            >
              <Center>
                <IconSettings size={32} className="text-gray-500" />
                {/* <Image src="/assets/images/sao_trang.png" className="w-8 h-8" alt="Settings" /> */}
              </Center>
              <Text size="xl" fw={700} c="gray.7">
                Cấu hình
              </Text>
            </UnstyledButton>
          </Group>
        </Center>
        {/* Error Notification */}
        {showError && error && (
          <Notification
            icon={<IconX size="1.1rem" />}
            color="red"
            title="Lỗi"
            withCloseButton
            onClose={() => setShowError(false)} // Allow dismissing
            className="mb-4"
          >
            {error}
          </Notification>
        )}
        {/* Content Area */}
        <Box className="bg-white px-4 md:px-6 py-4 shadow-sm rounded">
          {canViewContent ? (
            <Text
              component="div"
              fw={700}
              lh="1.3"
              mih={"20vh"}
              className="text-wrap font-medium !text-xs md:!text-sm lg:!text-lg text-gray-800"
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          ) : (
            // Display message or purchase prompt if content cannot be viewed
            <Box className="text-center py-10">
              <Text size="xl" c="dimmed" fw={500}>
                Nội dung này bị khóa.
              </Text>
              {/* Add a purchase button/link here if applicable */}
              {!isAuthenticated && (
                <Text mt="sm">
                  Vui lòng <Anchor c={"blue"} href="/login">đăng nhập</Anchor> để xem.
                </Text>
              )}
              {isAuthenticated && !isPurchased && data?.form_doc > 0 && (
                <Button
                  mt="lg"
                  variant="filled"
                  color="blue"
                  onClick={() => alert("Implement Purchase Flow!")}
                >
                  Mua chương này
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ChapterPage;
