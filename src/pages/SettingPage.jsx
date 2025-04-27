import { useState } from "react";
import {
  Container,
  Grid,
  Stack,
  Button,
  Title,
  Text,
  Paper,
  Badge,
  Switch,
  Avatar,
  TextInput,
  PasswordInput,
  Group,
  Image, // Import Image from Mantine for QR code etc.
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react"; // Example icon
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

// --- Placeholder Data ---
// In a real app, fetch this data or get it from context/props
const mockUser = {
  name: "Nguyễn Van A", // Placeholder
  email: "nguyenvana@example.com", // Placeholder
  avatar:
    "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-phong-canh-66-1.jpg",
};

// --- Sub-Components for Content Sections ---

const NotificationSettings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  return (
    <>
      <div className=" shadow-[2px_2px_2px_2px_rgba(0,0,0,0.4)] rounded-[30px]">
        <Paper
          withBorder
          shadow="lg"
          p="xl"
          radius="xl"
          className="w-full bg-gray-100 font-bold text-left mb-8"
        >
          <Title order={3} className="my-1">
            Thông báo pop-up
          </Title>
          <Text size="sm" className="inline">
            Sử dụng công nghệ Web Push API để đẩy thông báo đến trình duyệt của
            bạn theo thời gian thực, kể cả khi bạn không truy cập
          </Text>
          <div className="my-3">
            {/* Use Mantine Badge */}
            <Badge color="blue" size="lg" radius="xl">
              Cho phép hiện thông báo
            </Badge>
          </div>
          <Text size="sm" c="red.5">
            {" "}
            {/* Use Mantine color prop */}
            Hiện tại bạn chưa cấp quyền nhận thông báo
          </Text>
        </Paper>
      </div>

      <div className=" shadow-[2px_2px_2px_2px_rgba(0,0,0,0.4)] rounded-[30px]">
        <Paper
          shadow="lg"
          p="xl"
          radius="xl"
          className="w-full bg-gray-100 font-bold text-left my-8"
        >
          <Group align="center" className="my-1">
            <Switch
              checked={notificationsEnabled}
              onChange={(event) =>
                setNotificationsEnabled(event.currentTarget.checked)
              }
              labelPosition="left"
              label={
                <Title order={3} component="span">
                  Bật và tắt nhận thông báo
                </Title>
              }
              size="md"
              color="rgba(95, 255, 46, 1)"
              styles={{
                track: {
                },
                thumb: {
                },
              }}
            />
          </Group>
          <Text size="sm" className="inline">
            Thiết đặt nhận hoặc ngừng nhận các thông báo đẩy từ Moe novel. Nếu
            bạn ngừng nhận thông báo đẩy, bạn vẫn có thể đọc thông báo ở mục
            thông báo của Moe novel
          </Text>
        </Paper>
      </div>
    </>
  );
};

const PersonalInfo = ({ onUpdateClick }) => {
  PersonalInfo.propTypes = {
    onUpdateClick: PropTypes.func.isRequired,
  };
  return (
    <div className=" shadow-[2px_2px_2px_2px_rgba(0,0,0,0.4)] rounded-[30px]">
      <Paper
        shadow="lg"
        p="xl"
        radius="xl"
        className="w-full bg-gray-100 font-bold text-left"
      >
        {/* Use Mantine Group for layout */}
        <Group align="center" className="mb-4">
          {/* Use Mantine Avatar */}
          <Avatar
            src={mockUser.avatar}
            size={96} // Corresponds to w-24 h-24
            alt="ảnh đại diện"
            className="border-4 border-black"
          />
          <Title order={2}>{mockUser.name}</Title>
        </Group>
        <Stack pl={60} spacing="xs">
          {" "}
          {/* Adjust padding to align text */}
          <Text size="xl">Email/Tài khoản: {mockUser.email}</Text>
          <Text size="xl">Mật khẩu: ********</Text>
          {/* Use Mantine Button */}
          <Button
            onClick={onUpdateClick} // Call the handler passed from parent
            variant="filled" // Or another variant like 'light'
            color="blue"
            radius="xl"
            className="mt-3 self-start font-bold px-4 py-1" // Adjust padding/margin
            size="md"
          >
            Thay đổi thông tin cá nhân
          </Button>
        </Stack>
      </Paper>
    </div>
  );
};

