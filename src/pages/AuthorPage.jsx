import React, { useState } from "react";
import {
  Container,
  Box,
  Image,
  Avatar,
  ActionIcon,
  Text,
  Group,
  Stack,
  Divider,
  SimpleGrid,
  Anchor,
  Badge,
  Center,
  rem, // For pixel-perfect sizing if needed
} from "@mantine/core";
import { PencilLine } from "lucide-react";
import { WandSparkles } from "lucide-react";

// --- Placeholder Data (Replace with actual props or state fetching) ---
const placeholderUser = {
  name: "Tên Người Dùng",
  email: "user@example.com",
  avatarUrl:
    "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/05/tai-anh-dep-ve-may-23.jpg", // Replace
  bannerUrl:
    "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/05/tai-anh-dep-ve-may-23.jpg", // Replace
  bio: "Giới thiệu:.....Trạch đấu, Nhẹ nhàng, Vả mặtVăn ánTô Hoàn bất ngờ xuyên vào một cuốn tiểu thuyết ngôn tình cổ đại sủng văn, trở thành thiên kim giả bị thiếp thất của địa chủ hoán đổi, cũng là nữ phụ độc ác nhất trong truyện. Trong nguyên tác, thiên kim giả bất mãn vì thân phận bị đổi lại, không muốn sống khổ ở nơi làng quê nên đã đối đầu với thiên kim thật khắp nơi, cuối cùng thành công bị tất cả mọi người chán ghét, khiến bản thân rơi vào đường cùng.Thiên kim thật có ánh hào quang của nữ chính, là",
  stk: "111111111111111",
  followers: 10,
  following: 100,
};

const storyPlaceholder = {
  id: Math.random(),
  imageUrl:
    "https://m.yodycdn.com/blog/hinh-nen-thien-nhien-4k-yody-vn-115.jpg", // Replace
  href: "/",
  isComplete: true,
  isHot: true,
  isNew: true,
};

const followedStoriesData = Array(8)
  .fill(null)
  .map((_, i) => ({ ...storyPlaceholder, id: `followed-${i}` }));
const myStoriesData = []; // Example: User has no stories initially
// const myStoriesData = Array(4).fill(null).map((_, i) => ({ ...storyPlaceholder, id: `my-${i}` })); // Example: User has stories

// --- Reusable Story Card Component ---
const StoryCard = ({ story }) => (
  <Box className="rounded-xl relative">
    {" "}
    {/* Use Box or Paper */}
    <Anchor href={story?.href}>
      <Image
        loading="lazy"
        src={story?.imageUrl}
        alt="Ảnh truyện"
        radius="xl" // Equivalent to rounded-3xl approx
        className="w-full h-auto" // Let aspect ratio define height or set fixed height
      />
      <Stack gap={rem(4)} className="absolute top-1 left-1">
        {" "}
        {/* Adjust gap/position */}
        {story?.isComplete && (
          <Badge color="green" variant="filled">
            Hoàn thành
          </Badge>
        )}
        {story?.isHot && (
          <Badge color="red" variant="filled">
            Hot
          </Badge>
        )}
        {story?.isNew && (
          <Badge color="blue" variant="filled">
            New
          </Badge>
        )}
      </Stack>
    </Anchor>
  </Box>
);

