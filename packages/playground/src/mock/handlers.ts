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
    .map((_, index) => {
      return http
        .get(`${BOARD_LIST_URL}${index + 5}`, () => {
          return HttpResponse.json([
            {
              id: "100",
              title: "mock list 1",
            },
          ]);
        })
        .preset(
          "목록조회 API 2",
          {
            label: "기본 mock 2",
            status: 200,
            response: [
              {
                id: "100",
                title: "preset list 1",
              },
            ],
          },
          {
            label: "기본 mock 3",
            status: 500,
            response: [
              {
                id: "200",
                title: "preset list 2",
              },
            ],
          }
        );
    }),
];