const PrivacyPolicy = () => {
  // Using pre for simplicity to preserve line breaks, or use multiple <Text> components
  return (
    <div className=" shadow-[2px_2px_2px_2px_rgba(0,0,0,0.4)] rounded-[30px]">
      <Paper
        shadow="lg"
        p="xl"
        radius="xl"
        className="w-full bg-gray-100 font-bold text-left mb-24"
      >
        <Text
          component="pre"
          className="whitespace-pre-wrap font-sans font-normal text-sm"
        >
          {" "}
          {/* Adjust font if needed */}
          {`Chúng tôi là ai
Địa chỉ website là: moenovel.com, website đọc truyện tranh online.
Thông tin cá nhân nào bị thu thập và tại sao thu thập

Bình luận
Khi khách truy cập để lại bình luận trên trang web, chúng tôi thu thập dữ liệu được hiển thị trong biểu mẫu bình luận và cũng là địa chỉ IP của người truy cập và chuỗi User Agent của người dùng trình duyệt để giúp phát hiện spam.
Một chuỗi ẩn danh được tạo từ địa chỉ email của bạn (còn được gọi là Hash) có thể được cung cấp cho dịch vụ Gravatar để xem bạn có đang sử dụng nó hay không. Chính sách bảo mật của dịch vụ Gravatar có tại đây. Sau khi chấp nhận bình luận của bạn, ảnh tiểu sử của bạn được hiển thị công khai trong ngữ cảnh bình luận của bạn.

Thông tin liên hệ
Chúng tôi không thu thập bất cứ thông tin liên hệ nào của bạn ngoại trừ tên và email dùng để bình luận.

Cookies
Trang chỉ sử dụng cookies để lưu thời hạn của quảng cáo để hiển thị số lượng nhất định, thời hạn chức năng sao lưu dữ liệu và xác thực người dùng.
Chúng tôi chủ yếu sử dụng Cookie và Local Storage để lưu tên và email trong bình luận, các chương truyện bạn đã xem, bấm thích, đánh giá truyện, các bình luận của bạn, danh sách truyện yêu thích và danh sách truyện theo dõi.

Nội dung nhúng từ website khác
Các bài viết trên trang web này có thể bao gồm nội dung được nhúng (ví dụ: video, hình ảnh, bài viết, v.v.). Nội dung được nhúng từ các trang web khác hoạt động theo cùng một cách chính xác như khi khách truy cập đã truy cập trang web khác.
Những website này có thể thu thập dữ liệu về bạn, sử dụng cookies, nhúng các trình theo dõi của bên thứ ba và giám sát tương tác của bạn với nội dung được nhúng đó, bao gồm theo dõi tương tác của bạn với nội dung được nhúng nếu bạn có tài khoản và đã đăng nhập vào trang web đó.

Phân tích
Chúng tôi sử dụng Google Analytics để phân tích lưu lượng truy cập.

Chúng tôi chia sẻ dữ liệu của bạn với ai
Chúng tôi không chia sẻ dữ liệu của bạn với bất kỳ ai.

Dữ liệu của bạn tồn tại bao lâu
Nếu bạn để lại bình luận, bình luận và siêu dữ liệu của nó sẽ được giữ lại vô thời hạn. Điều này là để chúng tôi có thể tự động nhận ra và chấp nhận bất kỳ bình luận nào thay vì giữ chúng trong khu vực đợi kiểm duyệt.
Đối với người dùng đăng ký trên trang web của chúng tôi (nếu có), chúng tôi cũng lưu trữ thông tin cá nhân mà họ cung cấp trong hồ sơ người dùng của họ. Tất cả người dùng có thể xem, chỉnh sửa hoặc xóa thông tin cá nhân của họ bất kỳ lúc nào (ngoại trừ họ không thể thay đổi tên người dùng của họ). Quản trị viên trang web cũng có thể xem và chỉnh sửa thông tin đó.

Các quyền nào của bạn với dữ liệu của mình
Nếu bạn có tài khoản trên trang web này hoặc đã để lại nhận xét, bạn có thể yêu cầu nhận tệp xuất dữ liệu cá nhân mà chúng tôi lưu giữ về bạn, bao gồm mọi dữ liệu bạn đã cung cấp cho chúng tôi. Bạn cũng có thể yêu cầu chúng tôi xóa mọi dữ liệu cá nhân mà chúng tôi lưu giữ về bạn. Điều này không bao gồm bất kỳ dữ liệu nào chúng tôi có nghĩa vụ giữ cho các mục đích hành chính, pháp lý hoặc bảo mật.

Các dữ liệu của bạn được gửi tới đâu
Các bình luận của khách (không phải là thành viên) có thể được kiểm tra thông qua dịch vụ tự động phát hiện spam.

Cách xoá dữ liệu của bạn:
Vào phần quản lý thông tin tài khoản -> xoá tài khoản.`}
        </Text>
      </Paper>
    </div>
  );
};

