import { Button, Card, Input, Modal, Paper, Table, Title } from "@mantine/core";
import { useAdminTopics } from "../hooks/useTopic";
import { useForm } from "react-hook-form";
import { useState } from "react";
import TopicService from "../services/TopicService";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";

const TopicsPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data: topics } = useAdminTopics();

  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const queryClient = useQueryClient();

  const onSubmit = async (data) => {
    setLoading(true);
    reset();
    const addTopic = await TopicService.addTopic(data);
    if (addTopic?.success) {
      notifications.show({
        title: "Thêm chủ đề thành công",
        message: "Thêm thành công",
        color: "green",
      });
      queryClient.invalidateQueries("topics");
    } else {
      notifications.show({
        title: "Thêm chủ đề thất bại",
        message: addTopic?.message,
        color: "red",
      });
    }
    setLoading(false);
  };

  const handleChangeActive = async (id, isActive) => {
    const isUpdate = await TopicService.updateTopic(id, {
      isActive: !isActive,
    });
    if(isUpdate) {
      notifications.show({
        title: "Cập nhật thành công",
        message: "Thay đổi trạng thái của chủ đề thành công",
        color: "green",
      });
      queryClient.invalidateQueries("topics");
    } else {
      notifications.show({
        title: "Cập nhật thất bại",
        message: "Thay đổi trạng thái của chủ đề thất bại. Hãy thử lại.",
        color: "red",
      });
    }
  };

  return (
    <Paper
      shadow="xs"
      p="xl"
      radius="md"
      withBorder
      m={"xl"}
      className="relative"
    >
      <Title order={2} className="text-center pb-4">
        Danh sách chủ đề
      </Title>
      <div className="absolute top-4 right-4">
        <Button onClick={open}>Thêm chủ đề</Button>
      </div>
      <Table highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>STT</Table.Th>
            <Table.Th>ID</Table.Th>
            <Table.Th>Tên chủ đề</Table.Th>
            <Table.Th>Trạng thái</Table.Th>
            <Table.Th>Hoạt động</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {topics?.map((topic, index) => (
            <Table.Tr key={topic?.id}>
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td>{topic?.id}</Table.Td>
              <Table.Td>{topic?.name}</Table.Td>
              <Table.Td>{topic?.isActive ? "Hoạt động" : "Đang khóa"}</Table.Td>
              <Table.Td>
                <Button
                  onClick={() => handleChangeActive(topic?.id, topic?.isActive)}
                >
                  {topic?.isActive ? "Deactive" : "Active"}
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Modal
        opened={opened}
        centered
        onClose={close}
        title={<Title order={2}>Thêm chủ đề</Title>}
      >
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="mb-1 font-medium text-lg">Tên chủ đề mới</p>
            <Input
              className="focus"
              {...register("name", { required: "Vui lòng nhập tên chủ đề" })}
              placeholder="Tên chủ đề"
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
            <Button
              className="float-right mt-4"
              type="submit"
              loading={loading}
              disabled={loading}
            >
              Tạo
            </Button>
          </form>
        </Card>
      </Modal>
    </Paper>
  );
};

export default TopicsPage;
