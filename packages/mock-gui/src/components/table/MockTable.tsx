import type { FC } from "react";
import type { MockApi } from "../../zustand/useMockApiStore";
import {
  Dropdown,
  DropdownHeader,
  DropdownItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  ToggleSwitch,
} from "flowbite-react";
import type { MockApiOnOffStore } from "../../zustand/useMockApiOnOffStore";
import MethodSpan from "../span/MethodSpan";
import { useMockSelectStore } from "../../zustand/useMockSelectStore";
import AngleDown from "../svg/AngleDown";
import type { SELECT_API_METHOD } from "src/domain/API_METHOD.domain";

interface IProps {
  isAllOn: boolean;
  apiData: MockApi["apiData"];
  apiOnOff: MockApiOnOffStore["apiOnOff"];
  onChangeApiOnOff: (apiKey: string) => (checked: boolean) => void;
  onChangeSelect: (apiKey: string, label: string) => void;
  searchMethod: SELECT_API_METHOD;
}

const MockTable: FC<IProps> = ({
  isAllOn,
  apiData,
  apiOnOff,
  onChangeApiOnOff,
  onChangeSelect,
  searchMethod,
}) => {
  const thClasses = "bg-transparent";
  const selectedApi = useMockSelectStore((state) => state.selectedApi);

  return (
    <div className="overflow-x-auto text-white">
      <Table>
        <TableHead>
          <TableRow className="border-b-[1px] border-white text-white">
            <TableHeadCell className={thClasses}>METHOD</TableHeadCell>
            <TableHeadCell className={thClasses}>PATH</TableHeadCell>
            <TableHeadCell className={thClasses}>STATUS</TableHeadCell>
            <TableHeadCell className={thClasses}>RESPONSE</TableHeadCell>
            <TableHeadCell className={thClasses}>DELAY</TableHeadCell>
            <TableHeadCell className={thClasses}>OPTIONS</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {Object.entries(apiData).map(([apiKey, apiInfo]) => {
            const isChecked = Boolean(apiOnOff[apiInfo.apiKey]);

            const mockCases = apiData[apiKey]?.mockCase;
            const selectedLabel = selectedApi[apiKey];

            const selectedMockCase =
              mockCases?.find((mockCase) => mockCase.label === selectedLabel) ||
              mockCases?.[0];

            if (searchMethod !== "ALL" && apiInfo.method !== searchMethod) {
              return null; // 검색된 메소드와 일치하지 않는 경우 렌더링하지 않음
            }

            return (
              <TableRow key={apiKey}>
                <TableCell>
                  <MethodSpan methodName={apiInfo.method} />
                </TableCell>
                <TableCell>
                  <p className="text-white">{apiInfo.path}</p>
                  <p className="text-white font-semibold">{apiInfo.apiTitle}</p>
                </TableCell>
                <TableCell>{selectedMockCase?.status || 200}</TableCell>
                <TableCell>
                  <Dropdown
                    label={
                      <div className="flex items-center justify-between min-w-[150px] max-w-[150px]">
                        <span className="truncate overflow-hidden whitespace-nowrap">
                          {selectedMockCase.label}
                        </span>
                        <span className="ml-2 text-[12px] text-gray-400 min-w-[30px]">
                          ({mockCases?.length || 0}개)
                        </span>
                      </div>
                    }
                    placement="top"
                    disabled={!isChecked}
                  >
                    <DropdownHeader>
                      <span className="font-bold text-[16px]">
                        Mock Preset ({mockCases?.length || 0})
                      </span>
                    </DropdownHeader>

                    {mockCases?.map((mockCase, index) => {
                      const isSelected = selectedApi[apiKey] === mockCase.label;

                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => {
                            if (isSelected) {
                              return; // 이미 선택된 경우 아무 동작도 하지 않음
                            }
                            onChangeSelect(apiKey, mockCase.label);
                          }}
                          className="justify-between"
                        >
                          {isSelected ? <AngleDown /> : <div></div>}
                          {mockCase.label}
                        </DropdownItem>
                      );
                    })}
                  </Dropdown>
                </TableCell>
                <TableCell>{selectedMockCase.delay}</TableCell>
                <TableCell>
                  <ToggleSwitch
                    checked={isChecked}
                    onChange={onChangeApiOnOff(apiInfo.apiKey)}
                    disabled={!isAllOn}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MockTable;
