import React, { useState, useRef } from "react";
import {
  Container,
  Box,
  Image,
  Group,
  Stack,
  Title,
  Text,
  Badge,
  Button,
  Divider,
  Textarea,
  Select,
  Paper,
  SimpleGrid,
  ActionIcon,
  Center,
  Rating,
} from "@mantine/core";
import { IconChevronUp } from "@tabler/icons-react";
import { IconChevronDown } from "@tabler/icons-react";
import { Clock4 } from "lucide-react";
import { Download } from "lucide-react";
import { MessageSquareMore } from "lucide-react";
import { Eye } from "lucide-react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { getIdTitleFromUrl, slugify, updateTime } from "../utils";
import { useStoriesSameAuthor, useStory } from "../hooks/useStory";
import { useChaptersByStoryId } from "../hooks/useChapter";
// Import icons if using an icon library
// import { IconClock, IconFlame, IconChevronDown, IconChevronUp, IconDots, IconEye, IconMessageCircle, IconDownload } from '@tabler/icons-react';

// --- Placeholder Data (Replace with actual props/fetched data) ---
const placeholderStoryData = {
  title: "Jujutsu Kaisen",
  author: "Gege Akutami",
  bannerUrl:
    "https://m.yodycdn.com/blog/hinh-nen-thien-nhien-4k-yody-vn-115.jpg",
  coverUrl: "/images/anh_bia.png",
  updatedTime: "1 tiếng trước",
  tags: ["Manga", "Đang tiến hành", "Shounen", "Hành động", "Siêu nhiên"],
  isHot: true,
  stats: {
    chapters: 20,
    views: 99999,
    ratings: 500,
    followers: 7000,
  },
  description:
    "Thể loại: Ngôn tình, Cổ đại, HE, Tình cảm, Xuyên việt, Ngọt sủng, Xuyên thư, Làm ruộng, Trạch đấu, Nhẹ nhàng, Vả mặtVăn ánTô Hoàn bất ngờ xuyên vào một cuốn tiểu thuyết ngôn tình cổ đại sủng văn, trở thành thiên kim giả bị thiếp thất của địa chủ hoán đổi, cũng là nữ phụ độc ác nhất trong truyện. Trong nguyên tác, thiên kim giả bất mãn vì thân phận bị đổi lại, không muốn sống khổ ở nơi làng quê nên đã đối đầu với thiên kim thật khắp nơi, cuối cùng thành công bị tất cả mọi người chán ghét, khiến bản thân rơi vào đường cùng.Thiên kim thật có ánh hào quang của nữ chính, là một người rất tốt bụng và mạnh mẽ...",
  svgXmlns: "http://www.w3.org/2000/svg", // Example for SVG xmlns if needed dynamically
};

const placeholderChaptersData = Array.from({ length: 25 }, (_, i) => ({
  id: `ch-${i + 1}`,
  title: `Chapter ${i + 1}: Tên Chapter ${i + 1}`,
  url: `/jujutsu-kaisen/chapter-${i + 1}`,
  number: i + 1,
}));

const placeholderCommentsData = Array.from({ length: 5 }, (_, i) => ({
  id: `cmt-${i + 1}`,
  author: "Ẩn danh",
  avatar: "/assets/images/avatar_an_danh.png",
  timestamp: `${i + 1} tháng trước`,
  content: `Truyện rất hay, nét vẽ đẹp, tình tiết mạch lạc, nhất quán, nội dung cuốn hút ${
    i + 1
  }. Thể loại: Ngôn tình, Cổ đại, HE, Tình cảm, Xuyên việt, Ngọt sủng, Xuyên thư, Làm ruộng, Trạch đấu, Nhẹ nhàng, Vả mặtVăn ánTô Hoàn bất ngờ xuyên vào một cuốn tiểu thuyết ngôn tình cổ đại sủng văn... (rest of long text)`,
  likes: 200 + i * 10,
  replies: 60 + i * 5,
}));

const placeholderRelatedStoriesData = Array(4)
  .fill(null)
  .map((_, i) => ({
    id: `related-${i + 1}`,
    title: `Related Story ${i + 1}`,
    imageUrl: "/images/anh_truyen_dai_dien.png",
    href: `/related-story-${i + 1}`,
    isComplete: i % 2 === 0,
    isHot: i % 3 === 0,
    isNew: i === 0,
  }));

