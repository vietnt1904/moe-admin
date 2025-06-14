import { useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser.js";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Image,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconClockHour4 } from "@tabler/icons-react";
import { IconSparkles } from "@tabler/icons-react";
import { IconCalendarEvent } from "@tabler/icons-react";
import { IconPhone } from "@tabler/icons-react";
import { IconMail } from "@tabler/icons-react";
import { IconId } from "@tabler/icons-react";
import { IconEdit } from "@tabler/icons-react";
import UserService from "../services/UserService.js";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const UserPage = () => {
  const { id } = useParams();
  const { data } = useUser(id);
  const queryClient = useQueryClient();
  const user = data?.user;
  const [stone, setStone] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const roleColors = {
    admin: "blue",
    user: "green",
  };

  const handleUpdateStone = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      await UserService.updateUser(id, { spiritStones: Number(stone) });
      queryClient.invalidateQueries(["user", id]);
      setStone(0);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card
        shadow="xl"
        padding="0"
        radius="lg"
        withBorder
        className="w-full max-w-2xl overflow-hidden"
      >
        {/* Background Image Section */}
        <Box className="relative h-48 md:h-64">
          <Image
            src={user?.backgroundImage}
            alt="Background Image"
            className="object-cover w-full h-full"
          />
          {/* Avatar overlapping background */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <Avatar
              src={user?.avatar}
              alt={user?.fullName}
              size={120} // Kích thước avatar
              radius="50%" // Bo tròn hoàn toàn
              className="border-4 border-white shadow-md"
            />
          </div>
        </Box>

        {/* Profile Info Section */}
        <Stack align="center" className="pt-20 pb-8 px-6 md:px-8">
          {" "}
          {/* Tăng padding-top để có không gian cho avatar */}
          <Title order={2} className="text-gray-800">
            {user?.fullName}
          </Title>
          <Text c="dimmed" size="sm">
            @{user?.username}
          </Text>
          <Badge
            color={roleColors[user?.role] || "gray"}
            variant="light"
            size="lg"
            className="mt-2"
          >
            {user?.role.toUpperCase()}
          </Badge>
        </Stack>

        {/* Details Section */}
        <div className="px-6 md:px-8 pb-8 space-y-4">
          <InfoItem
            icon={<IconId size={20} className="text-blue-500" />}
            label="ID"
            value={user?.id}
          />
          <InfoItem
            icon={<IconMail size={20} className="text-red-500" />}
            label="Email"
            value={user?.email}
          />
          <InfoItem
            icon={<IconPhone size={20} className="text-green-500" />}
            label="Điện thoại"
            value={user?.phoneNumber}
          />
          <InfoItem
            icon={<IconCalendarEvent size={20} className="text-purple-500" />}
            label="Ngày sinh"
            value={formatDate(user?.dob)}
          />
          <InfoItem
            icon={<IconSparkles size={20} className="text-yellow-500" />}
            label="Linh Thạch"
          >
            <Text fw={700} c="orange.7">
              {user?.spiritStones}
            </Text>
          </InfoItem>
          <InfoItem
            icon={<IconClockHour4 size={20} className="text-cyan-500" />}
            label="Ngày tham gia"
            value={formatDate(user?.createdAt)}
          />
          <InfoItem
            icon={<IconEdit size={20} className="text-gray-500" />}
            label="Cập nhật lần cuối"
            value={formatDate(user?.updatedAt)}
          />
        </div>
        <Divider size={"md"} />
        <div className="px-6 md:px-8 pb-8">
          <TextInput
            type="number"
            label="Cập nhật linh thạch"
            value={stone}
            description="có thể nhập số nguyên âm"
            placeholder="Thêm linh thạch"
            onChange={(e) => setStone(e.target.value)}
            error={
              stone === "" ||
              Number.isNaN(Number(stone)) ||
              !Number.isInteger(Number(stone))
                ? "Vui lòng nhập số nguyên"
                : null
            }
          />
          <Button
            fullWidth
            mt="md"
            className="bg-blue-500 hover:bg-blue-600"
            onClick={(e) => handleUpdateStone(e)}
            loading={isLoading}
          >
            Xác nhận
          </Button>
        </div>
      </Card>
    </div>
  );
};

const InfoItem = ({ icon, label, value, children }) => (
  <Group
    grow
    align="center"
    className="py-3 border-b border-slate-200 last:border-b-0"
  >
    <Group gap="sm" className="min-w-[150px]">
      {icon}
      <Text fw={500} size="sm" className="text-gray-700">
        {label}:
      </Text>
    </Group>
    {children ? (
      children
    ) : (
      <Text size="sm" className="text-gray-600 text-right md:text-left">
        {value || "N/A"}
      </Text>
    )}
  </Group>
);

export default UserPage;
