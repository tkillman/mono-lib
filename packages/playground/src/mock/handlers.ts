import { HttpResponse } from "msw";
import { BOARD_LIST_URL } from "./apiUrl";
import { http } from "mock-gui";

export const handlers = [
  http
    .get(BOARD_LIST_URL, () => {
      return HttpResponse.json([
        {
          id: "100",
          title: "mock list 1",
        },
      ]);
    })
    .preset(
      "목록조회 API",
      {
        label: "기본 mock",
        status: 200,
        response: [
          {
            id: "100",
            title: "preset list 1",
          },
        ],
      },
      {
        label: "두번째",
        status: 400,
        response: [{ id: "200", title: "두번째 mock" }],
      }
    ),
  ...Array(50)
    .fill("")
    .flatMap((_, index) => [
      // POST 요청
      http
        .post(`${BOARD_LIST_URL}/${index}`, () => {
          return HttpResponse.json({ message: `POST created ${index}` });
        })
        .preset(
          `POST API ${index}`,
          {
            label: "성공",
            status: 201,
            response: { message: `POST created ${index}` },
          },
          {
            label: "실패",
            status: 400,
            response: { error: `POST invalid data ${index}` },
          }
        ),

      // PUT 요청
      http
        .put(`${BOARD_LIST_URL}/${index}`, () => {
          return HttpResponse.json({ message: `PUT updated ${index}` });
        })
        .preset(
          `PUT API ${index}`,
          {
            label: "성공",
            status: 200,
            response: { message: `PUT updated ${index}` },
          },
          {
            label: "실패",
            status: 404,
            response: { error: `PUT not found ${index}` },
          }
        ),

      // DELETE 요청
      http
        .delete(`${BOARD_LIST_URL}/${index}`, () => {
          return HttpResponse.json({ message: `DELETE success ${index}` });
        })
        .preset(
          `DELETE API ${index}`,
          {
            label: "성공",
            status: 200,
            response: { message: `DELETE success ${index}` },
          },
          {
            label: "실패",
            status: 403,
            response: { error: `DELETE forbidden ${index}` },
          }
        ),
    ]),
];
