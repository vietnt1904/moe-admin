import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "dayjs/locale/ru";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import { ModalsProvider } from '@mantine/modals';
import { createTheme, MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";
import { NavigationProgress } from "@mantine/nprogress";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import '@mantine/carousel/styles.css';
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import SettingPage from "./pages/SettingPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AuthorPage from "./pages/AuthorPage.jsx";
import StoryPage from "./pages/StoryPage.jsx";
import ChapterPage from "./pages/ChapterPage.jsx";
import { Button } from "@mantine/core";
import AllStoriesPage from "./pages/AllStoriesPage.jsx";
import PendingStoriesPage from "./pages/PendingStoriesPage.jsx";
import PendingStoryPage from "./pages/PendingStoryPage.jsx";
import PendingChaptersPage from "./pages/PendingChaptersPage.jsx";
import PendingChapterPage from "./pages/PendingChapterPage.jsx";
import AllUsersPage from "./pages/AllUsersPage.jsx";
import UserPage from "./pages/UserPage.jsx";


const theme = createTheme({
    colors: {
        // cGreen = custom green
        cGreen: [
            "#e8f5e9",
            "#c8e6c9",
            "#a5d6a7",
            "#81c784",
            "#4caf50",
            "#1DB954",
            "#18a74d",
            "#12813a",
            "#0c5b27",
            "#063214",
        ],
    },
    primaryColor: "cGreen",
    components: {
        Button: Button.extend({
            defaultProps: {
                radius: "xl",
            },
        }),
    },
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignUpPage />,
    },
    {
        path: "/admin/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "stories",
                element: <AllStoriesPage />,
            },
            {
                path: "stories/pending",
                element: <PendingStoriesPage />
            },
            {
                path: "stories/pending/:id",
                element: <PendingStoryPage />,
            },
            {
                path: "stories/:id",
                element: <StoryPage />,
            },
            {
                path: "chapters/pending",
                element: <PendingChaptersPage />,
            },
            {
                path: "chapters/pending/:id",
                element: <PendingChapterPage />,
            },
            {
                path: "chapters/:id",
                element: <ChapterPage />,
            },
            {
                path: "users",
                element: <AllUsersPage />,
            },
            {
                path: "users/:id",
                element: <UserPage />,
            },
            {
                path: "profile",
                element: <ProfilePage />,
            },
            {
                path: "author",
                element: <AuthorPage />,
            },
            {
                path: "setting",
                element: <SettingPage />,
            },
            {
                path: "history",
                element: <HistoryPage />,
            },
            {
                path: "story/:title/:chapter",
                element: <ChapterPage />,
            },
            {
                path: "*",
                element: <ErrorPage />,
            }
        ],
    },
    {
        path: "/error",
        element: <ErrorPage />,
    },
    {
        path: "/*",
        element: <ErrorPage />,
    }
]);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30 * 1000,
        },
    },
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        {/* khong can quan tam */}
        <QueryClientProvider client={queryClient}>
            {/* provider cua thu vien ui */}
            <MantineProvider theme={theme} defaultColorScheme="light">
                <ModalsProvider>

                    <NavigationProgress />
                    {/* toast thong bao */}
                    <Notifications />
                    {/* routes */}
                    <DatesProvider
                        settings={{
                            locale: "vn",
                            firstDayOfWeek: 1,
                            timezone: "Asia/Ho_Chi_Minh",
                        }}
                    >
                        <RouterProvider router={router} />
                    </DatesProvider>
                </ModalsProvider>
            </MantineProvider>
        </QueryClientProvider>
    </StrictMode>,
);