import type { FC } from "react";
import { getClassName } from "../../domain/API_METHOD.domain";

interface IProps {
  methodName: string;
  className?: string;
}
const MethodSpan: FC<IProps> = ({ methodName, className }) => {
  return (
    <span
      className={`block px-1 py-2 rounded-md text-white min-w-[60px] text-center ${getClassName(
        methodName
      )} ${className || ""}`.trim()}
    >
      {methodName}
    </span>
  );
};

export default MethodSpan;