const PaymentMethods = () => {
  const qrCodeUrl =
    "https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-phong-canh-66-1.jpg"; // Placeholder QR
  const momoLogo = "/assets/images/momo.png"; // Placeholder path
  const paypalLogo = "/assets/images/paypal.png"; // Placeholder path
  const zaloPayLogo = "/assets/images/zalopay.png"; // Placeholder path

  return (
    <div className=" shadow-[2px_2px_2px_2px_rgba(0,0,0,0.4)] rounded-[30px]">
      <Paper
        shadow="lg"
        p="xl"
        radius="xl"
        className="w-full bg-gray-100 font-bold text-left pb-12"
      >
        <Title order={2} className="">
          Liên kết tài khoản ngân hàng
        </Title>
        <Stack className="font-bold text-xl space-y-0 pt-2 pb-4">
          <Text fw={700} mb={-12}>Số tài khoản: 123456787654</Text>
          <Text fw={700} mb={-12}>Tên chủ tài khoản: Nguyễn Quang Minh</Text>
          <Text fw={700} mb={-12}>Ngân hàng: ngân hàng tiên phong</Text>
          <Text fw={700} mb={-12}>Chi nhánh: Hà nội</Text>
          <Text fw={700} mb={-12}>QR Code:</Text>
        </Stack>
        <Group position="center">
          <Image
            src={qrCodeUrl}
            alt="QR Code"
            w={196}
            h={196}
            fit="fill"
            className="mx-auto"
          />
        </Group>

        <Title order={3} className="mb-2 mt-6 pt-4 pb-8">
          Liên kết ví điện tử
        </Title>
        <Group position="center" spacing="lg" className="mb-4 pb-4 w-full">
          <div className="flex justify-center gap-6 mx-auto">

          <Button
            variant="unstyled"
            p={0}
            w={80}
            h={80}
            radius={"lg"}
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-xl"
            >
            <Image
              src={"https://brandlogos.net/wp-content/uploads/2023/09/momo-logo_brandlogos.net_mtkvq.png"}
              alt="MOMO"
              w={80}
              h={80}
              radius="md"
              fit="fill"
              />
          </Button>
          <Button
            variant="unstyled"
            p={0}
            w={80}
            h={80}
            radius={"lg"}
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-xl"
            >
            <Image
              src={"https://brandlogos.net/wp-content/uploads/2023/09/momo-logo_brandlogos.net_mtkvq.png"}
              alt="PAYPAL"
              w={80}
              h={80}
              radius="md"
              />
          </Button>
          <Button
            variant="unstyled"
            p={0}
            w={80}
            h={80}
            radius={"lg"}
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-xl"
            >
            <Image
              src={"https://brandlogos.net/wp-content/uploads/2023/09/momo-logo_brandlogos.net_mtkvq.png"}
              alt="ZALOPAY"
              w={80}
              h={80}
              radius="md"
              />
          </Button>
              </div>
        </Group>
      </Paper>
    </div>
  );
};

