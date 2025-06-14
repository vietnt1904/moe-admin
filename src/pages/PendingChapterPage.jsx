import {
  Box,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { usePendingChapter } from "../hooks/useChapter";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import ChapterService from "../services/ChapterService";

const PendingChapterPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: chapter } = usePendingChapter(id);
  console.log(chapter);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDecision = (data, status) => {
    console.log("status", status);
    console.log("Submit", data);
    ChapterService.updatePendingChapter(id, data);
    queryClient.invalidateQueries(["pendingChapters"]);
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
      <Paper shadow="sm" p="lg" radius="md" withBorder>
        <Title order={1} className="text-center pb-8">
          Thông tin chi tiết chương
        </Title>
        <SimpleGrid cols={1} spacing="lg">
          <Title order={2} fw={700}>
            Tên truyện: {chapter?.Story?.title}
            <Button
              size="sm"
              radius="md"
              color="green"
              className="ml-8"
              onClick={() => {
                navigate(`/admin/stories/${chapter?.Story?.id}`);
              }}
            >
              Xem truyện
            </Button>
          </Title>
          <Text size="xl">
            Chương {chapter?.chapterNumber}: {chapter?.title}
          </Text>
          <Text>
            Trạng thái:{" "}
            {chapter?.status === "pending" ? "Đang chờ duyệt" : "Đã đăng"}
          </Text>
          <Box>
            <Text fw={500} mb="xs">
              Nội dung chương:
            </Text>
            <Paper
              p="md"
              radius="sm"
              withBorder
              style={{
                whiteSpace: "pre-wrap", // Preserves newlines and spaces
                maxHeight: "400px",
                overflowY: "auto",
              }}
            >
              {chapter?.content || (
                <Text c="dimmed">Không có nội dung.</Text>
              )}
            </Paper>
          </Box>
        </SimpleGrid>
      </Paper>
      <Paper shadow="xs" p="lg" radius="md" withBorder>
        <Title order={3} mb="md">
          Phê Duyệt Chương
        </Title>
        <form>
          <Textarea
            label="Nhập lý do phê duyệt chương"
            description="Lý do để đồng ý hoặc từ chối chương này"
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

export default PendingChapterPage;
