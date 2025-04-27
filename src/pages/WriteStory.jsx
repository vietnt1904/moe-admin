import { useState, useEffect } from "react";
import {
  TextInput,
  Select,
  Radio,
  Checkbox,
  Button,
  Image,
  Text,
  Group,
  Grid,
  Textarea,
  FileButton,
  MultiSelect, // Keep MultiSelect import
} from "@mantine/core";
import { useForm } from "@mantine/form";
import StoryService from "../services/StoryService";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useTopic } from "../hooks/useTopic";
import { useGenre } from "../hooks/useGenre";

// --- Options (Keep these outside the component) ---
const theLoaiOptions = [
  { value: "hanh_dong", label: "Hành động" },
  { value: "phieu_luu", label: "Phiêu lưu" },
  { value: "tinh_cam", label: "Tình cảm" },
  { value: "hai_huoc", label: "Hài hước" },
  { value: "vien_tuong", label: "Khoa học viễn tưởng" },
  { value: "kinh_di", label: "Kinh dị" },
  { value: "trinh_tham", label: "Trinh thám" },
  { value: "ky_ao", label: "Kỳ ảo (Fantasy)" },
  { value: "kiem_hiep", label: "Kiếm hiệp" },
  { value: "tien_hiep", label: "Tiên hiệp" },
  { value: "huyen_huyen", label: "Huyền huyễn" },
  { value: "hoc_duong", label: "Học đường" },
  { value: "doi_thuong", label: "Đời thường" },
  { value: "lich_su", label: "Lịch sử" },
  { value: "trong_sinh", label: "Trọng sinh" },
  { value: "he_thong", label: "Hệ thống" },
  { value: "chinh_kich", label: "Chính kịch (Drama)" },
  { value: "dam_my", label: "Đam mỹ (Boy’s Love)" },
  { value: "bai_hoc_cuoc_song", label: "Bài học cuộc sống" },
];

const chuDeOptions = [
  { value: "tinh_yeu", label: "Tình yêu" },
  { value: "tinh_ban", label: "Tình bạn" },
  { value: "gia_dinh", label: "Gia đình" },
  { value: "truong_thanh", label: "Trưởng thành" },
  { value: "cong_ly", label: "Công lý" },
  { value: "tu_do", label: "Tự do" },
  { value: "su_hy_sinh", label: "Sự hy sinh" },
  { value: "su_song_va_cai_chet", label: "Sự sống và cái chết" },
  { value: "khat_vong", label: "Khát vọng" },
  { value: "niem_tin", label: "Niềm tin" },
  { value: "doi_khang_thien_ac", label: "Đối kháng Thiện – Ác" },
  { value: "tu_choi_so_phan", label: "Từ chối số phận" },
  { value: "chon_lua_dao_duc", label: "Chọn lựa đạo đức" },
  { value: "chua_lanh", label: "Chữa lành và tha thứ" },
];

const phanLoaiOptions = [
  { value: "original", label: "Truyện sáng tác" },
  { value: "translated", label: "Truyện dịch" },
];

const thoiGianDienRaOptions = [
  { value: "co_dai", label: "Cổ đại" },
  { value: "trung_dai", label: "Trung đại" },
  { value: "hien_dai", label: "Hiện đại" },
  { value: "tuong_lai", label: "Tương lai" },
  { value: "khong_xac_dinh", label: "Không xác định" },
];

const ketTruyenOptions = [
  { value: "HE", label: "HE" },
  { value: "BE", label: "BE" },
  { value: "OE", label: "OE" },
  { value: "SE", label: "SE" },
];

