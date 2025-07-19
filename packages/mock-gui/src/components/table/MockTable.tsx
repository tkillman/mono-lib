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

interface IProps {
  isAllOn: boolean;
  apiData: MockApi["apiData"];
  apiOnOff: MockApiOnOffStore["apiOnOff"];
  onChangeApiOnOff: (apiKey: string) => (checked: boolean) => void;
}

const MockTable: FC<IProps> = ({
  isAllOn,
  apiData,
  apiOnOff,
  onChangeApiOnOff,
}) => {
  return (
    <div className="overflow-x-auto text-white">
      <Table>
        <TableHead>
          <TableRow className="border-b-[1px] border-white text-white">
            <TableHeadCell className="bg-transparent">METHOD</TableHeadCell>
            <TableHeadCell className="bg-transparent">PATH</TableHeadCell>
            <TableHeadCell className="bg-transparent">STATUS</TableHeadCell>
            <TableHeadCell className="bg-transparent">RESPONSE</TableHeadCell>
            <TableHeadCell className="bg-transparent">DELAY</TableHeadCell>
            <TableHeadCell className="bg-transparent">OPTIONS</TableHeadCell>
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
                  <Select>
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
