import { Button, Paper, SimpleGrid, Table, TextInput } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUser";
import { useDebouncedState } from "@mantine/hooks";

const AllUsersPage = () => {
  const navigate = useNavigate();
  const TIMEWAIT = 500;
  const limit = 10;
  const [page, setPage] = useState(1);
  const [name, setName] = useDebouncedState("", TIMEWAIT);
  const [phone, setPhone] = useDebouncedState("", TIMEWAIT);
  const [email, setEmail] = useDebouncedState("", TIMEWAIT);
  const [username, setUsername] = useDebouncedState("", TIMEWAIT);
  const { data, isLoading, error } = useUsers(page, limit, name, phone, email, username);
  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;
  console.log("user", users);


  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl text-center pb-8 font-bold">Tất cả người dùng</h1>
      <Paper shadow="sm" p="lg" radius="md" withBorder>
        <SimpleGrid cols={2}>
            <TextInput
              type="text"
              label="Tìm kiếm theo tên"
              placeholder="Tìm kiếm theo tên"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 mr-2"
            />
            <TextInput
              type="text"
              label="Tìm kiếm theo số điện thoại"
              placeholder="Tìm kiếm theo số định dụng"
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 mr-2"
            />
            <TextInput
              type="text"
              label="Tìm kiếm theo email"
              placeholder="Tìm kiếm theo email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 mr-2"
            />
            <TextInput
              type="text"
              label="Tìm kiếm theo tên đăng nhập"
              placeholder="Tìm kiếm theo tên đăng nhập"
              defaultValue={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 mr-2"
            />
        </SimpleGrid>
      </Paper>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>STT</Table.Th>
            <Table.Th>Avatar</Table.Th>
            <Table.Th>Tên đầy đủ</Table.Th>
            <Table.Th>Số điện thoại</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Tên đăng nhập</Table.Th>
            <Table.Th>Vai trò</Table.Th>
            <Table.Th>Chi tiết</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users?.map((user, index) => (
            <Table.Tr key={user?.id}>
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td>
                <img
                  src={user?.avatar}
                  alt={user?.title}
                  className="w-12 h-16 object-cover rounded-lg"
                />
              </Table.Td>
              <Table.Td>{user?.fullName}</Table.Td>
              <Table.Td>{user?.phoneNumber}</Table.Td>
              <Table.Td>{user?.email}</Table.Td>
              <Table.Td>
              {user?.username}
              </Table.Td>
              <Table.Td>
              {user?.role}
              </Table.Td>
              <Table.Td>
                <Button onClick={() => navigate(`/admin/users/${user?.id}`)}>
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

export default AllUsersPage;
