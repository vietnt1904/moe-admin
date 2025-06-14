import { IconSettings } from "@tabler/icons-react";
import { IconReport } from "@tabler/icons-react";
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
    label: "Danh sách chương",
    icon: IconCalendarStats,
    links: [
      { label: "Danh sách tất cả chương", link: "/admin/chapters" },
      { label: "Chương đang chờ duyệt", link: "/admin/chapters/pending" },
    ],
  },
  {
    label: "Người dùng",
    icon: IconPresentationAnalytics,
    link: "/admin/users",
  },
];
