import { Container, Group, Paper, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconLayoutDashboard } from "@tabler/icons-react";

const HomePage = () => {

  return (
    <Container fluid className="bg-slate-50 min-h-screen p-4 md:p-8 my-10">
      <Stack gap="xl">
        {/* Header Chào Mừng */}
        <Paper shadow="md" p="xl" radius="md" withBorder>
          <Group>
            <ThemeIcon variant="light" size={60} radius="md" color="indigo">
              <IconLayoutDashboard style={{ width: 'rem(30)', height: 'rem(30)' }} />
            </ThemeIcon>
            <div>
              <Title order={2} className="text-slate-700">
                Chào mừng trở lại!
              </Title>
              <Text c="dimmed" size="lg">
                Đây là trang tổng quan quản trị cho Ganymede.
              </Text>
              <Text size="sm" mt="xs">
                Từ đây, bạn có thể dễ dàng truy cập các chức năng quản lý chính của hệ thống.
              </Text>
            </div>
          </Group>
        </Paper>
        {/* Các Hành Động Nhanh */}
      </Stack>
    </Container>
  );
};

export default HomePage;
