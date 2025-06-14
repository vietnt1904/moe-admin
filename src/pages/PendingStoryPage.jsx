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
  Button,
  Textarea, // Dùng để hiển thị ID hoặc slug nếu muốn
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { usePendingStory } from "../hooks/useStory";
import { dateOfBirth, formatDate } from "../utils";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import StoryService from "../services/StoryService.js";
import { useQueryClient } from "@tanstack/react-query";
// Giả sử bạn có icon (ví dụ từ thư viện tabler-icons-react)
// import { IconCheck, IconX, IconCalendar, IconPhone, IconMail, IconUser, IconLock } from '@tabler/icons-react';

// Hàm trợ giúp hiển thị danh sách (ví dụ: Genres, Topics)
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

const PendingStoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: story } = usePendingStory(id);
  const data = story;
  const author = story?.Author;
  console.log(data);

  if (!story) {
    return <Paper p="md">Không có dữ liệu để hiển thị.</Paper>;
  }

  const handleDecision = (data, status) => {
    console.log("status", status);
    console.log("Submit", data);
    StoryService.updatePendingStory(id, {...data, storyId: story.id, });
    queryClient.invalidateQueries(["pendingStories"]);
    navigate(-1);
  };

  const onAccept = (data) => {
    handleDecision({ ...data, status: "accept" }, "accept");
  };

  const onReject = (data) => {
    handleDecision({ ...data, status: "reject" }, "reject");
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
        <Title order={3} mb="md">
          Thông Tin Truyện
        </Title>
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
          Phê Duyệt Truyện
        </Title>
        <form>
          <Textarea
            label="Nhập lý do phê duyệt truyện"
            description="Lý do để đồng ý hoặc từ chối truyện"
            placeholder="Lý do…"
            {...register("reason", {
              required: "Vui lòng nhập lý do",
            })}
            error={errors.reason?.message}
          />
          <Group position="right" mt="md" className="">
            <Button bg={"yellow.4"} c={"black"} onClick={() => navigate(-1)}>
              Quay lại
            </Button>
            <Button bg={"green"} onClick={handleSubmit(onAccept)}>
              Đồng ý
            </Button>
            <Button bg={"red"} onClick={handleSubmit(onReject)}>
              Từ chối
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
};

// Component con để hiển thị cặp Label-Value cho gọn
const InfoItem = ({ label, value, isCode = false }) => {
  // Map iconName to actual Icon component if needed
  // const IconComponent = iconMap[iconName]; // Example mapping
  return (
    <Group wrap="nowrap" gap="xs" justify="space-between">
      <Text size="sm" fw={500} className="whitespace-nowrap">
        {/* Tailwind: không xuống dòng */}
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

InfoItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  isCode: PropTypes.bool,
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

export default PendingStoryPage;