// --- Main Component ---
const StoryPage = ({
  storyData = placeholderStoryData,
  chaptersData = placeholderChaptersData,
  commentsData = placeholderCommentsData,
  relatedStoriesData = placeholderRelatedStoriesData,
}) => {
  const { title: url } = useParams();
  const navigate = useNavigate();
  const {id, slug} = getIdTitleFromUrl(url); // id của story
  const { data: story, error } = useStory(id, slug);
  const { data: chapters } = useChaptersByStoryId(id);
  const { data: sameAuthorStories } = useStoriesSameAuthor(id);

  const defaultBannerImage =
    "https://m.yodycdn.com/blog/hinh-nen-thien-nhien-4k-yody-vn-115.jpg";

  const [activeTab, setActiveTab] = useState("rating"); // 'rating' or 'discussion'
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showAllChapters, setShowAllChapters] = useState(false);
  const [rating, setRating] = useState(5); // Use Mantine Rating state
  const [expandedComments, setExpandedComments] = useState({}); // { commentId: true/false }

  const chapterListRef = useRef(null); // For scrolling

  const initialVisibleChapters = 10;

  if (!id || !slug || error) {
    return <Navigate to="/" replace />;
  };

  if ( !story ) {
    navigate("/");
  }

  const visibleChaptersData = showAllChapters
    ? chaptersData
    : chaptersData.slice(0, initialVisibleChapters);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const toggleShowAllChapters = () => {
    setShowAllChapters(!showAllChapters);
    if (showAllChapters && chapterListRef.current) {
      // Scroll up when collapsing
      chapterListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const toggleCommentExpansion = (commentId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const getTabClassName = (tabName) => {
    const baseClasses =
      "w-64 py-4 text-2xl font-bold transition-all duration-300 ease-in-out";
    if (activeTab === tabName) {
      return `${baseClasses} border-t-4 border-white -mt-[4px] text-black`; // Active
    } else {
      return `${baseClasses} border-t-4 border-transparent text-gray-500 hover:text-gray-800`; // Inactive
    }
  };

  const handleSubmitRating = (event) => {
    event.preventDefault();
    console.log(
      "Submitting rating:",
      rating,
      event.target.elements.ratingText.value
    );
    // Add actual API call logic here
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    console.log("Submitting comment:", event.target.elements.commentText.value);
    // Add actual API call logic here
    event.target.reset(); // Clear textarea
  };

  return (
    <>
      <Container size="lg" className="relative w-3/4 mx-auto mt-4 mb-36" p={0}>
        {/* Banner */}
        <Box className="mt-24 w-full overflow-hidden rounded-3xl h-40 md:h-72 lg:h-96 shadow-lg">
          <Image
            src={story?.bannerUrl || defaultBannerImage}
            alt="Ảnh nền truyện"
            className="block w-full h-full object-cover object-center opacity-60"
          />
        </Box>

        {/* Content Over Banner */}
        <Box className="absolute translate-y-[-50%] left-12 md:left-20 lg:left-24 w-11/12 md:w-10/12 lg:w-4/5">
          <Group
            wrap="nowrap"
            gap={{ base: "sm", lg: "xl" }}
            align="flex-start"
          >
            {/* Cover Image */}
            <Box className="w-1/4 flex-shrink-0">
              <Image
                src={story?.image}
                alt="Ảnh bìa truyện"
                radius={"md"}
                className="w-full h-auto object-cover object-center shadow-[3px_3px_3px_3px_rgba(0,0,0,0.4)]"
                style={{ aspectRatio: "2 / 3" }} // Maintain aspect ratio
              />
            </Box>

            {/* Right Side Details */}
            <Stack className="w-3/4 flex items-end" gap="sm">
              {/* Top Part: Title, Author, Time */}
              <Stack gap={0}>
                <Group gap={{ base: "xs", lg: "md" }} align="flex-end">
                  <Title
                    order={1}
                    className="text-xl md:text-4xl lg:text-5xl font-bold italic text-shadow-sm"
                  >
                    {story?.title}
                  </Title>
                  {/* Timestamp */}
                  <Group gap={4} align="center" className="ml-4 mb-1 md:mb-2">
                    {/* Replace with IconClock if available */}
                    <Clock4
                      color="#fff"
                      className="bg-black rounded-full flex w-3 h-3 md:w-4 md:h-4 lg:w-6 lg:h-6"
                    />
                    <Text
                      fw={600}
                      size="sm"
                      md="lg"
                      className="not-italic font-bold whitespace-nowrap"
                    >
                      Cập nhật {updateTime(story?.updatedAt)}
                    </Text>
                  </Group>
                </Group>
                <Text
                  fw={700}
                  size="lg"
                  md="xl"
                  lg="3xl"
                  className="italic font-bold pl-1 md:pl-4"
                >
                  {story?.Author?.fullName}
                </Text>
              </Stack>

              <Stack gap="md">
                <Group gap="xs" wrap="wrap">
                  {storyData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="filled"
                      color="white"
                      radius="sm"
                      size="sm"
                      md="md"
                      classNames={{
                        label: "text-black font-bold",
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                  {storyData.isHot && (
                    <img
                      src="https://png.pngtree.com/png-vector/20221227/ourmid/pngtree-orange-cartoon-cute-flame-png-image_6510196.png"
                      alt="Hot"
                      className="w-3 md:w-4 lg:w-6 h-auto"
                    />
                    // Or <IconFlame size={18} color="red" />
                  )}
                </Group>

                {/* Action Buttons */}
                <Group gap="xs" md="md" wrap="wrap">
                  <Button
                    color="blue"
                    classNames={{
                      label: "text-white font-extrabold",
                    }}
                    radius="sm"
                    size="xs"
                    md="sm"
                  >
                    Chương
                  </Button>
                  <Button
                    color="white"
                    classNames={{
                      label: "text-black font-extrabold",
                    }}
                    variant="default"
                    radius="sm"
                    size="xs"
                    md="sm"
                  >
                    Đọc tiếp
                  </Button>
                  <Button
                    color="white"
                    classNames={{
                      label: "text-black font-extrabold",
                    }}
                    variant="default"
                    radius="sm"
                    size="xs"
                    md="sm"
                  >
                    Đọc từ đầu
                  </Button>
                  <Button
                    color="white"
                    classNames={{
                      label: "text-black font-extrabold",
                    }}
                    variant="default"
                    radius="sm"
                    size="xs"
                    md="sm"
                  >
                    Theo dõi
                  </Button>
                </Group>

                {/* Stats */}
                <Group
                  gap={0}
                  wrap="wrap"
                  className="ml-0 md:ml-8 font-extrabold text-xs md:text-sm"
                >
                  <Stack
                    align="center"
                    gap={0}
                    className="px-2 md:px-6 py-1 border-r-2 border-black"
                  >
                    <Text fw={700}>{chapters?.length}</Text>
                    <Text>Chương</Text>
                  </Stack>
                  <Stack
                    align="center"
                    gap={0}
                    className="px-2 md:px-6 py-1 border-r-2 border-black"
                  >
                    <Text fw={700}>
                      {story?.views?.toLocaleString()}
                    </Text>
                    <Text>Lượt đọc</Text>
                  </Stack>
                  <Stack
                    align="center"
                    gap={0}
                    className="px-2 md:px-6 py-1 border-r-2 border-black"
                  >
                    <Text fw={700}>{story?.rating}</Text>
                    <Text>Đánh giá</Text>
                  </Stack>
                  <Stack align="center" gap={0} className="px-2 md:px-6 py-1">
                    <Text fw={700}>
                      {story?.followers?.toLocaleString()}
                    </Text>
                    <Text>Lượt theo dõi</Text>
                  </Stack>
                </Group>
              </Stack>
            </Stack>
          </Group>
        </Box>
      </Container>
      {/* --- Separator --- */}
      <Divider className="bg-gray-800 my-8 h-1 md:mt-16 lg:mt-24" />
      {/* --- Description Section --- */}
      <Container size="md" className="w-11/12 md:w-10/12 mx-auto mt-8">
        <Title
          order={2}
          className="font-bold text-3xl md:text-5xl mt-4 lg:mt-8 italic text-center mb-8"
        >
          Giới thiệu
        </Title>
        <Box className="relative mb-12">
          <Text
            size="lg" // Adjust size as needed
            className="px-3 font-semibold text-xl md:text-2xl transition-all duration-300 ease-in-out" // Use 'semibold' or 'bold'
            style={{
              maxHeight: isDescriptionExpanded ? "none" : "285px", // Control height
              overflow: "hidden",
            }}
          >
            {story?.description}
          </Text>
          {/* Show More/Less Button */}
          <Center mt="md">
            <Button
              variant="subtle"
              onClick={toggleDescription}
              rightSection={
                isDescriptionExpanded ? (
                  <IconChevronUp size={14} />
                ) : (
                  <IconChevronDown size={14} />
                )
              } // Replace with actual icons
              size="lg"
            >
              {isDescriptionExpanded ? "Thu gọn" : "Xem thêm"}
            </Button>
          </Center>
        </Box>
      </Container>
      {/* --- Separator --- */}
      <Divider className="bg-gray-800 h-1 my-8 md:my-12" />
      {/* --- Chapter List Section --- */}
      <Container
        size="lg"
        className="w-11/12 mx-auto mt-4"
        ref={chapterListRef}
      >
        <Box className="w-full md:w-11/12 justify-center mx-auto mt-12 lg:mt-16">
          <Stack gap="xs" id="chapterList" className="mb-8">
            {chapters?.map((chapter) => (
              <Link
                to={`${slugify(chapter?.title)}-${chapter?.id}`}
                key={chapter?.id}
                className="no-underline"
              >
                <Paper
                  withBorder
                  radius="lg"
                  p="sm"
                  className="flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 border-2 border-black"
                >
                  <div className="flex items-center justify-between w-full">
                    <Text fw={500} c={"gray.8"} span>
                      {`Chương ${chapter?.chapterNumber}`}
                      {chapter?.title ? `: ${chapter?.title}` : ""}
                    </Text>
                    <Group gap="xs" w={"auto"}>
                      <Eye
                        src="/images/mat_xanh.png"
                        className="w-5 h-5 md:w-6 md:h-6"
                        alt="Views"
                      />
                      <MessageSquareMore
                        src="/images/tin_nhan.png"
                        className="w-5 h-5 md:w-6 md:h-6"
                        alt="Comments"
                      />
                      <Download
                        src="/images/tai_xuong.png"
                        className="w-5 h-5 md:w-6 md:h-6"
                        alt="Download"
                      />
                    </Group>
                  </div>
                </Paper>
              </Link>
            ))}
          </Stack>

          {/* Show More/Less Chapters Button */}
          {chapters?.length > initialVisibleChapters && (
            <Center className="mt-8">
              <Button
                color="yellow"
                radius="xl"
                size="lg"
                onClick={toggleShowAllChapters}
                className="text-white font-bold text-xl md:text-2xl"
              >
                {showAllChapters ? "Ẩn bớt" : "Xem thêm"}
              </Button>
            </Center>
          )}
        </Box>
      </Container>
      {/* --- Separator --- */}
      <Divider className="bg-gray-800 h-1 my-8 md:my-12" />
      {/* --- Rating and Discussion Section --- */}
      <Container
        size="lg"
        className="relative flex flex-col items-center w-11/12 mx-auto"
      >
        {/* Tabs */}
        <Center className="w-full items-center justify-center border-gray-200 mb-8">
          <button
            className={getTabClassName("rating")}
            onClick={() => handleTabClick("rating")}
          >
            Đánh giá
          </button>
          <button
            className={getTabClassName("discussion")}
            onClick={() => handleTabClick("discussion")}
          >
            Thảo luận
          </button>
        </Center>

        {/* Content Area */}
        <Box className="w-full flex flex-col items-center mt-8">
          {/* Rating Form */}
          <Box
            className={`w-full md:w-2/3 ${
              activeTab === "rating" ? "block" : "hidden"
            }`}
          >
            <Box
              component="form"
              onSubmit={handleSubmitRating}
              className="flex flex-col items-center"
            >
              <Rating
                size="xl"
                value={rating}
                onChange={setRating}
                count={5}
                mb="xl"
              />
              <Textarea
                name="ratingText"
                placeholder="Hãy nêu cảm nghĩ của bạn nhé: ..."
                radius="lg" // rounded-3xl equivalent
                size="lg"
                minRows={4}
                className="h-36 w-full p-4 bg-gray-800 text-white placeholder:text-gray-300 mb-8"
                classNames={{
                  root: "rounded-2xl",
                  input: "text-white font-semibold text-xl md:text-2xl",
                }}
              />
              <Button
                type="submit"
                color="yellow"
                radius="xl"
                size="lg"
                className="text-white font-bold text-xl md:text-2xl"
              >
                Gửi đánh giá
              </Button>
            </Box>
          </Box>

          {/* Discussion Form and List */}
          <Box
            className={`w-full md:w-5/6 ${
              activeTab === "discussion" ? "block" : "hidden"
            }`}
          >
            {/* Comment Form */}
            <Center className="w-full mb-12">
              <Box
                component="form"
                onSubmit={handleSubmitComment}
                className="w-full md:w-2/3 flex flex-col"
              >
                <Textarea
                  name="commentText"
                  placeholder="Thảo luận:......"
                  radius="lg"
                  size="md"
                  minRows={3}
                  className="h-36 w-full p-4 bg-gray-800 text-white placeholder:text-gray-300"
                  classNames={{
                    root: "rounded-2xl",
                    input: "text-white font-semibold text-lg md:text-xl",
                  }}
                />
                <Group justify="flex-end" mt="sm">
                  <Button
                    type="submit"
                    color="red" // Example: red-400
                    radius="xl"
                    size="md"
                    className="text-white font-bold text-lg md:text-xl px-6"
                  >
                    Gửi
                  </Button>
                </Group>
              </Box>
            </Center>

            {/* Comment List */}
            <Box className="mt-8">
              <Group justify="space-between" mb="lg">
                <Text size="xl" fw={700}>
                  {commentsData?.length} thảo luận
                </Text>
                <Select
                  placeholder="Sắp xếp theo"
                  data={["Mới nhất", "Cũ nhất", "Nhiều lượt thích nhất"]}
                  defaultValue="Mới nhất"
                  radius="xl"
                  className="bg-gray-800 text-white font-bold rounded-full"
                  // Note: Mantine Select styling might differ from raw select
                />
              </Group>

              <Stack gap="lg">
                {commentsData.map((comment) => (
                  <Box key={comment.id}>
                    <Paper
                      p="md"
                      radius="xl" // rounded-3xl
                      className="relative bg-gray-800 text-white w-full"
                    >
                      <Group justify="space-between" align="flex-start" mb="xs">
                        <Group gap="xs" align="flex-end">
                          <Image
                            src={comment.avatar}
                            alt="avatar"
                            w={32}
                            h={32}
                            radius="50%"
                          />
                          <Text size="lg" fw={700}>
                            {comment.author}
                          </Text>
                          <Text size="sm" c="dimmed">
                            {comment.timestamp}
                          </Text>
                        </Group>
                        <ActionIcon
                          variant="transparent"
                          className="text-white"
                        >
                          {/* <IconDots /> */} . . .
                        </ActionIcon>
                      </Group>

                      <Box className="relative mx-4 md:mx-12 pb-6">
                        <Text
                          size="md" // text-lg equivalent
                          className="text-white transition-all duration-300"
                          style={{
                            maxHeight: expandedComments[comment.id]
                              ? "none"
                              : "5rem", // max-h-20 approx
                            overflow: "hidden",
                          }}
                        >
                          {comment.content}
                        </Text>
                        {/* Read More/Less for Comment */}
                        <Button
                          variant="subtle"
                          size="xs"
                          onClick={() => toggleCommentExpansion(comment.id)}
                          className="absolute bottom-0 right-0 text-xs text-white bg-gray-900/50 hover:bg-gray-900/80 px-2 py-1 rounded"
                        >
                          {expandedComments[comment.id]
                            ? "Thu gọn"
                            : "Xem thêm"}
                        </Button>
                      </Box>
                    </Paper>
                    {/* Likes/Comments Count */}
                    <Group gap="xs" mt="xs" ml={12}>
                      <Badge variant="filled" color="dark" size="sm">
                        {comment.likes} tt
                      </Badge>
                      <Badge variant="filled" color="dark" size="sm">
                        {comment.replies} cmt
                      </Badge>
                    </Group>
                  </Box>
                ))}
              </Stack>

              {/* Load More Comments Button */}
              <Center mt="xl">
                <Button
                  color="yellow"
                  radius="xl"
                  size="lg"
                  className="text-white font-bold text-xl md:text-2xl"
                >
                  Xem thêm bình luận
                </Button>
              </Center>
            </Box>
          </Box>
        </Box>
      </Container>
      {/* --- Separator --- */}
      <Divider className="bg-gray-800 my-8 h-1 md:my-12" />
      {/* --- Related Stories Section --- */}
      <Container size="lg" className="w-11/12 mx-auto mt-12 mb-32">
        <Title
          order={2}
          className="text-3xl md:text-4xl font-extrabold text-center mb-12 md:mb-20"
        >
          Truyện cùng tác giả
        </Title>
        <SimpleGrid
          cols={{ base: 2, sm: 3, md: 4 }}
          spacing={{ base: "md", lg: "xl" }}
        >
          {relatedStoriesData.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default StoryPage;
