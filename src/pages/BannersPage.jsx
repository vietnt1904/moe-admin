import {
  Button,
  FileInput,
  Group,
  Image,
  Modal,
  Pagination,
  Paper,
  Table,
  TextInput,
  Title,
} from "@mantine/core";
import { useAdminBanners } from "../hooks/useBanner";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { IconUpload } from "@tabler/icons-react";
import BannerService from "../services/BannerService";
import { notifications } from "@mantine/notifications";
import { DateInput } from "@mantine/dates";
import { dateOfBirth } from "../utils";
import { useQueryClient } from "@tanstack/react-query";

const BannerPage = () => {
  const PAGE = 1;
  const LIMIT = 20;
  const [page, setPage] = useState(PAGE);

  const { data: bannersData } = useAdminBanners(page, LIMIT);
  const banners = bannersData?.banners || [];
  const totalPages = Math.ceil(bannersData?.totalPages / LIMIT) || 1;

  const [opened, { open, close }] = useDisclosure(false);
  const [openedUpdate, { open: openUpdate, close: closeUpdate }] =
    useDisclosure(false);

  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [updateBannerLoading, setUpdateBannerLoading] = useState(false);

  const queryClient = useQueryClient();

  const [updateName, setUpdateName] = useState("");
  const [updateFile, setUpdateFile] = useState(null);
  const [updatePreview, setUpdatePreview] = useState(null);
  const [updateErrors, setUpdateErrors] = useState({});
  const [updateStartDate, setUpdateStartDate] = useState("");
  const [updateEndDate, setUpdateEndDate] = useState("");

  const handleFileChange = (file) => {
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleUpdateFileChange = (file) => {
    setUpdateFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUpdatePreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    } else {
      setUpdatePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Vui lòng nhập tên banner";
    }
    if (!file) {
      newErrors.file = "Vui lòng chọn ảnh banner";
    }
    if (endDate <= startDate) {
      newErrors.date = "Ngày kết thúc phải sau ngày bắt đầu";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", file);
      formData.append("startDate", startDate.toISOString());
      formData.append("endDate", endDate.toISOString());

      const addBanner = await BannerService.addBanner(formData);
      if (addBanner?.success) {
        close();
        setName("");
        setFile(null);
        setPreview(null);
        setErrors({});
        notifications.show({
          title: "Thêm banner thành công",
          message: "Thêm banner thành công",
          color: "green",
        });
      } else {
        notifications.show({
          title: "Thêm banner thất bại",
          message: "Thêm banner thất bại. Vui lòng thử lại.",
          color: "red",
        });
      }
      setLoading(false);
    }
  };

  const changeStatus = async (id, status) => {
    const changeStatus = await BannerService.updateBannerStatus(id, !status);
    if (changeStatus?.success) {
      notifications.show({
        title: "Cập nhật trạng thái banner",
        message: "Cập nhật trạng thái banner thành công",
        color: "green",
      });
      queryClient.invalidateQueries("banners", PAGE, LIMIT);
    } else {
      notifications.show({
        title: "Cập nhật trạng thái banner thất bại",
        message: "Cập nhật trạng thái banner thất bại. Vui lòng thử lại.",
        color: "red",
      });
    }
  };

  const handleSelectBanner = (banner) => {
    setSelectedBanner(banner);
    openUpdate();
  };

  const handleUpdate = async () => {
    if (!selectedBanner) return;
    setUpdateBannerLoading(true);
    const formData = new FormData();
    formData.append("name", updateName || selectedBanner?.name);
    if (!updateFile) {
      formData.append("keep_image", true);
      formData.append("image", selectedBanner?.image);
    } else {
      formData.append("image", updateFile);
    }
    formData.append("startDate", updateStartDate || selectedBanner?.startDate);
    formData.append("endDate", updateEndDate || selectedBanner?.endDate);

    // console.log(formData);
    console.log(updateName, updateFile, updateStartDate, updateEndDate);

    const updateBanner = await BannerService.updateAdminBanner(
      selectedBanner.id,
      formData
    );
    if (updateBanner?.success) {
      closeUpdate();
      notifications.show({
        title: "Cập nhật banner",
        message: "Cập nhật banner thành công",
        color: "green",
      });
      queryClient.invalidateQueries("banners", PAGE, LIMIT);
    } else {
      notifications.show({
        title: "Cập nhật banner thất bại",
        message: "Cập nhật banner thất bại. Vui lòng thử lại.",
        color: "red",
      });
    }
    setUpdateBannerLoading(false);
  };

  const hanhdleStopAllBanners = async () => {
    const stopAllBanners = await BannerService.stopAllBanners();
    if (stopAllBanners?.success) {
      notifications.show({
        title: "Dừng hết sự kiện",
        message: "Dừng hết sự kiện thành công",
        color: "green",
      });
      queryClient.invalidateQueries("banners", PAGE, LIMIT);
    } else {
      notifications.show({
        title: "Dừng hết sự kiện thất bại",
        message: "Dừng hết sự kiện thất bại. Vui lòng thử lagi",
        color: "red",
      });
    }
  }

  return (
    <Paper
      shadow="xs"
      p="xl"
      radius="md"
      withBorder
      m={"xl"}
      className="relative"
    >
      <div className="absolute top-4 left-4">
        <Button onClick={hanhdleStopAllBanners}>Dừng hết sự kiện</Button>
      </div>
      <Title order={2} className="text-center pb-4">
        Danh sách banner
      </Title>
      <div className="absolute top-4 right-4">
        <Button onClick={open}>Thêm banner</Button>
        <Modal
          opened={opened}
          onClose={close}
          centered
          title={<Title order={3}>Thêm banner</Title>}
        >
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Tên banner"
              placeholder="Nhập tên banner"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              error={errors.name}
              mb="md"
            />
            <DateInput
              label="Ngày bắt đầu"
              placeholder="Chọn ngày bắt đầu"
              defaultValue={new Date()}
              mb="md"
              value={startDate}
              onChange={setStartDate}
            />
            <DateInput
              label="Ngày kết thúc"
              placeholder="Chọn ngày kết thúc"
              defaultValue={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
              mb="md"
              value={endDate}
              onChange={setEndDate}
              error={errors.date}
            />

            <FileInput
              label="Ảnh banner"
              placeholder="Chọn ảnh"
              value={file}
              onChange={handleFileChange}
              icon={<IconUpload size={16} />}
              accept="image/*"
              error={errors.file}
              mb="md"
            />

            {preview && (
              <Image
                src={preview}
                alt="Preview"
                radius="md"
                withPlaceholder
                maw={300}
                mb="md"
              />
            )}

            <Group justify="flex-end">
              <Button type="submit" loading={loading} disabled={loading}>
                Thêm
              </Button>
            </Group>
          </form>
        </Modal>
      </div>
      <Table highlightOnHover withTableBorder withColumnBorders>
        <Table.Tr>
          <Table.Th>STT</Table.Th>
          <Table.Th>Hình ảnh</Table.Th>
          <Table.Th>Tiêu đề</Table.Th>
          <Table.Th>Ngày bắt đầu</Table.Th>
          <Table.Th>Ngày kết thúc</Table.Th>
          <Table.Th>Trạng thái</Table.Th>
          <Table.Th>Hành động</Table.Th>
        </Table.Tr>

        {banners?.map((banner, index) => {
          return (
            <Table.Tr key={banner.id}>
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td>
                <Image
                  src={banner?.image}
                  alt={banner?.name}
                  radius="md"
                  withPlaceholder
                  maw={100}
                />
              </Table.Td>
              <Table.Td>{banner?.name}</Table.Td>
              <Table.Td>{dateOfBirth(banner?.startDate)}</Table.Td>
              <Table.Td>{dateOfBirth(banner?.endDate)}</Table.Td>
              <Table.Td>
                {banner?.isActive ? "Hoạt động" : "Đang khóa"}
              </Table.Td>
              <Table.Td>
                <Button onClick={() => handleSelectBanner(banner)}>
                  Cập nhật
                </Button>
                <Button
                  color="green"
                  className="ml-4"
                  onClick={() => changeStatus(banner?.id, banner?.isActive)}
                >
                  {banner?.isActive ? "Khóa" : "Mở"}
                </Button>
              </Table.Td>
            </Table.Tr>
          );
        })}
      </Table>
      {totalPages && (
        <Group justify="center" mt="md">
          <Pagination
            value={page}
            onChange={setPage}
            total={totalPages}
            color="blue"
          />
        </Group>
      )}
      <Modal
        opened={openedUpdate}
        onClose={closeUpdate}
        title={<Title order={3}>Cập nhật banner</Title>}
      >
        {selectedBanner && (
          <form>
            <TextInput
              label="Tên banner"
              placeholder="Nhập tên banner"
              defaultValue={selectedBanner?.name}
              onChange={(e) => {
                setUpdateName(e.currentTarget.value);
              }}
              mb="md"
            />
            <DateInput
              label="Ngày bắt đầu"
              placeholder="Chọn ngày bắt đầu"
              defaultValue={new Date(selectedBanner?.startDate)}
              mb="md"
              onChange={setUpdateStartDate}
            />
            <DateInput
              label="Ngày kết thúc"
              placeholder="Chọn ngày kết thúc"
              defaultValue={new Date(selectedBanner.endDate)}
              mb="md"
              onChange={setUpdateEndDate}
            />
            <FileInput
              label="Ảnh banner"
              placeholder="Chọn ảnh"
              value={file}
              onChange={handleUpdateFileChange}
              icon={<IconUpload size={16} />}
              accept="image/*"
              mb="md"
            />
            {updatePreview ? (
              <Image
                src={updatePreview}
                alt="Preview"
                radius="md"
                withPlaceholder
                maw={300}
                mb="md"
              />
            ) : (
              <Image
                src={selectedBanner?.image}
                alt={selectedBanner?.name}
                radius="md"
                withPlaceholder
                maw={300}
                mb="md"
              />
            )}
            <Group>
              <Button onClick={closeUpdate} disabled={updateBannerLoading}>
                Hủy
              </Button>
              <Button
                onClick={handleUpdate}
                loading={updateBannerLoading}
                disabled={updateBannerLoading}
              >
                Cập nhật
              </Button>
            </Group>
          </form>
        )}
      </Modal>
    </Paper>
  );
};

export default BannerPage;
