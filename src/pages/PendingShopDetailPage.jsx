import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const PendingShopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
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
    <div className="w-5/6 mx-auto pb-8">
      Test pages
      
    </div>
  );
};

export default PendingShopDetail;
