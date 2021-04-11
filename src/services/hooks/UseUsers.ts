import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../api";

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

type GetUserResponse = {
  totalCount: number;
  users: User[];
};

export async function getUsers(page: number): Promise<GetUserResponse> {
  const { data, headers } = await api.get<{ users: User[] }>("/users", {
    params: {
      page,
    },
  });

  const totalCount = Number(headers["x-total-count"]);

  const users = data.users.map((user: User) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return { users, totalCount };
}

export function useUsers(
  page: number,
  options?: UseQueryOptions<GetUserResponse>
) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10,
    // 10 min
    ...options,
  });
}