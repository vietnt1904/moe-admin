import React, { useState } from 'react';
import { Container, Title, Text, Button, Image, Group, Stack, Paper, Center, Box } from '@mantine/core';
// Assuming you have Tailwind configured in your project

// Sample Data (replace with actual data fetching)
const sampleNotification = {
    id: Math.random(), // Ensure unique key for map
    imageUrl: '/images/anh_truyen_dai_dien.png', // Replace with actual path or import
    title: 'Truyện bạn theo dõi đã có chương mới!',
    description: 'Truyện Jujutsu Kaisen vừa mới được đăng chapter 298!',
    timestamp: '2 ngày trước',
};

const unreadNotificationsData = [
    { ...sampleNotification, id: 1 },
    { ...sampleNotification, id: 2 },
];

const readNotificationsData = [
    { ...sampleNotification, id: 3 },
    { ...sampleNotification, id: 4 },
    { ...sampleNotification, id: 5 },
    { ...sampleNotification, id: 6 },
    { ...sampleNotification, id: 7 },
    { ...sampleNotification, id: 8 },
];

// Notification Item Component (to avoid repetition)
const NotificationItem = ({ notification }) => (
    <Paper shadow="xs" p="md" radius="md" className="w-full flex relative gap-4 mb-4">
        {/* Use Box for responsive width control */}
        <Box w={{ base: '25%', sm: '16.66%', lg: '8.33%' }} className="flex justify-center overflow-hidden items-start">
            <Image
                src={notification?.imageUrl}
                alt="Ảnh truyện đại diện"
                width="75%" // Relative width within its container
                height="auto"
                fit="contain"
                className="object-contain" // Ensure Tailwind object-contain if needed
            />
        </Box>
        {/* Use Box for responsive width control */}
        <Box w={{ base: '75%', sm: '83.33%', lg: '91.66%' }}>
            {/* Use Mantine Text with truncate or Tailwind overflow-hidden */}
            <Text size="xl" fw={700} className="overflow-hidden" truncate> {/* Adjusted size mapping */}
                {notification?.title}
            </Text>
            <Text size="lg" fw={700} className="overflow-hidden" truncate> {/* Adjusted size mapping */}
                {notification?.description}
            </Text>
        </Box>
        <Text c="gray.8" fw={600} className="absolute top-2 right-6 text-sm"> {/* Adjusted size mapping */}
            {notification?.timestamp}
        </Text>
    </Paper>
);


const NotificationPage = () => {
    const [unreadVisible, setUnreadVisible] = useState(true);
    // In a real app, you'd likely fetch notifications here using useEffect
    const [unreadNotifications, setUnreadNotifications] = useState(unreadNotificationsData);
    const [readNotifications, setReadNotifications] = useState(readNotificationsData);

    const handleMarkAllRead = () => {
        // In a real app, you'd also make an API call here
        // to mark notifications as read on the server.
        // Then, you might move items from unread to read state.
        // For this example, we just hide the section.
        setUnreadVisible(false);
        // Example: Move items (optional, depends on UX)
        // setReadNotifications(prev => [...unreadNotifications, ...prev]);
        // setUnreadNotifications([]);
    };

    const handleLoadMore = () => {
        // Placeholder for loading more read notifications
        console.log("Load more notifications...");
        // Example: Append more sample data
        setReadNotifications(prev => [...prev, { ...sampleNotification, id: Math.random() }, { ...sampleNotification, id: Math.random() }]);
    };


    return (
        <div> {/* Outer wrapper */}
            {/* Title */}
            <Box className="my-12">
                <Title order={1} align="center" className="text-5xl font-bold"> {/* Combine Mantine/Tailwind */}
                    Thông báo
                </Title>
            </Box>

            {/* Main Content Container */}
            {/* Mantine Container handles max-width and centering */}
            {/* Use className for Tailwind specifics like w-11/12 if Container props aren't enough */}
            <Container size="lg" className="w-11/12 mt-4 min-h-screen pt-12"> {/* Adjusted size */}
                <Stack gap="xl"> {/* Use Stack for vertical spacing */}

                    {/* ----------------------------- Chưa đọc Section --------------------- */}
                    {unreadVisible && unreadNotifications.length > 0 && (
                        <Box id="chua_doc" className="w-full">
                            <Group justify="space-between" mb="md">
                                <Title order={3} className="text-2xl font-bold">Chưa đọc</Title> {/* Adjusted Title order */}
                                <Button
                                    onClick={handleMarkAllRead}
                                    variant="default" // White background
                                    radius="xl"
                                    leftSection={<Image src="/assets/images/dau_tich.png" alt="" className="w-6 h-4" />} // Replace with actual path
                                    className="text-gray-500 font-bold pr-16 pl-6 py-2" // Specific padding/styles
                                >
                                    Đánh dấu tất cả đã đọc
                                </Button>
                            </Group>
                            <Stack gap="md">
                                {unreadNotifications.map((notification) => (
                                    <NotificationItem key={notification.id} notification={notification} />
                                ))}
                            </Stack>
                        </Box>
                    )}

                    {/* ----------------------------- Đã đọc Section --------------------- */}
                    <Box className="w-full">
                       <Group justify="space-between" mb="md">
                           <Title order={3} className="text-2xl font-bold mt-4">Đã đọc</Title> {/* Adjusted Title order */}
                           {/* Optional: Add filter/sort options here */}
                       </Group>
                       <Stack gap="md" className="mb-12 md:mb-16 lg:mb-20">
                           {readNotifications.map((notification) => (
                               <NotificationItem key={notification.id} notification={notification} />
                           ))}
                       </Stack>
                    </Box>

                     {/* ----------------------------- Load More Button --------------------- */}
                     {readNotifications.length > 0 && ( // Only show if there are read items
                         <Center className="w-full mb-12">
                             <Button
                                 onClick={handleLoadMore}
                                 color="yellow" // Mantine yellow color
                                 radius="xl"
                                 size="lg" // Adjust size as needed
                                 className="text-white font-bold text-2xl" // Ensure text color and size if needed
                             >
                                 Xem thêm
                             </Button>
                         </Center>
                     )}

                </Stack>
            </Container>
        </div>
    );
}

export default NotificationPage;