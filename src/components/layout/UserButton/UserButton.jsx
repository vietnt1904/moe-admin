import { Avatar, Button, Group, Menu, Modal, Popover, Text, UnstyledButton } from "@mantine/core";
import { IconChevronRight, IconLock, IconLogout, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/AuthService.js";
import classes from "./UserButton.module.css";
import { useAccountInfo } from "../../../hooks/useCurrentUser.js";

export function UserButton() {
    const [opened, setOpened] = useState(false);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const navigate = useNavigate();
    const { data: user, isLoading } = useAccountInfo();

    if (isLoading) return <p>Loading...</p>;

    const handleLogout = () => {
        AuthService.logout();
        navigate("/");
    };

    const handleChangePassword = () => {
        navigate("/changepassword");
    };

    const handleProfile = () => {
        navigate("/main/profile");
    };

    return (
        <>
            <Popover
                opened={opened}
                onChange={setOpened}
                position="bottom-end"
                withArrow
                shadow="md"
            >
                {/* Nút User */}
                <Popover.Target>
                    <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.user}>
                        <Group>
                            <Avatar
                                src={user?.avatar || "/images/Account.png"}
                                radius="xl"
                            />

                            <div style={{ flex: 1 }}>
                                <Text size="sm" fw={500}>
                                    {user?.fullName || "unknown"}
                                </Text>

                                <Text c="dimmed" size="xs">
                                    {user?.email || "emailPlaceholder@gmail.com"}
                                </Text>
                            </div>

                            <IconChevronRight size={14} stroke={1.5} />
                        </Group>
                    </UnstyledButton>
                </Popover.Target>

                {/* Menu xuất hiện khi nhấn */}
                <Popover.Dropdown>
                    <Menu>
                        <Menu.Item icon={<IconUser size={16} />}>
                            Xem thông tin
                        </Menu.Item>
                        <Menu.Item icon={<IconLock size={16} />}>
                            Đổi mật khẩu
                        </Menu.Item>
                        <Menu.Item
                            icon={<IconLogout size={16} />}
                            color="red"
                            onClick={() => setLogoutModalOpen(true)}
                        >
                            Đăng xuất
                        </Menu.Item>
                    </Menu>
                </Popover.Dropdown>
            </Popover>

            {/* Modal xác nhận đăng xuất */}
            <Modal
                opened={logoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
                title="Xác nhận"
            >
                <Text>Bạn có chắc chắn muốn đăng xuất không?</Text>
                <Group position="right" mt="md">
                    <Button variant="default" onClick={() => setLogoutModalOpen(false)}>
                        Hủy
                    </Button>
                    <Button color="red" onClick={handleLogout}>
                        Đăng xuất
                    </Button>
                </Group>
            </Modal>
        </>
    );
}
