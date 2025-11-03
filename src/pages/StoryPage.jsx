import {
  Paper,
  Avatar,
  Image,
  Text,
  Title,
  Badge,
  Group,
  Stack,
  Divider,
  SimpleGrid,
  Code,
  Button, // Dùng để hiển thị ID hoặc slug nếu muốn
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useStory } from "../hooks/useStory";
import { useChaptersByStoryId } from "../hooks/useChapter";
import { dateOfBirth, formatDate } from "../utils";
import StoryService from "../services/StoryService.js";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import ChapterService from "../services/ChapterService.js";

const renderListAsBadges = (list) => {
  if (!list || list.length === 0) {
    return (
      <Text size="sm" c="dimmed">
        Không có
      </Text>
    );
  }
  return (
    <Group gap="xs">
      {list.map((item, index) => (
        // Giả sử item là string hoặc có thuộc tính 'name'
        <Badge key={index} variant="light">
          {typeof item === "string" ? item : item?.name || "N/A"}
        </Badge>
      ))}
    </Group>
  );
};

const StoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: story } = useStory(id);
  const author = story?.Author;

  const { data: chapters } = useChaptersByStoryId(id);
  console.log('chapters', chapters);
  const queryClient = useQueryClient();

  if (!story) {
    return <Paper p="md">Không có dữ liệu để hiển thị.</Paper>;
  }

  const handleChangeStatus = async () => {
    if (!story) return;
    let newStatus = story?.status === "active" ? "suspended" : "active";
    const data = await StoryService.changeStoryStatusAdmin(id, newStatus);
    if (data === true) {
      queryClient.invalidateQueries(["story", id]);
      notifications.show({
        color: "green",
        title: "Cập nhật thành công",
        message: "Cập nhật trạng thái truyện thành công",
      });
    } else {
      notifications.show({
        color: "red",
        title: "Cập nhật thất bại",
        message: "Đã có lỗi xảy ra, vui lòng thử lại.",
      });
    }
  };

  const handleChangeStatusChapter = async (chapter) => {
    if (!story) return;
    let newStatus = chapter?.status === "published" ? "suspended" : "published";
    const data = await ChapterService.changeChapterStatusAdmin(chapter?.id, newStatus);
    if (data === true) {
      await queryClient.invalidateQueries(["chapters", id]);
      notifications.show({
        color: "green",
        title: "Cập nhật thành công",
        message: "Cập nhật trạng thái chương truyện thành công",
      })
      console.log(chapter?.status, data);
    } else {
      notifications.show({
        color: "red",
        title: "Cập nhật thất bại",
        message: "Đã có lỗi xảy ra, vui lòng thử lại.",
      });
    }
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* --- Phần Thông Tin Người Dùng --- */}
      <Paper shadow="sm" p="lg" radius="md" withBorder>
        <Title order={3} mb="md">
          Thông Tin Người Đăng (Tác giả)
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          {/* Cột trái: Avatar và Info cơ bản */}
          <Stack align="center">
            {author?.avatar && (
              <Avatar
                src={author?.avatar}
                alt={author?.fullName || author?.username}
                size={120}
                radius="50%"
                className="mb-4"
              />
            )}
            <Title order={4}>{author?.fullName || "Chưa cập nhật"}</Title>
            <Text>Tên đăng nhập: {author?.username}</Text>
            <Text>
              Vai trò:
              <Badge
                color={author?.role === "admin" ? "red" : "blue"}
                variant="light"
                size="lg"
              >
                {author?.role?.toUpperCase() || "N/A"}
              </Badge>
            </Text>
          </Stack>

          <Stack gap="sm">
            <InfoItem label="ID Người dùng" value={author?.id || "N/A"} />
            <InfoItem label="Email" value={author?.email} iconName="mail" />
            <InfoItem
              label="Số điện thoại"
              value={author?.phoneNumber || "N/A"}
              iconName="phone"
            />
            <InfoItem
              label="Ngày sinh"
              value={dateOfBirth(author?.dob)}
              iconName="calendar"
            />
            <InfoItem
              label="Linh Thạch"
              value={author?.spiritStones?.toString() || "0"}
            />
            <InfoItem
              label="Ngày tạo TK"
              value={formatDate(author?.createdAt)}
            />
            <InfoItem
              label="Cập nhật TK lần cuối"
              value={formatDate(author?.updatedAt)}
            />
            {author?.backgroundImage && (
              <Stack gap="xs" mt="md">
                <Text fw={500} size="sm">
                  Ảnh bìa:
                </Text>
                <Image
                  src={author?.backgroundImage}
                  radius="sm"
                  alt="Ảnh bìa người dùng"
                  height={100}
                  fit="cover"
                />
              </Stack>
            )}
          </Stack>
        </SimpleGrid>
      </Paper>
      {/* --- Phần Thông Tin Nội Dung (Truyện/Bài viết) --- */}
      <Paper shadow="sm" p="lg" radius="md" withBorder>
        <div className="flex justify-between">
          <Title order={3} mb="md">
            Thông Tin Truyện
          </Title>
          <Button onClick={handleChangeStatus}>
            {story?.status === "active"
              ? "Tạm dừng truyện"
              : "Bỏ tạm dừng truyện"}
          </Button>
        </div>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
          {/* Cột 1: Ảnh và Tiêu đề */}
          <Stack>
            {story?.image && (
              <Image
                src={story?.image}
                radius="md"
                alt={story?.title || "Ảnh bìa truyện"}
                height={200}
                fit="contain"
                className="mb-4 bg-gray-100"
              /> // Tailwind: nền ảnh
            )}
            <Title order={4}>{story?.title || "Chưa có tiêu đề"}</Title>
            <InfoItem
              label="Tác giả (Tên hiển thị)"
              value={story?.authorName || "N/A"}
            />
            <InfoItem label="ID truyện" value={story?.id || "N/A"} />
            <InfoItem label="Slug" value={story?.slug} />
          </Stack>

          {/* Cột 2: Mô tả và Trạng thái */}
          <Stack>
            <Text fw={500} size="sm">
              Mô tả:
            </Text>
            <Text
              size="sm"
              className="p-2 bg-gray-50 rounded border border-gray-200 min-h-[80px]"
            >
              {story?.description || (
                <span className="text-gray-400 italic">Không có mô tả</span>
              )}
            </Text>
            <Divider my="sm" />
            <InfoItem
              label="Loại"
              value={<Badge variant="outline">{story?.type || "N/A"}</Badge>}
            />
            <InfoItem
              label="Trạng thái"
              value={
                <Badge color={getStatusColor(story?.status)}>
                  {story?.status?.toUpperCase() || "N/A"}
                </Badge>
              }
            />
            <InfoItem
              label="Kết thúc"
              value={
                <Badge
                  variant="light"
                  color={story?.ending === "HE" ? "green" : "gray"}
                >
                  {story?.ending || "Chưa rõ"}
                </Badge>
              }
            />
            <InfoItem
              label="Hoàn thành"
              value={
                <Badge color={story?.finished ? "teal" : "orange"}>
                  {story?.finished ? "Đã xong" : "Đang tiến hành"}
                </Badge>
              }
            />
            <InfoItem label="Timeline" value={story?.timeline || "N/A"} />
            <InfoItem
              label="Yếu tố 18+"
              value={
                <Badge color={story?.is18Plus ? "red" : "gray"}>
                  {story?.is18Plus ? "Có" : "Không"}
                </Badge>
              }
            />
            <InfoItem
              label="Lịch ra chap"
              value={story?.releaseSchedule || "Không có"}
            />
          </Stack>

          {/* Cột 3: Thống kê và Liên kết */}
          <Stack>
            <Title order={5} mb="xs">
              Thống kê
            </Title>
            <InfoItem
              label="Lượt xem"
              value={story?.views?.toLocaleString("vi-VN") || "0"}
            />
            <InfoItem
              label="Thích"
              value={story?.likes?.toLocaleString("vi-VN") || "0"}
            />
            <InfoItem
              label="Không thích"
              value={story?.dislikes?.toLocaleString("vi-VN") || "0"}
            />
            <InfoItem
              label="Theo dõi"
              value={story?.followers?.toLocaleString("vi-VN") || "0"}
            />
            <InfoItem
              label="Đánh giá (Rating)"
              value={story?.rating?.toFixed(1) || "0.0"}
            />
            <InfoItem
              label="Sao (Star)"
              value={story?.star?.toFixed(1) || "0.0"}
            />

            <Divider my="sm" />

            <Title order={5} mb="xs">
              Thể loại (Genres)
            </Title>
            {renderListAsBadges(story?.Genres)}

            <Divider my="sm" />

            <Title order={5} mb="xs">
              Chủ đề (Topics)
            </Title>
            {renderListAsBadges(story?.Topics)}

            <Divider my="sm" />
            <InfoItem label="Ngày đăng" value={formatDate(story?.createdAt)} />
            <InfoItem
              label="Cập nhật lần cuối"
              value={formatDate(story?.updatedAt)}
            />
          </Stack>
        </SimpleGrid>
      </Paper>
      {/* --- Phần Danh Sách Chương --- */}
      <Paper shadow="xs" p="lg" radius="md" withBorder>
        <Title order={3} mb="md">
          Danh sách chương
        </Title>
        {/* Kiểm tra nếu không có chương nào */}
        {!chapters || chapters.length === 0 ? (
          <Text c="dimmed" ta="center">
            Chưa có chương nào được thêm.
          </Text>
        ) : (
          // Dùng Stack để xếp các chương dọc xuống, có khoảng cách
          <Stack gap="md">
            {chapters.map((chapter) => (
              // Mỗi chương là một Group hoặc Paper nhỏ bên trong
              <Paper
                key={chapter?.id}
                p="sm"
                withBorder
                radius="sm"
                className="hover:bg-gray-50 transition-colors"
              >
                {/* Tailwind: hiệu ứng hover */}
                <Group justify="space-between" wrap="nowrap">
                  {/* Căn chỉnh nội dung và nút actions */}
                  {/* Phần thông tin chương */}
                  <Stack gap={2}>
                    {/* Khoảng cách nhỏ giữa tiêu đề và thông tin phụ */}
                    <Text fw={500} lineClamp={1}>
                      {/* Giới hạn 1 dòng cho tiêu đề */}
                      {chapter?.title || "Chưa có tiêu đề"}
                    </Text>
                    <Group gap="xs">
                      <Text size="xs" c="dimmed">
                        Lượt xem: {chapter?.views?.toLocaleString("vi-VN") || 0}
                      </Text>
                    </Group>
                  </Stack>
                  {/* Phần nút hành động */}
                  <Group gap="xs" wrap="nowrap">
                    <Button
                      onClick={() => navigate(`/admin/chapters/${chapter?.id}`)}
                    >
                      Chi tiết
                    </Button>
                    <Button
                      onClick={() => handleChangeStatusChapter(chapter)}
                    >
                      {chapter?.status === "published"
                        ? "Unpublish"
                        : "Publish"}
                    </Button>
                  </Group>
                </Group>
              </Paper>
            ))}
          </Stack>
        )}
      </Paper>
    </div>
  );
};

