import { useState } from "react";
import { usePendingStories } from "../hooks/useStory";
import { Button, Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const PendingStoriesPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading, error } = usePendingStories(page, limit);
  const stories = data?.data;
  const totalPages = Math.ceil(data?.total / limit) || 1;
  console.log(stories);
  const arrayToString = (array) => {
    return array.map((item) => item?.name).join(",\n ");
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl pb-8 text-center font-bold">Các truyện đang chờ duyệt</h1>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>STT</Table.Th>
            <Table.Th>Ảnh bìa</Table.Th>
            <Table.Th>Tên truyện</Table.Th>
            <Table.Th>Người đăng</Table.Th>
            <Table.Th>Tác giả</Table.Th>
            <Table.Th>Thể loại</Table.Th>
            <Table.Th>Chủ đề</Table.Th>
            <Table.Th>Trạng thái</Table.Th>
            <Table.Th>Chi tiết</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {stories?.map((story, index) => (
            <Table.Tr key={story?.id}>
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td>
                <img
                  src={story?.image}
                  alt={story?.title}
                  className="w-12 h-16 object-cover rounded-lg"
                />
              </Table.Td>
              <Table.Td>{story?.title}</Table.Td>
              <Table.Td>{story?.Author?.fullName}</Table.Td>
              <Table.Td>{story?.authorName}</Table.Td>
              <Table.Td className="whitespace-pre-wrap">{arrayToString(story?.Topics)}</Table.Td>
              <Table.Td className="whitespace-pre-wrap">{arrayToString(story?.Genres)}</Table.Td>
              <Table.Td>{story?.status}</Table.Td>
              <Table.Td>
                <Button onClick={() => navigate(`/admin/stories/pending/${story?.id}`)}>
                  Chi tiết
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <div className="flex justify-center mt-5">
        <nav aria-label="Page navigation">
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button
                type="button"
                onClick={() => setPage(Math.max(page - 1, 1))}
                disabled={page === 1}
                className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg"
              >
                Trang trước
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <li key={pageNumber}>
                  <button
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`py-2 px-3 leading-tight ${
                      page === pageNumber
                        ? "text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                        : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }  focus:outline-none`}
                  >
                    {pageNumber}
                  </button>
                </li>
              )
            )}

            <li>
              <button
                type="button"
                onClick={() => setPage(Math.min(page + 1, totalPages))}
                disabled={page === totalPages || (!isLoading && !error)}
                className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trang sau
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default PendingStoriesPage;
