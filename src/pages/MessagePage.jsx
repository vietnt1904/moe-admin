import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Box,
  Flex,
  TextInput,
  ScrollArea,
  Avatar,
  Indicator,
  Text,
  Textarea,
  Button,
  ActionIcon,
  FileButton,
  Group, // Useful for grouping inline elements like icons/buttons
  useMantineTheme, // To access theme colors if needed
} from "@mantine/core";
import {
  IconSearch,
  IconSend,
  IconPaperclip, // Generic attachment
  IconFile, // Document
  IconLink, // Link/URL (using link icon instead of dinh_kem)
  IconGift, // Gift
  IconThumbUp,
  IconHeart,
  IconMoodAngry,
  IconPinned,
  IconTrash,
  IconArrowBackUp, // Reply/Recall
  IconDotsVertical, // Could use for more actions menu
} from "@tabler/icons-react";

// --- Sample Data (Replace with your actual data fetching) ---

const initialChatListData = [
  {
    id: 1,
    name: "Nhật Thường",
    lastStatus: "Last seen yesterday",
    avatar: "/assets/images/anh_truyen_dai_dien.png",
    online: false,
  },
  {
    id: 2,
    name: "Bảo Nam",
    lastStatus: "Online",
    avatar: "/assets/images/anh_truyen_dai_dien.png",
    online: true,
  },
  {
    id: 3,
    name: "An Nguyễn",
    lastStatus: "Online",
    avatar: "/assets/images/anh_truyen_dai_dien.png",
    online: true,
  },
  {
    id: 4,
    name: "Minh Họa",
    lastStatus: "Last seen 2 hours ago",
    avatar: "/assets/images/anh_truyen_dai_dien.png",
    online: false,
  },
  // Add many more for scrolling...
  ...Array.from({ length: 20 }, (_, i) => ({
    id: 5 + i,
    name: `Người dùng ${i + 1}`,
    lastStatus: i % 3 === 0 ? "Online" : `Last seen ${i + 1} mins ago`,
    avatar: "/assets/images/anh_truyen_dai_dien.png",
    online: i % 3 === 0,
  })),
];

const initialMessagesData = {
  1: [
    // Messages for Nhật Thường (id: 1)
    {
      id: "m1",
      sender: "Nhật Thường",
      text: "Bạn đã xem chương mới truyện của tớ chưa? Siêu hay luôn ý, mong bạn ủng hộ tớ rồi có gì nhắn tớ cảm nghĩ của bạn nhé!",
      timestamp: "10:00 AM",
      isMe: false,
    },
    {
      id: "m2",
      sender: "Me",
      text: "Tớ sẽ xem sau khi đọc hết các chương trước nhé!",
      timestamp: "10:05 AM",
      isMe: true,
    },
    {
      id: "m3",
      sender: "Nhật Thường",
      text: "Okay bạn!",
      timestamp: "10:06 AM",
      isMe: false,
    },
    // Add more messages...
    ...Array.from({ length: 5 }, (_, i) => [
      {
        id: `m${4 + i * 2}`,
        sender: "Nhật Thường",
        text: `Tin nhắn ví dụ ${i + 1} từ họ. ${"Lorem ipsum ".repeat(5)}`,
        timestamp: `${11 + i}:00 AM`,
        isMe: false,
      },
      {
        id: `m${5 + i * 2}`,
        sender: "Me",
        text: `Tin nhắn trả lời ${i + 1}.`,
        timestamp: `${11 + i}:05 AM`,
        isMe: true,
      },
    ]).flat(),
  ],
  2: [
    // Messages for Bảo Nam (id: 2)
    {
      id: "b1",
      sender: "Bảo Nam",
      text: "Chào bạn!",
      timestamp: "Yesterday",
      isMe: false,
    },
    {
      id: "b2",
      sender: "Me",
      text: "Chào Bảo Nam!",
      timestamp: "Yesterday",
      isMe: true,
    },
  ],
  // Add messages for other chats...
};

// --- Helper Components ---

const ChatItem = ({ chat, selected, onClick }) => (
  <Flex
    align="center"
    className={`border-b-2 ${
      selected
        ? "border-blue-500 bg-gray-100 dark:bg-dark-6"
        : "border-white dark:border-dark-5"
    } py-2 px-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-6 transition-colors duration-150`}
    onClick={() => onClick(chat)}
  >
    <Box className="mr-4 relative flex-shrink-0">
      <Indicator
        inline
        size={12}
        offset={4}
        position="bottom-end"
        color="green"
        withBorder
        disabled={!chat?.online}
      >
        <Avatar
          src={chat?.avatar}
          alt={`${chat?.name}'s avatar`}
          radius="md"
          size="md"
        />{" "}
      </Indicator>
    </Box>
    <Box className="overflow-hidden">
      <Text size="md" fw={700} truncate>
        {chat?.name}
      </Text>{" "}
      <Text size="sm" truncate>
        {chat?.lastStatus}
      </Text>{" "}
    </Box>
  </Flex>
);