// Component con để hiển thị cặp Label-Value cho gọn
const InfoItem = ({ label, value, isCode = false, iconName }) => {
  // Map iconName to actual Icon component if needed
  // const IconComponent = iconMap[iconName]; // Example mapping
  return (
    <Group wrap="nowrap" gap="xs" justify="space-between">
      <Text size="sm" fw={500} className="whitespace-nowrap">
        {/* {IconComponent && <ThemeIcon variant="light" size="xs" mr={4}><IconComponent size={14}/></ThemeIcon>} */}
        {label}:
      </Text>
      {isCode ? (
        <Code className="break-all">
          {value ?? "N/A"}
        </Code> /* Tailwind: cho phép ngắt chữ nếu quá dài */
      ) : (
        <Text
          size="sm"
          c={value ? "inherit" : "dimmed"}
          className="text-right break-words"
        >
          {/* Tailwind: căn phải, cho phép ngắt chữ */}
          {value ?? "N/A"}
        </Text>
      )}
    </Group>
  );
};

// Hàm lấy màu cho Badge trạng thái (ví dụ)
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "yellow";
    case "approved":
    case "published":
      return "green";
    case "rejected":
      return "red";
    case "draft":
      return "gray";
    default:
      return "blue";
  }
};

export default StoryPage;
