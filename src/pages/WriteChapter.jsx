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
} from "@mantine/core";
import { useForm } from "@mantine/form"; // Import useForm

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
  { value: "truyen_sang_tac", label: "Truyện sáng tác" },
  { value: "truyen_dich", label: "Truyện dịch" },
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


const WriteChapter = () => {
  // --- Constants ---
  const MAX_WORDS = 3000;

  // --- UI State (Not part of the form data itself) ---
  const [wordCount, setWordCount] = useState(0);
  const [coverImagePreview, setCoverImagePreview] = useState(
    "/images/anh_bia_mac_dinh.png" // Default image
  );

  // --- Form Management with useForm ---
  const form = useForm({
    initialValues: {
      // Match field names (can be snake_case or camelCase, consistent is key)
      title: "",
      tac_gia: "",
      gioi_thieu: "",
      ten_chuong: "",
      story_type: "truyen_sang_tac", // Default value
      thoi_gian_dien_ra: "hien_dai", // Default value
      genre: theLoaiOptions[0]?.value || "", // Default value
      topic: chuDeOptions[0]?.value || "", // Default value
      ket_truyen: "HE", // Default value
      yeu_to_18: "khong", // Default value
      lich_ra_chuong: [], // Default value (empty array)
      noi_dung: "",
      anh_bia: null, // For the File object
    },

    // Optional: Add validation rules here
    validate: {
      title: (value) => value.trim().length > 0 ? null : "Tên tác phẩm không được để trống",
      tac_gia: (value) => value.trim().length > 0 ? null : "Tác giả không được để trống",
      gioi_thieu: (value) => value.trim().length > 0 ? null : "Giới thiệu không được để trống",
      ten_chuong: (value) => value.trim().length > 0 ? null : "Tên chương không được để trống",
      noi_dung: (value) => value.trim().length > 0 ? null : "Nội dung không được để trống",
      anh_bia: (value) => value ? null : "Ảnh bìa là bắt buộc",
      lich_ra_chuong: (value) => value.length > 0 ? null : "Vui lòng chọn lịch ra chương",
      // Add other validations as needed
    },
  });

  // --- Effects ---

  // Effect for Image Preview (watches the form value)
  useEffect(() => {
    const file = form.values.anh_bia; // Get file from form values
    if (!file) {
       // Reset to default when file is removed (or keep previous preview if desired)
       setCoverImagePreview('/images/anh_bia_mac_dinh.png');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setCoverImagePreview(objectUrl);

    // Cleanup function to revoke the object URL
    return () => URL.revokeObjectURL(objectUrl);
  }, [form.values.anh_bia]); // Depend on the form field value

  // Effect for Word Count (watches the form value)
  useEffect(() => {
    const words = form.values.noi_dung
      .trim()
      .split(/\s+/)
      .filter((word) => word !== "");
    setWordCount(words.length);
  }, [form.values.noi_dung]); // Depend on the form field value

  // --- Handlers ---

  // Custom handler for Checkbox.Group to enforce exclusivity of "Không cố định"
  const handleScheduleChange = (newSchedule) => {
    const isSelectingKhongCoDinh = newSchedule.includes("khong_co_dinh") && !form.values.lich_ra_chuong.includes("khong_co_dinh");
    const isSelectingOtherDayWhileKhongCoDinhChecked = newSchedule.length > form.values.lich_ra_chuong.length && !isSelectingKhongCoDinh && form.values.lich_ra_chuong.includes("khong_co_dinh");

    if (isSelectingKhongCoDinh) {
      // If "Không cố định" is newly selected, make it the only selection
      form.setFieldValue('lich_ra_chuong', ["khong_co_dinh"]);
    } else if (isSelectingOtherDayWhileKhongCoDinhChecked) {
      // If another day is selected while "Không cố định" was checked, remove "Không cố định"
      form.setFieldValue('lich_ra_chuong', newSchedule.filter(day => day !== "khong_co_dinh"));
    } else {
      // Otherwise, just update with the new array (handles unchecking days, etc.)
      form.setFieldValue('lich_ra_chuong', newSchedule);
    }
  };


  // Custom handler for Textarea to enforce word count limit
  const handleContentChangeWithLimit = (event) => {
    const text = event.currentTarget.value;
    const words = text.trim().split(/\s+/).filter((word) => word !== "");

    if (words.length <= MAX_WORDS) {
      form.setFieldValue('noi_dung', text); // Update form state directly
    } else {
      // Trim the text to the max word count and update form state
      const trimmedText = words.slice(0, MAX_WORDS).join(" ");
      form.setFieldValue('noi_dung', trimmedText);
      // Update word count state immediately for responsiveness (optional, useEffect handles it)
      setWordCount(MAX_WORDS);
    }
  };


  // Submission Handler
  const handleFormSubmit = (values, action) => {
    // No need for event.preventDefault(), useForm's onSubmit handles it
    console.log("Form Submitted!");
    console.log("Action:", action);

    // 'values' object already contains all form data structured as defined in initialValues
    console.log("Form Data:", values);

    // --- API Call Logic ---
    const dataToSend = new FormData(); // Use FormData for file uploads

    Object.keys(values).forEach(key => {
        if (key === 'anh_bia' && values[key]) {
            // Ensure a file object exists before appending
            dataToSend.append(key, values[key], values[key].name);
        } else if (key === 'lich_ra_chuong' && Array.isArray(values[key])) {
            // Handle array - adjust depending on how backend expects it
             // Option 1: Send as multiple entries with same key (e.g., key[])
             values[key].forEach(item => dataToSend.append(key + '[]', item));
             // Option 2: Send as comma-separated string
             // dataToSend.append(key, values[key].join(','));
        } else if (values[key] !== null && values[key] !== undefined) { // Avoid appending null/undefined
            dataToSend.append(key, values[key]);
        }
    });
     dataToSend.append('action', action); // Send the action type

    console.log("FormData to send:", dataToSend); // Log the actual FormData for debugging

    // Example fetch call (uncomment and adapt)
    /*
    const apiEndpoint = '/api/your-endpoint'; // Replace with your actual endpoint
    fetch(apiEndpoint, {
        method: 'POST',
        // Add headers if needed (e.g., for CSRF, Authorization)
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
        // Handle success (e.g., show message, redirect, reset form)
        // form.reset(); // Optionally reset the form on success
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle error (e.g., show error message to user)
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

          {/* --- Form Element --- */}
          {/* Remove onSubmit here if using type="button" on submit buttons */}
          <form>
            <TextInput
              size="lg"
              label="Tên tác phẩm:"
              className="my-2"
              classNames={{
                label: "text-xl font-bold text-white",
                input: "h-10 pl-2 pr-8 rounded-lg border-solid border-gray-700 border-2 text-black bg-gray-200",
              }}
              required // HTML5 required
              {...form.getInputProps("title")} // Bind to useForm
            />
            <TextInput
              size="lg"
              label="Tác giả/đồng tác giả:"
              className="my-2"
              classNames={{
                label: "text-xl font-bold text-white",
                input: "h-10 pl-2 pr-8 rounded-lg border-solid border-gray-700 border-2 text-black bg-gray-200",
              }}
              required
              {...form.getInputProps("tac_gia")} // Bind to useForm
            />
            <TextInput // Or use Textarea if longer intro is expected
              size="lg"
              label="Giới thiệu:"
              className="my-2"
              classNames={{
                label: "text-xl font-bold text-white",
                input: "h-10 pl-2 pr-8 rounded-lg border-solid border-gray-700 border-2 text-black bg-gray-200",
              }}
              required
              {...form.getInputProps("gioi_thieu")} // Bind to useForm
            />
             <TextInput
              size="lg"
              label="Tên chương:"
              className="my-2"
              classNames={{
                label: "text-xl font-bold text-white",
                input: "h-10 pl-2 pr-8 rounded-lg border-solid border-gray-700 border-2 text-black bg-gray-200",
              }}
              required
              {...form.getInputProps("ten_chuong")} // Bind to useForm
            />

            <Radio.Group
              label="Phân loại:"
              size="lg"
              classNames={{ label: "text-xl font-bold text-white" }}
              required
              {...form.getInputProps("story_type")} // Bind to useForm
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
                        // Use form value to determine active style
                        label: `flex items-center justify-center h-12 px-4 rounded-lg border-2 border-gray-700 cursor-pointer ${
                          form.values.story_type === opt.value
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-gray-200 text-black hover:bg-gray-300"
                        }`,
                        inner: "hidden", // hide the actual radio button circle
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
                input: "w-full h-10 pl-2 pr-8 rounded-lg border-2 border-gray-700 bg-gray-200 font-bold text-black text-lg",
                dropdown: "bg-opacity-50 backdrop-blur-sm",
                item: "text-lg font-bold text-black text-center hover:bg-gray-300",
              }}
              // searchable
              withScrollArea={false}
              styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
              allowDeselect={false}
              required
              {...form.getInputProps("thoi_gian_dien_ra")} // Bind to useForm
            />
            <Select
              label={"Thể loại:"}
              size="lg"
              data={theLoaiOptions}
              className="my-2"
              classNames={{
                label: "text-xl font-bold text-white",
                input: "w-full h-10 pl-2 pr-8 rounded-lg border-2 border-gray-700 bg-gray-200 font-bold text-black text-lg",
              }}
              // searchable
              withScrollArea={false}
              styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
              allowDeselect={false}
              required
              {...form.getInputProps("genre")} // Bind to useForm
            />
            <Select
              label={"Chủ đề:"}
              size="lg"
              data={chuDeOptions}
              className="my-2"
              classNames={{
                label: "text-xl font-bold text-white",
                input: "w-full h-10 pl-2 pr-8 rounded-lg border-2 border-gray-700 bg-gray-200 font-bold text-black text-lg",
              }}
              // searchable
              withScrollArea={false}
              styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
              allowDeselect={false}
              required
              {...form.getInputProps("topic")} // Bind to useForm
            />
            <Select
              label={"Kết truyện:"}
              size="lg"
              data={ketTruyenOptions}
              className="my-2"
              classNames={{
                label: "text-xl font-bold text-white",
                input: "w-full h-10 pl-2 pr-8 rounded-lg border-2 border-gray-700 bg-gray-200 font-bold text-black text-lg",
              }}
              required
              // searchable
              withScrollArea={false}
              styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
              allowDeselect={false}
              {...form.getInputProps("ket_truyen")} // Bind to useForm
            />

            <Radio.Group
              label={"Truyện có yếu tố 18+ không?"}
              size="lg"
              className="my-2"
              classNames={{ label: "text-xl font-bold text-white" }}
              required
              {...form.getInputProps("yeu_to_18")} // Bind to useForm
            >
              <Grid gutter="md" className="mt-1">
                <Grid.Col span={6}>
                  <Radio
                    value="co"
                    label="Có"
                    classNames={{
                      root: "w-full",
                      labelWrapper: "w-full",
                      label: `flex items-center justify-center h-12 px-4 rounded-lg border-2 border-gray-700 cursor-pointer ${
                        form.values.yeu_to_18 === "co" // Use form value
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-200 text-black hover:bg-gray-300"
                      }`,
                      inner: "hidden",
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Radio
                    value="khong"
                    label="Không"
                    classNames={{
                      root: "w-full",
                      labelWrapper: "w-full",
                      label: `flex items-center justify-center h-12 px-4 rounded-lg border-2 border-gray-700 cursor-pointer ${
                        form.values.yeu_to_18 === "khong" // Use form value
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-200 text-black hover:bg-gray-300"
                      }`,
                      inner: "hidden",
                    }}
                  />
                </Grid.Col>
              </Grid>
            </Radio.Group>

            <Checkbox.Group
              // Use value prop directly from form state for controlled component behavior
              value={form.values.lich_ra_chuong}
              // Use our custom onChange handler
              onChange={handleScheduleChange}
              label={"Lịch ra chương:"}
              size="lg"
              className="my-2"
              classNames={{ label: "mb-1 text-xl font-bold text-white" }} // Adjusted label style
              required
              // Add error display from form state
              error={form.errors.lich_ra_chuong}
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
                      inner: "hidden", // hide checkbox square
                      root: "w-full",
                      labelWrapper: "w-full",
                      label: `flex items-center justify-center h-12 px-4 rounded-lg border-2 border-gray-700 cursor-pointer ${
                        form.values.lich_ra_chuong.includes(day.value) // Use form value
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-200 text-black hover:bg-gray-300"
                      }`,
                    }}
                  />
                ))}
              </div>
              <div className="mt-2 w-full">
                 {/* This empty checkbox seems unnecessary? Removing it. */}
                {/* <Checkbox classNames={{ inner: "hidden", root: "w-full", labelWrapper: "w-full" }} /> */}
                <Checkbox
                  value="khong_co_dinh"
                  label="Không cố định"
                  classNames={{
                    inner: "hidden",
                    // Adjusted width, maybe w-full or w-auto is better?
                    root: "w-full sm:w-1/2 md:w-1/3 lg:w-1/4",
                    labelWrapper: "w-full", // Let the root control width
                    label: `flex items-center justify-center h-12 px-4 rounded-lg border-2 border-gray-700 cursor-pointer ${
                      form.values.lich_ra_chuong.includes("khong_co_dinh") // Use form value
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-gray-200 text-black hover:bg-gray-300"
                    }`,
                  }}
                />
              </div>
            </Checkbox.Group>

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
                input: "w-full pl-2 py-2 pr-8 rounded-lg border-solid border-gray-700 border-2 text-black font-bold text-lg bg-gray-200",
              }}
              required
              // Use form.values.noi_dung for value
              value={form.values.noi_dung}
              // Use custom handler for onChange to enforce limit
              onChange={handleContentChangeWithLimit}
              // Display error from form state
              error={form.errors.noi_dung}
            />
            <Text align="right" size="lg" className="text-gray-400">
              {/* wordCount state is still updated by useEffect */}
              {wordCount}/{MAX_WORDS}
            </Text>

            <div className="my-2">
              <p className="text-lg font-semibold text-white mb-1">
                 Ảnh bìa: <span className="text-red-500">*</span>
                 {/* Display error message */}
                 {form.errors.anh_bia && <span className="text-sm text-red-400 ml-2">({form.errors.anh_bia})</span>}
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                 {/* Image preview uses separate state */}
                 <Image
                    src={coverImagePreview}
                    alt="anh_bia preview"
                    height="auto" // Let aspect ratio control height
                    radius="md"
                    // className="w-full h-auto rounded-xl max-w-[200px] sm:max-w-xs object-contain aspect-[3/4]"
                    className="w-full h-auto rounded-xl max-w-[200px] sm:max-w-[250px] object-cover aspect-[3/4]" // Use object-cover
                    />
                <div className="flex flex-col gap-2 items-start">
                   <FileButton
                      // Use form.setFieldValue in onChange
                      onChange={(file) => form.setFieldValue('anh_bia', file)}
                      accept="image/png,image/jpeg,image/webp"
                      >
                      {(props) => (
                         <Button
                            {...props}
                            color="blue" // Mantine color prop
                            size="lg"
                            className="text-white font-bold text-xl"
                            // bg={"blue"} // Use color prop instead
                            >
                           Chọn ảnh
                         </Button>
                         )}
                   </FileButton>
                   {/* Display selected file name from form state */}
                   {form.values.anh_bia && (
                      <Text size="sm" className="text-gray-200" mt={4}>
                         {form.values.anh_bia.name}
                      </Text>
                      )}
                      {/* Button to clear the file */}
                      {form.values.anh_bia && (
                         <Button
                             variant="outline"
                             color="red"
                             size="sm"
                             onClick={() => form.setFieldValue('anh_bia', null)}
                         >
                             Xóa ảnh
                         </Button>
                         )}
                </div>
              </div>
            </div>

            <Group position="center" className="pt-4">
              {/* Change buttons to type="button" and trigger submission manually */}
              <Button
                type="button"
                onClick={() => {
                    // Trigger validation before submitting
                    const validationResult = form.validate();
                    if (!validationResult.hasErrors) {
                        handleFormSubmit(form.values, "khoa_chuong");
                    } else {
                        console.log("Validation Errors:", validationResult.errors);
                    }
                }}
                className="text-white text-xl font-bold px-6 py-2 mx-2 w-full sm:w-auto rounded bg-blue-500 hover:bg-blue-600"
                size="xl"
                // w={"40%"} // Use auto width based on content or sm:w-auto
              >
                Cài đặt khóa chương
              </Button>
              <Button
                type="button"
                onClick={() => {
                     // Trigger validation before submitting
                    const validationResult = form.validate();
                    if (!validationResult.hasErrors) {
                        handleFormSubmit(form.values, "luu_chuong");
                    } else {
                        console.log("Validation Errors:", validationResult.errors);
                    }
                }}
                className="text-white text-xl font-bold px-6 py-2 mx-2 w-full sm:w-auto rounded bg-blue-500 hover:bg-blue-600"
                size="xl"
                // w={"40%"} // Use auto width based on content or sm:w-auto
              >
                Lưu chương
              </Button>
            </Group>
             {/* Optional: Display a general API error */}
             {form.errors.apiError && (
                 <Text color="red" size="sm" align="center" mt="md">
                     {form.errors.apiError}
                 </Text>
             )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default WriteChapter;