const WriteStory = () => {
  // --- Constants ---
  const MAX_WORDS = 3000;
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  // --- UI State ---
  const [wordCount, setWordCount] = useState(0);
  const [coverImagePreview, setCoverImagePreview] = useState(
    "/images/anh_bia_mac_dinh.png" // Default image
  );

  const { data: topics } = useTopic();
  const { data: genres } = useGenre();

  const topicOptions =
    topics?.map((topic) => ({
      value: topic?.id.toString(),
      label: topic?.name,
    })) || [];
  const genreOptions =
    genres?.map((genre) => ({
      value: genre?.id.toString(),
      label: genre?.name,
    })) || [];

  console.log(topicOptions);
  console.log(genreOptions);

  // --- Form Management with useForm ---
  const form = useForm({
    initialValues: {
      title: "",
      authorId: user ? JSON.parse(user).id : 1,
      authorName: "",
      description: "",
      ten_chuong: "",
      type: "original",
      timeline: "hien_dai",
      // --- Updated initial values for MultiSelect ---
      genre: [], // Initialize as empty array for MultiSelect
      topic: [], // Initialize as empty array for MultiSelect
      // --- End Update ---
      ending: "HE",
      is18Plus: false,
      releaseSchedule: [],
      noi_dung: "",
      image: null,
    },

    validate: {
      title: (value) =>
        value.trim().length > 0 ? null : "Tên tác phẩm không được để trống",
      authorName: (value) =>
        value.trim().length > 0 ? null : "Tác giả không được để trống",
      description: (value) =>
        value.trim().length > 0 ? null : "Giới thiệu không được để trống",
      ten_chuong: (value) =>
        value.trim().length > 0 ? null : "Tên chương không được để trống",
      noi_dung: (value) =>
        value.trim().length > 0 ? null : "Nội dung không được để trống",
      image: (value) => (value ? null : "Ảnh bìa là bắt buộc"),
      releaseSchedule: (value) =>
        value.length > 0 ? null : "Vui lòng chọn lịch ra chương",
      // --- Added validation for MultiSelect (assuming they are required) ---
      genre: (value) =>
        value.length > 0 ? null : "Vui lòng chọn ít nhất một thể loại",
      topic: (value) =>
        value.length > 0 ? null : "Vui lòng chọn ít nhất một chủ đề",
      // --- End Update ---
    },
  });

  // --- Effects ---

  // Effect for Image Preview
  useEffect(() => {
    const file = form.values.image;
    if (!file) {
      setCoverImagePreview("/images/anh_bia_mac_dinh.png");
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setCoverImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [form.values.image]);

  // Effect for Word Count
  useEffect(() => {
    const words = form.values.noi_dung
      .trim()
      .split(/\s+/)
      .filter((word) => word !== "");
    setWordCount(words.length);
  }, [form.values.noi_dung]);

  // --- Handlers ---

  // Custom handler for Checkbox.Group
  const handleScheduleChange = (newSchedule) => {
    const isSelectingKhongCoDinh =
      newSchedule.includes("khong_co_dinh") &&
      !form.values.releaseSchedule.includes("khong_co_dinh");
    const isSelectingOtherDayWhileKhongCoDinhChecked =
      newSchedule.length > form.values.releaseSchedule.length &&
      !isSelectingKhongCoDinh &&
      form.values.releaseSchedule.includes("khong_co_dinh");

    if (isSelectingKhongCoDinh) {
      form.setFieldValue("releaseSchedule", ["khong_co_dinh"]);
    } else if (isSelectingOtherDayWhileKhongCoDinhChecked) {
      form.setFieldValue(
        "releaseSchedule",
        newSchedule.filter((day) => day !== "khong_co_dinh")
      );
    } else {
      form.setFieldValue("releaseSchedule", newSchedule);
    }
  };

  // Custom handler for Textarea word count limit
  const handleContentChangeWithLimit = (event) => {
    const text = event.currentTarget.value;
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word !== "");

    if (words.length <= MAX_WORDS) {
      form.setFieldValue("noi_dung", text);
    } else {
      const trimmedText = words.slice(0, MAX_WORDS).join(" ");
      form.setFieldValue("noi_dung", trimmedText);
      setWordCount(MAX_WORDS);
    }
  };

  // Submission Handler
  const handleFormSubmit = async (values, action) => {
    console.log("Form Submitted!");
    console.log("Action:", action);
    console.log("Form Data:", values); // values now contains arrays for genre and topic

    const dataToSend = new FormData();

    Object.keys(values).forEach((key) => {
      if (key === "image" && values[key]) {
        dataToSend.append(key, values[key], values[key].name);
      }
      // --- Updated logic to handle genre, topic, and releaseSchedule arrays ---
      else if (
        (key === "releaseSchedule" || key === "genre" || key === "topic") &&
        Array.isArray(values[key])
      ) {
        if (key === "genre" || key === "topic") {
          values[key].forEach((item) =>
            dataToSend.append(key + "[]", Number(item))
          );
        } else {
          values[key].forEach((item) => dataToSend.append(key + "[]", item));
        }
      }
      // --- End Update ---
      else if (values[key] !== null && values[key] !== undefined) {
        dataToSend.append(key, values[key]);
      }
    });
    dataToSend.append("action", action);

    console.log("FormData to send (inspect in browser console):");
    for (let pair of dataToSend.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    await StoryService.writeStory(dataToSend)
      .then(() => {
        navigate("/");
        notifications.show({
          title: "Thêm truyen thanh cong",
          message: "Truyen cua ban da duoc them thanh cong",
          color: "teal",
        });
      })
      .catch((error) => {
        notifications.show({
          title: "Them truyen that bai",
          message: "Vui long thu lai",
          color: "red",
        });
        console.log("Error:", error);
      });
    // Example fetch call (uncomment and adapt)
    /*
    const apiEndpoint = '/api/your-endpoint';
    fetch(apiEndpoint, {
        method: 'POST',
        // headers: { 'X-CSRF-TOKEN': 'your_token', ... },
        body: dataToSend,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        // form.reset(); // Optionally reset form
    })
    .catch((error) => {
        console.error('Error:', error);
        // form.setErrors({ apiError: 'Failed to submit story. Please try again.' });
    });
    */
  };

  // --- Render ---
  return (
    <div className="flex justify-center w-full px-[12.5%] mx-auto gap-4 min-h-screen pt-12 bg-[linear-gradient(90deg,_#037770_3.43%,_#FFC7C7_86.18%)]">
      <div className="w-full lg:w-3/4 md:mr-28 lg:mr-48 mx-auto">
        <div className="pt-4 pb-8 mb-24 rounded-xl w-full font-bold text-left">
          <div className="pb-6">
            <p className="text-5xl font-bold">Viết tác phẩm mới</p>
            <p className="text-xl font-bold">
              Hãy lưu ý về quy tắc soạn thảo văn bản tại đấy
            </p>
          </div>

          <form>
            <TextInput
              size="lg"
              label="Tên tác phẩm:"
              className="my-2"
              classNames={{
                label: "text-xl font-bold text-white",
                input:
                  "h-10 pl-2 pr-8 rounded-lg border-solid border-gray-700 border-2 text-black bg-gray-200",
              }}
              required
              {...form.getInputProps("title")}
            />
            <TextInput
              size="lg"
              label="Tác giả/đồng tác giả:"
              className="my-2"
              classNames={{
                label: "text-xl font-bold text-white",
                input:
                  "h-10 pl-2 pr-8 rounded-lg border-solid border-gray-700 border-2 text-black bg-gray-200",
              }}
              required
              {...form.getInputProps("authorName")}
            />
            <TextInput // Consider Textarea if needed
              size="lg"
              label="Giới thiệu:"
              className="my-2"
              classNames={{
                label: "text-xl font-bold text-white",
                input:
                  "h-10 pl-2 pr-8 rounded-lg border-solid border-gray-700 border-2 text-black bg-gray-200", // Adjust height if Textarea
              }}
              required
              {...form.getInputProps("description")}
            />
            <TextInput
              size="lg"
              label="Tên chương:"
              className="my-2"
              classNames={{
                label: "text-xl font-bold text-white",
                input:
                  "h-10 pl-2 pr-8 rounded-lg border-solid border-gray-700 border-2 text-black bg-gray-200",
              }}
              required
              {...form.getInputProps("ten_chuong")}
            />

            {/* --- Categorization --- */}
            <Radio.Group
              label="Phân loại:"
              size="lg"
              classNames={{ label: "text-xl font-bold text-white" }}
              required
              {...form.getInputProps("type")}
            >
              <Grid gutter="md" className="mt-1">
                {phanLoaiOptions?.map((opt) => (
                  <Grid.Col span={6} key={opt.value}>
                    <Radio
                      value={opt.value}
                      label={opt.label}
                      classNames={{
                        root: "w-full",
                        labelWrapper: "w-full",
                        label: `flex items-center justify-center h-12 px-4 rounded-lg border-2 border-gray-700 cursor-pointer ${
                          form.values.type === opt.value
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-gray-200 text-black hover:bg-gray-300"
                        }`,
                        inner: "hidden",
                      }}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            </Radio.Group>

            <Select
              label={"Thời gian diễn ra câu chuyện:"}
              size="lg"
              data={thoiGianDienRaOptions}
              className="my-2"
              classNames={{
                label: "text-xl font-bold text-white",
                input:
                  "w-full h-10 pl-2 pr-8 rounded-lg border-2 border-gray-700 bg-gray-200 font-bold text-black text-lg",
                dropdown: "bg-opacity-50 backdrop-blur-sm",
                item: "text-lg font-bold text-black text-center hover:bg-gray-300",
              }}
              withScrollArea={false}
              styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
              allowDeselect={false}
              required
              {...form.getInputProps("timeline")}
            />

            {/* --- MultiSelect for Genre --- */}
            <MultiSelect
              label={"Thể loại:"}
              size="lg"
              data={genreOptions}
              placeholder="Chọn thể loại (có thể chọn nhiều)"
              className="my-2"
              classNames={{
                label: "text-xl font-bold text-white",
                // Input might need height adjustment for multiple selections
                input:
                  "min-h-10 w-full pl-2 pr-8 rounded-lg border-2 border-gray-700 bg-gray-200 font-bold text-black text-lg flex flex-wrap items-center",
                dropdown: "bg-opacity-50 backdrop-blur-sm",
                item: "text-lg font-bold text-black text-center hover:bg-gray-300", // Check item styling
                // Add styles for selected value pills if needed
                pill: "bg-blue-500 text-white",
              }}
              // searchable
              clearable // Allow clearing all selections
              withScrollArea={false}
              styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
              // allowDeselect is implicit in MultiSelect
              required
              {...form.getInputProps("genre")} // Bind to form state (expects/provides array)
            />
            <MultiSelect
              label={"Chủ đề:"}
              size="lg"
              data={topicOptions}
              placeholder="Chọn chủ đề (có thể chọn nhiều)"
              className="my-2"
              classNames={{
                label: "text-xl font-bold text-white",
                input:
                  "min-h-10 w-full pl-2 pr-8 rounded-lg border-2 border-gray-700 bg-gray-200 font-bold text-black text-lg flex flex-wrap items-center",
                dropdown: "bg-opacity-50 backdrop-blur-sm",
                item: "text-lg font-bold text-black text-center hover:bg-gray-300",
                pill: "bg-blue-500 text-white",
              }}
              // searchable
              clearable
              withScrollArea={false}
              styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
              required
              {...form.getInputProps("topic")} // Bind to form state (expects/provides array)
            />

            <Select
              label={"Kết truyện:"}
              size="lg"
              data={ketTruyenOptions}
              className="my-2"
              classNames={{
                label: "text-xl font-bold text-white",
                input:
                  "w-full h-10 pl-2 pr-8 rounded-lg border-2 border-gray-700 bg-gray-200 font-bold text-black text-lg",
                dropdown: "bg-opacity-50 backdrop-blur-sm",
                item: "text-lg font-bold text-black text-center hover:bg-gray-300",
              }}
              required
              withScrollArea={false}
              styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
              allowDeselect={false}
              {...form.getInputProps("ending")}
            />

            <Radio.Group
              label={"Truyện có yếu tố 18+ không?"}
              size="lg"
              className="my-2"
              classNames={{ label: "text-xl font-bold text-white" }}
              required
              {...form.getInputProps("is18Plus")}
            >
              <Grid gutter="md" className="mt-1">
                <Grid.Col span={6}>
                  <Radio
                    value={true}
                    label="Có"
                    classNames={{
                      root: "w-full",
                      labelWrapper: "w-full",
                      label: `flex items-center justify-center h-12 px-4 rounded-lg border-2 border-gray-700 cursor-pointer ${
                        form.values.is18Plus === true
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-200 text-black hover:bg-gray-300"
                      }`,
                      inner: "hidden",
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Radio
                    value={false}
                    label="Không"
                    classNames={{
                      root: "w-full",
                      labelWrapper: "w-full",
                      label: `flex items-center justify-center h-12 px-4 rounded-lg border-2 border-gray-700 cursor-pointer ${
                        form.values.is18Plus === false
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-200 text-black hover:bg-gray-300"
                      }`,
                      inner: "hidden",
                    }}
                  />
                </Grid.Col>
              </Grid>
            </Radio.Group>

            {/* --- Schedule --- */}
            <Checkbox.Group
              value={form.values.releaseSchedule}
              onChange={handleScheduleChange}
              label={"Lịch ra chương:"}
              size="lg"
              className="my-2"
              classNames={{ label: "mb-1 text-xl font-bold text-white" }}
              required
              error={form.errors.releaseSchedule}
            >
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 md:gap-4 lg:gap-6">
                {[
                  { label: "Thứ 2", value: "thu_2" },
                  { label: "Thứ 3", value: "thu_3" },
                  { label: "Thứ 4", value: "thu_4" },
                  { label: "Thứ 5", value: "thu_5" },
                  { label: "Thứ 6", value: "thu_6" },
                  { label: "Thứ 7", value: "thu_7" },
                  { label: "Chủ nhật", value: "chu_nhat" },
                ].map((day) => (
                  <Checkbox
                    key={day.value}
                    value={day.value}
                    label={day.label}
                    classNames={{
                      inner: "hidden",
                      root: "w-full",
                      labelWrapper: "w-full",
                      label: `flex items-center justify-center h-12 px-4 rounded-lg border-2 border-gray-700 cursor-pointer ${
                        form.values.releaseSchedule.includes(day.value)
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-200 text-black hover:bg-gray-300"
                      }`,
                    }}
                  />
                ))}
              </div>
              <div className="mt-2 w-full">
                <Checkbox
                  value="khong_co_dinh"
                  label="Không cố định"
                  classNames={{
                    inner: "hidden",
                    root: "w-full sm:w-1/2 md:w-1/3 lg:w-1/4", // Adjust width as needed
                    labelWrapper: "w-full",
                    label: `flex items-center justify-center h-12 px-4 rounded-lg border-2 border-gray-700 cursor-pointer ${
                      form.values.releaseSchedule.includes("khong_co_dinh")
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-gray-200 text-black hover:bg-gray-300"
                    }`,
                  }}
                />
              </div>
            </Checkbox.Group>

            {/* --- Content --- */}
            <Textarea
              label={"Nội dung:"}
              size="lg"
              placeholder="Nội dung"
              minRows={6}
              maxRows={10}
              autosize
              className="my-2"
              classNames={{
                label: "text-xl font-bold text-white",
                input:
                  "w-full pl-2 py-2 pr-8 rounded-lg border-solid border-gray-700 border-2 text-black font-bold text-lg bg-gray-200",
              }}
              required
              value={form.values.noi_dung}
              onChange={handleContentChangeWithLimit}
              error={form.errors.noi_dung}
            />
            <Text align="right" size="lg" className="text-gray-400">
              {wordCount}/{MAX_WORDS}
            </Text>

            {/* --- Cover Image --- */}
            <div className="my-2">
              <p className="text-lg font-semibold text-white mb-1">
                Ảnh bìa: <span className="text-red-500">*</span>
                {form.errors.image && (
                  <span className="text-sm text-red-400 ml-2">
                    ({form.errors.image})
                  </span>
                )}
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Image
                  src={coverImagePreview}
                  alt="anh_bia preview"
                  height="auto"
                  radius="md"
                  className="w-full h-auto rounded-xl max-w-[200px] sm:max-w-[250px] object-cover aspect-[3/4]"
                />
                <div className="flex flex-col gap-2 items-start">
                  <FileButton
                    onChange={(file) => form.setFieldValue("image", file)}
                    accept="image/png,image/jpeg,image/webp"
                  >
                    {(props) => (
                      <Button
                        {...props}
                        color="blue"
                        size="lg"
                        className="text-white font-bold text-xl"
                      >
                        Chọn ảnh
                      </Button>
                    )}
                  </FileButton>
                  {form.values.image && (
                    <Text size="sm" className="text-gray-200" mt={4}>
                      {form.values.image.name}
                    </Text>
                  )}
                  {form.values.image && (
                    <Button
                      variant="outline"
                      color="red"
                      size="sm"
                      onClick={() => form.setFieldValue("image", null)}
                    >
                      Xóa ảnh
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* --- Action Buttons --- */}
            <Group position="center" className="pt-4">
              <Button
                type="button"
                onClick={() => {
                  const validationResult = form.validate();
                  if (!validationResult.hasErrors) {
                    handleFormSubmit(form.values, "khoa_chuong");
                  } else {
                    console.log("Validation Errors:", validationResult.errors);
                    // Optionally focus the first invalid field
                    // form.validate(); // Re-run to display errors if not already shown
                  }
                }}
                className="text-white text-xl font-bold px-6 py-2 mx-2 w-full sm:w-auto rounded bg-blue-500 hover:bg-blue-600"
                size="xl"
              >
                Cài đặt khóa chương
              </Button>
              <Button
                type="button"
                onClick={() => {
                  const validationResult = form.validate();
                  if (!validationResult.hasErrors) {
                    handleFormSubmit(form.values, "luu_chuong");
                  } else {
                    console.log("Validation Errors:", validationResult.errors);
                    // form.validate(); // Re-run to display errors
                  }
                }}
                className="text-white text-xl font-bold px-6 py-2 mx-2 w-full sm:w-auto rounded bg-blue-500 hover:bg-blue-600"
                size="xl"
              >
                Lưu chương
              </Button>
            </Group>
            {form.errors.apiError && (
              <Text c="red" size="sm" align="center" mt="md">
                {form.errors.apiError}
              </Text>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default WriteStory;