const MessageBubble = ({ message }) => {
  const theme = useMantineTheme();
  // Determine bubble styles based on isMe
  const bubbleClass = message?.isMe
    ? "bg-blue-500 text-white"
    : "bg-gray-200 dark:bg-dark-5 text-black dark:text-gray-100";
  const alignmentClass = message?.isMe ? "justify-end" : "justify-start";
  const actionsPosition = message?.isMe ? "right-4" : "left-4";

  // Basic Reaction/Action Buttons (can be made more interactive)
  const reactions = (
    <Group
      spacing="xs"
      className="bg-white dark:bg-dark-6 py-1 px-3 rounded-lg shadow"
    >
      {[IconHeart, IconThumbUp, IconMoodAngry].map((Icon, index) => (
        <ActionIcon key={index} size="sm" variant="subtle" color="gray">
          <Icon size={16} />
        </ActionIcon>
      ))}
    </Group>
  );

  const actions = message?.isMe ? (
    <Group spacing="xs">
      {reactions}
      <Button
        size="xs"
        variant="default"
        leftIcon={<IconArrowBackUp size={14} />}
      >
        Thu hồi
      </Button>
    </Group>
  ) : (
    <Group spacing="xs">
      <Button
        size="xs"
        variant="default"
        leftIcon={<IconArrowBackUp size={14} />}
      >
        Trả lời
      </Button>
      {reactions}
      <Button size="xs" variant="default" leftIcon={<IconPinned size={14} />}>
        Ghim
      </Button>
      <Button
        size="xs"
        variant="default"
        color="red"
        leftIcon={<IconTrash size={14} />}
      >
        Xóa
      </Button>
    </Group>
  );

  return (
    <Flex className={`w-full mb-12 ${alignmentClass}`}>
      <Box className={`w-3/4 p-3 rounded-lg relative shadow-md ${bubbleClass}`}>
        <Text size="md" className="font-semibold">
          {message?.text}
        </Text>
        <Text
          size="xs"
          color={message?.isMe ? "blue.1" : "dimmed"}
          align={message?.isMe ? "right" : "left"}
          mt={4}
        >
          {message?.timestamp}
        </Text>
        <Box className={`absolute flex -bottom-8 space-x-2 ${actionsPosition}`}>
          {actions}
        </Box>
      </Box>
    </Flex>
  );
};

// --- Main Page Component ---

