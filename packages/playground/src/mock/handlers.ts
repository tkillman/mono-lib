import { HttpResponse } from 'msw';
import { BOARD_LIST_URL } from './apiUrl';
import { http } from 'mock-gui';

export const handlers = [
  http
    .get(BOARD_LIST_URL, () => {
      return HttpResponse.json([
        {
          id: '100',
          title: 'mock list 1',
        },
      ]);
    })
    .preset(
      '목록조회 API',
      {
        label: '기본 mock',
        status: 200,
        response: [
          {
            id: '100',
            title: 'preset list 1',
          },
        ],
      },
      {
        label: '두번째',
        status: 400,
        response: [{ id: '200', title: '두번째 mock' }],
      }
    ),
  http.get(`${BOARD_LIST_URL}2`, () => {
    return HttpResponse.json([
      {
        id: '100',
        title: 'mock list 1',
      },
    ]);
  }),
];
