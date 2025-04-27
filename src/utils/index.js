export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const slugify = (text) => {
  return text
    .toLowerCase() // chuyển thành chữ thường
    .normalize("NFD") // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/[^a-z0-9\s-]/g, "") // xóa ký tự đặc biệt
    .trim() // xóa khoảng trắng đầu đuôi
    .replace(/\s+/g, "-") // thay khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, "-"); // loại bỏ gạch ngang thừa
};

export const getIdTitleFromUrl = (url) => {
  const parts = url?.split("-");
  const id = Number(parts[parts.length - 1]);
  const slug = parts.slice(0, parts.length - 1).join("-");
  return {id, slug};
};

export const getIdFromUrl = (url) => {
  const parts = url?.split("-");
  const id = Number(parts[parts.length - 1]);
  return id;
};

export const updateTime = (updatedAt) => {
  const now = new Date();
  const updated = new Date(updatedAt);

  // Điều chỉnh múi giờ GMT+7 nếu cần
  const gmtOffset = 7 * 60 * 60 * 1000;
  const nowGmt7 = new Date(now.getTime() + gmtOffset);
  const updatedGmt7 = new Date(updated.getTime() + gmtOffset);

  const diffMs = nowGmt7 - updatedGmt7;

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  const format = (value, unit) => {
    return `${value} ${unit} trước`;
  };

  if (years > 0) return format(years, "năm");
  if (months > 0) return format(months, "tháng");
  if (days > 0) return format(days, "ngày");
  if (hours > 0) return format(hours, "giờ");
  if (minutes > 0) return format(minutes, "phút");

  return "vừa xong";
};
