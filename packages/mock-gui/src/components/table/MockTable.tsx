import type { FC } from "react";
import type { MockApi } from "../../zustand/useMockApiStore";
import {
  Select,
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

interface IProps {
  isAllOn: boolean;
  apiData: MockApi["apiData"];
  apiOnOff: MockApiOnOffStore["apiOnOff"];
  onChangeApiOnOff: (apiKey: string) => (checked: boolean) => void;
  onChangeSelect: (apiKey: string, label: string) => void;
}

const MockTable: FC<IProps> = ({
  isAllOn,
  apiData,
  apiOnOff,
  onChangeApiOnOff,
  onChangeSelect,
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
            return (
              <TableRow key={apiKey}>
                <TableCell>
                  <MethodSpan methodName={apiInfo.method} />
                </TableCell>
                <TableCell>
                  <div>{apiInfo.path}</div>
                </TableCell>
                <TableCell>STATS 채우기</TableCell>
                <TableCell>
                  <Select
                    value={selectedApi[apiKey]}
                    onChange={(e) => {
                      onChangeSelect(apiKey, e.target.value);
                    }}
                  >
                    {apiInfo.mockCase.map((mockCase, index) => (
                      <option key={index} value={mockCase.label}>
                        {mockCase.label}
                      </option>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>DELAY 채우기</TableCell>
                <TableCell>
                  <ToggleSwitch
                    checked={Boolean(apiOnOff[apiInfo.apiKey])}
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
