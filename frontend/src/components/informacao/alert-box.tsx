"use client";

import {
  CheckCircleOutlineRounded,
  CloseRounded,
  ErrorOutlineRounded,
  InfoOutlined,
  WarningAmberRounded,
} from "@mui/icons-material";

export function AlertBox({
  type,
  message,
  onClose,
}: {
  type: "success" | "error" | "alert" | "info";
  message: string;
  onClose: () => void;
}) {
  const getColorAndIcon = () => {
    switch (type) {
      case "success":
        return {
          bgColor: "bg-green-50",
          textColor: "text-green-600",
          hoverColor: "hover:text-green-700",
          Icon: CheckCircleOutlineRounded,
        };
      case "error":
        return {
          bgColor: "bg-red-50",
          textColor: "text-red-600",
          hoverColor: "hover:text-red-700",
          Icon: ErrorOutlineRounded,
        };

      case "alert":
        return {
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-600",
          hoverColor: "hover:text-yellow-700",
          Icon: WarningAmberRounded,
        };

      case "info":
        return {
          bgColor: "bg-blue-50",
          textColor: "text-blue-600",
          hoverColor: "hover:text-blue-700",
          Icon: InfoOutlined,
        };
      default:
        return {
          bgColor: "bg-gray-50",
          textColor: "text-gray-600",
          hoverColor: "hover:text-gray-700",
          Icon: InfoOutlined,
        };
    }
  };

  const { bgColor, textColor, hoverColor, Icon } = getColorAndIcon();

  return (
    <>
      <div>
        <div className={`p-4 rounded-lg w-full max-w-md ${bgColor}`}>
          <div className="flex justify-between items-center">
            <div className="flex flex-row items-center gap-3">
              <Icon className={textColor} />
              <p className={`text-sm font-semibold ${textColor}`}>{message}</p>
            </div>
            <button onClick={onClose} className={`${textColor} ${hoverColor}`}>
              <CloseRounded />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