// --- Main Profile Page Component ---
const AuthorPage = ({
  user = placeholderUser,
  followedStories = followedStoriesData,
  myStories = myStoriesData,
}) => {
  const [activeTab, setActiveTab] = useState("following"); // 'following' or 'myStories'

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Define styles for active/inactive tabs reusing original CSS logic
  const getTabClassName = (tabName) => {
    let classes =
      "w-64 py-4 text-lg md:text-xl lg:text-2xl font-bold transition-all duration-300 ease-in-out "; // Base classes
    if (activeTab === tabName) {
      classes += "border-t-[5px] border-white -mt-[4px]"; // Active state
    } else {
      classes += "border-t border-transparent"; // Inactive state
    }
    return classes;
  };

  const [isEditAnhNen, setIsEditAnhNen] = useState(false);
  const handleOnClickAnhNen = () => {
    setIsEditAnhNen(!isEditAnhNen);
  };

  return (
    <>
      <Container size={"auto"} p={0} className="relative justify-center w-3/4">
        <Box
          onClick={handleOnClickAnhNen}
          className="relative mt-24 w-full overflow-hidden rounded-3xl h-auto max-h-[32em] shadow-lg"
        >
          <Image
            src={user.bannerUrl}
            alt="Ảnh nền"
            className={`w-full h-full object-fill shadow-lg object-center ${
              isEditAnhNen ? "opacity-60" : ""
            }`}
          />
          <Center className="absolute inset-0">
            <ActionIcon variant="transparent" size="lg">
              <WandSparkles
                className={`w-8 h-8 text-black transition-transform duration-200 ${
                  isEditAnhNen ? "" : "hidden"
                }`}
              />
            </ActionIcon>
          </Center>
        </Box>
        <Box
          className="absolute lg:bottom-[3rem] translate-y-[-50%] left-4 md:left-8 lg:left-16 w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48" // Approximate calculation for overlap
        >
          <Avatar
            src={user?.avatarUrl}
            alt="Ảnh đại diện"
            radius="50%"
            size="100%"
            className="border-4 border-black"
          />
        </Box>

        <Box className="flex ml-0 md:ml-6 lg:ml-12 mt-4">
          <Box className="pl-32 md:pl-44 lg:pl-72 text-black text-2xl font-bold mt-3 pr-6 md:pr-8 lg:pr-12 w-full">
            <Group align="flex-end" gap={2} mb="xs">
              <p className="font-bold text-lg md:text-2xl">
                {user?.name}
              </p>
              <span className="flex text-xs lg:text-sm mx-2">Đang theo dõi</span>
              <button>
                <PencilLine color="black" className="w-5 h-auto md:w-6 mx-2" />
              </button>
              <button className="text-white bg-black rounded-3xl text-xs md:text-sm px-2 py-0 font-semibold">
                Nhắn tin
              </button>
            </Group>

            <Group gap="xs" align="center" mb="xs">
              <Text size="lg" fw={500} className="max-w-[100%] overflow-hidden">{user.email}</Text>
              <Image
                onClick={() =>
                  window.open("https://www.facebook.com/", "_blank")
                }
                src="/images/facebook.png"
                className="w-6 h-6 hover:cursor-pointer"
                alt="Facebook"
              />
              <Image src="/images/x.png" className="w-5 h-5 hover:cursor-pointer" alt="X" />
            </Group>

            <Box className="hidden md:block max-h-20 overflow-hidden mb-xs">
              <Text size="lg" lineClamp={3}>
                <Text component="span" fw={500}>
                  Giới thiệu:{" "}
                </Text>
                {user.bio}
              </Text>
            </Box>

            {/* Stats */}
            <Stack gap={rem(4)} className="text-sm font-normal mt-3">
              {user.stk && <Text fw={700} maxW="100%" className="overflow-hidden">Stk: {user.stk}</Text>}
              <Group gap="md">
                <Text>
                  <strong>{user.followers}</strong> Người theo dõi
                </Text>
                <Text>
                  Đang theo dõi <strong>{user.following}</strong> người dùng
                </Text>
              </Group>
            </Stack>
          </Box>
        </Box>
      </Container>
      <Divider size="xs" className="bg-gray-800 mt-12 h-1" />
      <Container
        size="auto"
        className="relative flex flex-col justify-center w-11/12"
      >
        <Center className="w-full items-center justify-center">
          <button
            className={getTabClassName("following")}
            onClick={() => handleTabClick("following")}
          >
            Truyện đã hoàn thành
          </button>
          <button
            className={getTabClassName("myStories")}
            onClick={() => handleTabClick("myStories")}
          >
            Truyện theo dõi
          </button>
        </Center>

        {/* Tab Content */}
        <Box className="flex flex-col items-center mt-8 mb-24">
          {activeTab === "following" && (
            <Box
              id="following-content"
              className="container w-3/4 mt-12 mb-32"
            >
              {followedStories.length > 0 ? (
                <SimpleGrid
                  cols={{ base: 2, xs: 3, sm: 4 }} // Responsive columns
                  spacing={{ base: "md", lg: "xl" }} // Responsive spacing
                >
                  {followedStories.map((story) => (
                    <StoryCard key={story.id} story={story} />
                  ))}
                </SimpleGrid>
              ) : (
                <Text align="center" mt="xl">
                  Bạn chưa theo dõi truyện nào.
                </Text>
              )}
            </Box>
          )}

          {/* My Stories Content */}
          {activeTab === "myStories" && (
            <Box
              id="my-stories-content"
              className="w-full lg:w-2/3 flex flex-col justify-center mt-12 mb-32"
            >
              {myStories.length === 0 ? (
                <Stack align="center" gap="md">
                  <Text size="xl" fw={700} ta="center" c="blue.5">
                    Bạn chưa có truyện nào ư?
                  </Text>
                  <Image
                    src="/images/meo_chua_co_truyen.png"
                    maw={rem(300)}
                    alt="Mèo chưa có truyện"
                  />{" "}
                  {/* Max width */}
                  <Text size="xl" fw={700} ta="center" c="blue.5">
                    Hãy trở thành tác giả độc quyền của chúng tôi với nhiều ưu
                    đãi hấp dẫn nhé!
                  </Text>
                </Stack>
              ) : (
                <SimpleGrid
                  cols={{ base: 2, xs: 3, sm: 4 }}
                  spacing={{ base: "md", lg: "xl" }}
                >
                  {myStories.map((story) => (
                    <StoryCard key={story.id} story={story} />
                  ))}
                </SimpleGrid>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default AuthorPage;