const MessagePage = () => {
  const theme = useMantineTheme();
  const [chatList, setChatList] = useState(initialChatListData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState(
    initialChatListData[0] || null
  ); // Select the first chat initially
  const [messages, setMessages] = useState(
    selectedChat ? initialMessagesData[selectedChat.id] || [] : []
  );
  const [messageInput, setMessageInput] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]); // State for file button

  // Refs for scroll areas
  const chatListScrollRef = useRef(null);
  const messageListScrollRef = useRef(null);

  // Filter chat list based on search term
  const filteredChatList = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    if (!lowerCaseSearchTerm) {
      return chatList;
    }
    return chatList.filter((chat) =>
      chat.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [searchTerm, chatList]);

  // Update messages when selected chat changes
  useEffect(() => {
    if (selectedChat) {
      setMessages(initialMessagesData[selectedChat.id] || []);
      // Scroll to bottom when chat changes
      setTimeout(() => {
        if (messageListScrollRef.current) {
          messageListScrollRef.current.scrollTo({
            top: messageListScrollRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 0);
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  // Scroll message list to bottom when new messages arrive (simulation)
  useEffect(() => {
    if (messages.length > 0 && messageListScrollRef.current) {
      messageListScrollRef.current.scrollTo({
        top: messageListScrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() === "" && attachedFiles.length === 0) return;

    const newMessage = {
      id: `m${Date.now()}`, // Simple unique ID
      sender: "Me",
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMe: true,
      // You might want to include info about attachedFiles here
    };

    // Update the messages for the *currently selected* chat
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Also update the main data source (simulated)
    if (selectedChat) {
      initialMessagesData[selectedChat.id] = [
        ...(initialMessagesData[selectedChat.id] || []),
        newMessage,
      ];
    }

    setMessageInput("");
    setAttachedFiles([]); // Clear files after sending
  };

  const handleFileChange = (files, label) => {
    if (files && files.length > 0) {
      const fileNames = files.map((f) => f.name).join(", ");
      const currentMsg = messageInput.trim();
      const newMsg = `${currentMsg}${
        currentMsg ? "\n" : ""
      }${label}: ${fileNames}`;
      setMessageInput(newMsg);
      setAttachedFiles(files); // You might want to store the actual files
    }
  };

  return (
    // Use Flex for the main layout, control height to fill viewport minus header (assuming header exists outside this component)
    // Adding explicit height calculation is complex and often better handled by CSS or a layout component like AppShell if applicable.
    // Here, we use min-h-[calc(100vh-YOUR_NAV_HEIGHT)] assuming a nav height exists. Replace YOUR_NAV_HEIGHT.
    // Or use h-screen if this component *is* the entire screen.
    <Flex className="h-[calc(100vh-80px)] px-[5%]">
      <Box className="w-1/3 pl-4 md:pl-8 lg:pl-12 flex flex-col border-gray-200 dark:border-dark-4 dark:bg-dark-7 h-full">
        <Box className="py-3 font-bold text-3xl italic dark:text-blue-400 flex-shrink-0">
          Moe messager
        </Box>
        <Box className="pb-4 flex-shrink-0">
          <TextInput
            placeholder="Tìm kiếm người dùng..."
            icon={<IconSearch size={18} />}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            radius="md"
            className="w-full md:w-3/4" // Responsive width
          />
        </Box>
        <ScrollArea viewportRef={chatListScrollRef} className="flex-grow h-0">
          {filteredChatList.length > 0 ? (
            filteredChatList.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                selected={selectedChat?.id === chat.id}
                onClick={handleSelectChat}
              />
            ))
          ) : (
            <Text align="center" color="dimmed" p="md">
              Không tìm thấy kết quả.
            </Text>
          )}
        </ScrollArea>
      </Box>

      {selectedChat ? (
        <Flex
          direction="column"
          className="w-2/3 xl:w-3/4 h-full dark:bg-dark-8"
        >
          {/* Chat Header */}
          <Flex
            align="center"
            className="py-3 px-4 md:px-6 border-b-2 border-white dark:border-dark-4 flex-shrink-0 dark:bg-dark-7"
          >
            <Indicator
              inline
              size={12}
              offset={4}
              position="bottom-end"
              color="green"
              withBorder
              disabled={!selectedChat.online}
            >
              <Avatar
                src={selectedChat.avatar}
                alt={`${selectedChat.name}'s avatar`}
                radius="xl"
                size="lg"
                className="border-2 border-blue-500 p-0.5"
              />
            </Indicator>
            <Text size="xl" fw={600} ml="md">
              {selectedChat.name}
            </Text>
            {/* Add more actions like call, info etc. here if needed */}
          </Flex>

          {/* Message List */}
          {/* Use flex-grow and h-0 trick */}
          <ScrollArea
            viewportRef={messageListScrollRef}
            className="flex-grow h-0 px-4 md:px-16 pt-8 pb-4"
          >
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
          </ScrollArea>

          {/* Message Input Area */}
          <Box className="mx-4 md:mx-16 mb-8 pt-2 border-t rounded-lg bg-blue-400 border-gray-200 dark:border-dark-4 dark:bg-dark-7 flex-shrink-0">
            <form onSubmit={handleSendMessage}>
              <Group spacing="xs" mb="xs" className="pl-4">
                <FileButton
                  onChange={(files) => handleFileChange(files, "Tệp")}
                  accept="image/*,video/*,.pdf,.doc,.docx,.zip,.rar"
                  multiple
                >
                  {(props) => (
                    <ActionIcon variant="default" color="#E9E9E9" {...props}>
                      <IconPaperclip size={18} />
                    </ActionIcon>
                  )}
                </FileButton>
                <FileButton
                  onChange={(files) => handleFileChange(files, "Tài liệu")}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                  multiple
                >
                  {(props) => (
                    <ActionIcon variant="default" color="#E9E9E9" {...props}>
                      <IconFile size={18} />
                    </ActionIcon>
                  )}
                </FileButton>
                {/* Add other buttons similarly */}
                <ActionIcon variant="default" color="#E9E9E9">
                  <IconLink size={18} />
                </ActionIcon>
                <ActionIcon variant="default" color="#E9E9E9">
                  <IconGift size={18} />
                </ActionIcon>
              </Group>

              <Flex align="flex-end" gap="sm">
                <Textarea
                  placeholder="Nhập tin nhắn..."
                  value={messageInput}
                  onChange={(event) =>
                    setMessageInput(event.currentTarget.value)
                  }
                  minRows={2}
                  maxRows={4}
                  autosize // Automatically adjusts height
                  className="flex-grow"
                  rightSection={
                    <ActionIcon
                      type="submit"
                      color="blue"
                      variant="filled"
                      radius="xl"
                      size="lg"
                      mr="xs"
                      disabled={
                        messageInput.trim() === "" && attachedFiles.length === 0
                      }
                    >
                      <IconSend size={18} />
                    </ActionIcon>
                  }
                  rightSectionWidth={50}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
                {/* Separate Send Button (alternative/optional) */}
                {/* <ActionIcon type="submit" size="lg" color="blue" variant="filled">
                                    <IconSend size={18} />
                                </ActionIcon> */}
              </Flex>
            </form>
          </Box>
        </Flex>
      ) : (
        // Placeholder when no chat is selected
        <Flex
          justify="center"
          align="center"
          className="w-2/3 xl:w-3/4 h-full bg-gray-100 dark:bg-dark-8"
        >
          <Text color="dimmed" size="xl">
            Chọn một cuộc trò chuyện để bắt đầu
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default MessagePage;
