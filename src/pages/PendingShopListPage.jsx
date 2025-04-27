import { useDebouncedState } from "@mantine/hooks"; // keep useDebouncedState
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PendingShopListPage = () => {
    const navigate = useNavigate();
    const limit = 10;
    const timeOut = 200;
    const [page, setPage] = useState(1);

    const [searchShopName, setSearchShopName] = useDebouncedState("", timeOut);
    
    const FormatDate = (date) => {
        const olddate = new Date(date);
        const formattedDate = olddate.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

        return <div>{formattedDate}</div>;
    };

    return (
        <div className="container mx-auto p-5">
            test page
        </div>
    );
};

export default PendingShopListPage;
