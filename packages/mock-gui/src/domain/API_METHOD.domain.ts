export const enum API_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export type SELECT_API_METHOD = API_METHOD | "ALL";

export const apiMethodSelectBoxMapping: Record<SELECT_API_METHOD, string> = {
  ALL: "전체",
  [API_METHOD.GET]: "GET",
  [API_METHOD.POST]: "POST",
  [API_METHOD.PUT]: "PUT",
  [API_METHOD.DELETE]: "DELETE",
  [API_METHOD.PATCH]: "PATCH",
};

export const apiMethodMapping: Record<API_METHOD, string> = {
  [API_METHOD.GET]: "GET",
  [API_METHOD.POST]: "POST",
  [API_METHOD.PUT]: "PUT",
  [API_METHOD.DELETE]: "DELETE",
  [API_METHOD.PATCH]: "PATCH",
};

export const getClassName = (methodName: string) => {
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
