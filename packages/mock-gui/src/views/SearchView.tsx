import {
  Button,
  Dropdown,
  DropdownItem,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";
import type { FC } from "react";
import {
  apiMethodSelectBoxMapping,
  getClassName,
  type SELECT_API_METHOD,
} from "../domain/API_METHOD.domain";

interface IProps {
  isAllOn: boolean;
  onChangeAllOn: (checked: boolean) => void;
  onClickInit: () => void;
  searchMethod: SELECT_API_METHOD;
  onClickSearchMethod: (method: SELECT_API_METHOD) => (e?: unknown) => void; // Optional prop for search method change
}

const SearchView: FC<IProps> = ({
  onClickInit,
  isAllOn,
  onChangeAllOn,
  searchMethod,
  onClickSearchMethod, // Default to no-op if not provided
}) => {
  return (
    <div className="flex gap-4 items-center">
      <select
        value={searchMethod}
        className={`${getClassName(searchMethod)} py-2 px-1 rounded-xl`}
        onChange={(e) => {
          const selectedMethod = e.target.value as SELECT_API_METHOD;
          onClickSearchMethod(selectedMethod)();
        }}
      >
        {Object.entries(apiMethodSelectBoxMapping).map(
          ([methodName, methodLabel]) => {
            return (
              <option
                key={methodName}
                label={methodLabel}
                value={methodName}
                className={`${getClassName(methodName)} py-2 px-1`}
              />
            );
          }
        )}
      </select>
      <TextInput placeholder="API 목록검색 (예시 : GET /api/v1/users)"></TextInput>
      <Button type="button" onClick={onClickInit}>
        설정 초기화
      </Button>
      <ToggleSwitch checked={isAllOn} onChange={onChangeAllOn} />
    </div>
  );
};

export default SearchView;
