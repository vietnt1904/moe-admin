import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Title } from "@mantine/core";
import { usePendingChapters } from "../hooks/useChapter";

const PendingChaptersPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: chapters, isLoading, error } = usePendingChapters(page, limit);
  const totalPages = Math.ceil(chapters?.total / limit) || 1;
  console.log(chapters);

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <Title order={1} className="text-center pb-8">Các chương đang chờ duyệt</Title>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>STT</Table.Th>
            <Table.Th>Tên truyện</Table.Th>
            <Table.Th>Chương số</Table.Th>
            <Table.Th>Tiêu đề</Table.Th>
            <Table.Th>Trạng thái</Table.Th>
            <Table.Th>Chi tiết</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {chapters?.map((chapter, index) => (
            <Table.Tr key={chapter?.id}>
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td>{chapter?.Story?.title}</Table.Td>
              <Table.Td>{chapter?.chapterNumber}</Table.Td>
              <Table.Td>{chapter?.title}</Table.Td>
              <Table.Td>{chapter?.status}</Table.Td>
              <Table.Td>
                <Button
                  onClick={() =>
                    navigate(`/admin/chapters/pending/${chapter?.id}`)
                  }
                >
                  Chi tiết
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <div className="flex justify-center pt-8">
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

export default PendingChaptersPage;
