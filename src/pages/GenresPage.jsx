import { useForm } from "react-hook-form";
import { useAdminGenres } from "../hooks/useGenre";
import { notifications } from "@mantine/notifications";
import GenreService from "../services/GenreService";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Card, Input, Modal, Paper, Table, Title } from "@mantine/core";

const GenresPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: genres } = useAdminGenres();
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const queryClient = useQueryClient();

  const onSubmit = async (data) => {
    setLoading(true);
    reset();
    const addTopic = await GenreService.addGenre(data);
    if (addTopic?.success) {
      notifications.show({
        title: "Thêm thể loại thành công",
        message: "Thêm thành công",
        color: "green",
      });
      queryClient.invalidateQueries("topics");
    } else {
      notifications.show({
        title: "Thêm thể loại thất bại",
        message: addTopic?.message,
        color: "red",
      });
    }
    setLoading(false);
  };

  const handleChangeActive = async (id, isActive) => {
    const isUpdate = await GenreService.updateGenre(id, {
      isActive: !isActive,
    });
    if (isUpdate) {
      notifications.show({
        title: "Cập nhật thành công",
        message: "Thay đổi trạng thái của thể loại thành công",
        color: "green",
      });
      queryClient.invalidateQueries("topics");
    } else {
      notifications.show({
        title: "Cập nhật thất bại",
        message: "Thay đổi trạng thái của thể loại thất bại. Hãy thử lại.",
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
        Danh sách thể loại
      </Title>
      <div className="absolute top-4 right-4">
        <Button onClick={open}>Thêm thể loại</Button>
      </div>
      <Table highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>STT</Table.Th>
            <Table.Th>ID</Table.Th>
            <Table.Th>Tên thể loại</Table.Th>
            <Table.Th>Trạng thái</Table.Th>
            <Table.Th>Hoạt động</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {genres?.map((genre, index) => (
            <Table.Tr key={genre?.id}>
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td>{genre?.id}</Table.Td>
              <Table.Td>{genre?.name}</Table.Td>
              <Table.Td>{genre?.isActive ? "Hoạt động" : "Đang khóa"}</Table.Td>
              <Table.Td>
                <Button
                  onClick={() => handleChangeActive(genre?.id, genre?.isActive)}
                >
                  {genre?.isActive ? "Deactive" : "Active"}
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
        title={<Title order={2}>Thêm thể loại</Title>}
      >
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="mb-1 font-medium text-lg">Tên thể loại mới</p>
            <Input
              className="focus"
              {...register("name", { required: "Vui lòng nhập tên thể loại" })}
              placeholder="Tên thể loại"
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

export default GenresPage;
