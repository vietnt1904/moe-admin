import {
  IconCalendarStats,
  IconGauge,
  IconNotes,
  IconPresentationAnalytics,
} from "@tabler/icons-react";

export const NAVBAR_ITEMS = [
  { label: "Trang chủ", icon: IconGauge, link: "/admin" },
  {
    label: "Danh sách truyện",
    icon: IconNotes,
    links: [
      { label: "Danh sách tất cả truyện", link: "/admin/stories" },
      { label: "Truyện đang chờ duyệt", link: "/admin/stories/pending" },
    ],
  },
  {
    label: "Chương đang chờ duyệt",
    icon: IconCalendarStats,
    link: "/admin/chapters/pending",
  },
  {
    label: "Người dùng",
    icon: IconPresentationAnalytics,
    link: "/admin/users",
  },
  {
    label: "Thể loại & chủ đề",
    icon: IconNotes,
    links: [
      { label: "Danh sách thể loại", link: "/admin/genres" },
      { label: "Danh sách chủ đề", link: "/admin/topics" },
    ],
  },
  {
    label: "Banner sự kiện",
    icon: IconNotes,
    link: "/admin/banners",
  }
];