const UpdateInfoForm = ({onUpdateClick}) => {
  UpdateInfoForm.propTypes = {setActiveSection: PropTypes.func.isRequired,};
  const [formData, setFormData] = useState({
    email: "",
    yearOfBirth: "",
    gender: "",
    facebook: "",
    tiktok: "",
    blog: "",
    nowPassword: "",
    newPassword: "",
    renewPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data submitted:", formData);
    // Add actual submission logic here (e.g., API call)
  };

  // You would also need state and logic for handling avatar upload
  const handleAvatarChangeClick = () => {
    console.log("Change avatar clicked");
    // Trigger file input click here
  };

  return (
    <div className=" shadow-[2px_2px_2px_2px_rgba(0,0,0,0.4)] rounded-[30px]">
      <Paper
        component="form"
        onSubmit={handleSubmit}
        shadow="lg"
        radius="xl"
        className="w-full bg-gray-100 font-bold text-left"
      >
        <div className="pr-4 pl-16 pt-4">
          <Group align="center" className="mb-4">
            <div className="relative mr-6">
              <Avatar
                src={mockUser.avatar}
                size={96}
                alt="ảnh đại diện"
                className="border-4 border-black"
              />
              <button
                onClick={handleAvatarChangeClick}
                color="gray"
                className="absolute bottom-0 right-0 rounded-full w-10 h-10 flex items-center justify-center" // Positioning and styling
                aria-label="Change Avatar"
              >
                <IconCamera className="bg-white rounded" size={24} />
              </button>
            </div>
            <Title order={2}>{mockUser.name}</Title>
          </Group>
          <div className="w-full pl-12 pr-6">
            <Stack spacing="md">
              <TextInput
                label="Đổi email/tài khoản:"
                name="email"
                value={formData.email}
                onChange={handleChange}
                styles={{
                  input: { borderColor: "#4B5563", borderWidth: "2px" },
                }} // border-gray-700 border-2
              />
              <TextInput
                label="Năm sinh:"
                name="yearOfBirth"
                value={formData.yearOfBirth}
                onChange={handleChange}
                styles={{
                  input: { borderColor: "#4B5563", borderWidth: "2px" },
                }}
              />
              <TextInput
                label="Giới tính:"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                styles={{
                  input: { borderColor: "#4B5563", borderWidth: "2px" },
                }}
              />
              <TextInput
                label="Link Facebook:"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                styles={{
                  input: { borderColor: "#4B5563", borderWidth: "2px" },
                }}
              />
              <TextInput
                label="Link Tiktok:"
                name="tiktok"
                value={formData.tiktok}
                onChange={handleChange}
                styles={{
                  input: { borderColor: "#4B5563", borderWidth: "2px" },
                }}
              />
              <TextInput
                label="Link Blog:"
                name="blog"
                value={formData.blog}
                onChange={handleChange}
                styles={{
                  input: { borderColor: "#4B5563", borderWidth: "2px" },
                }}
              />
              <PasswordInput
                label="Mật khẩu hiện tại:"
                name="nowPassword"
                onChange={handleChange}
                styles={{
                  input: { borderColor: "#4B5563", borderWidth: "2px" },
                }}
              />
              <PasswordInput
                label="Mật khẩu mới:"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                styles={{
                  input: { borderColor: "#4B5563", borderWidth: "2px" },
                }}
              />
              <PasswordInput
                label="Xác nhận mật khẩu mới:"
                name="renewPassword"
                value={formData.renewPassword}
                onChange={handleChange}
                styles={{
                  input: { borderColor: "#4B5563", borderWidth: "2px" },
                }}
              />
            </Stack>
          </div>
        </div>
        {/* Submit Button */}
        <Group position="center" className="my-12 pb-8" justify="center">
        <Button
            onClick={onUpdateClick}
            size="lg"
            color="blue"
            radius="lg"
            className="font-bold px-8"
          >
            Quay lại
          </Button>
          <Button
            type="submit"
            size="lg"
            color="blue"
            radius="lg"
            className="font-bold px-8"
          >
            Cập nhật
          </Button>
        </Group>
      </Paper>
    </div>
  );
};

// --- Main Settings Page Component ---

const SettingPage = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  // State to track the active section
  const [activeSection, setActiveSection] = useState(tab || "notifications"); // Default section
  console.log("Active section:", activeSection);
  console.log("Tab:", tab);

  const menuItems = [
    {
      id: "notifications",
      label: "Thông báo",
      component: <NotificationSettings />,
    },
    {
      id: "personalInfo",
      label: "Thông tin cá nhân",
      component: (
        <PersonalInfo onUpdateClick={() => setActiveSection("updateInfo")} />
      ),
    }, // Pass handler
    {
      id: "privacy",
      label: "Chính sách bảo mật",
      component: <PrivacyPolicy />,
    },
    {
      id: "payment",
      label: "Phương thức thanh toán",
      component: <PaymentMethods />,
    },
    // Note: updateInfo is not a primary menu item, it's shown via interaction
  ];

  const renderActiveComponent = () => {
    if (activeSection === "updateInfo") {
      return <UpdateInfoForm onUpdateClick={() => setActiveSection("personalInfo")} />;
    }
    const activeItem = menuItems.find((item) => item.id === activeSection);
    return activeItem ? activeItem.component : null; // Render the component based on state
  };

  return (
    <Container size="xl" px={0} className="w-3/4 py-20 mb-16">
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack className="font-bold">
            <Title order={1} className="my-4 text-4xl">
              Cài đặt chung
            </Title>
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id || (item.id === "personalInfo" && activeSection === "updateInfo") ? "default" : "subtle"}
                color={activeSection === item.id || (item.id === "personalInfo" && activeSection === "updateInfo") ? "white" : "black"}
                onClick={() => setActiveSection(item.id)}
                justify="flex-start"
                className={`px-2 py-2 flex rounded-xl text-2xl w-full text-black font-extrabold h-auto 
                    ${
                      activeSection === item.id
                        ? "shadow-[2px_2px_2px_2px_rgba(0,0,0,0.4)]"
                        : ""
                    }`}
                size="xl"
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <div className="pt-8 md:pt-16 lg:pt-24 pr-0 md:pr-4 lg:pr-8">
            {renderActiveComponent()}
          </div>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default SettingPage;
