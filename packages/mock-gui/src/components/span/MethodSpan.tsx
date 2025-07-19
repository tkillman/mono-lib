import type { FC } from "react";

interface IProps {
  methodName: string;
  className?: string;
}
const MethodSpan: FC<IProps> = ({ methodName, className }) => {
  const getClassName = () => {
    switch (methodName) {
      case "GET":
        return "bg-blue-500";
      case "POST":
        return "bg-green-500";
      case "PUT":
        return "bg-yellow-500";
      case "DELETE":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <span
      className={`block px-1 py-2 rounded-md text-white min-w-[60px] text-center ${getClassName()} ${
        className || ""
      }`.trim()}
    >
      {methodName}
    </span>
  );
};

export default MethodSpan;
