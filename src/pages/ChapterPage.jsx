import {
  Button,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useChapterAdmin } from "../hooks/useChapter";

const ChapterPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: chapter } = useChapterAdmin(id);
  console.log("chapter", chapter);
  
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
                navigate(`/admin/stories/${chapter?.storyId}`);
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
          <div className="border-2 border-gray-300 p-2 rounded-lg">
          <Text size="lg" label="Nội dung:">
            {chapter?.content}
          </Text>
          </div>
        </SimpleGrid>
      </Paper>
    </div>
  );
};

export default ChapterPage;
