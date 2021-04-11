import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import React, { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { getUsers, useUsers } from "../../services/hooks/UseUsers";
import { queryClient } from "../../services/queryChient";

export default function UserList({ users }) {
  //
  const [page, setPage] = useState(1);
  const { isLoading, error, data, isFetching } = useUsers(page, {
    initialData: users,
  });

  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ["user", userId],
      async () => {
        const response = await api.get(`users/${userId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, //10 minutos
      }
    );
  }

  return (
    <>
      <Box>
        <Header />

        <Flex
          width="100%"
          my="6"
          maxWidth={1480}
          mx="auto"
          px={["3", "3", "6"]}
        >
          <Sidebar />

          <Box
            flex="1"
            mx="auto"
            minWidth={350}
            borderRadius={8}
            bg="gray.800"
            py="6"
            px={["4", "4", "6"]}
          >
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal">
                Usuários{" "}
                {!isLoading && isFetching && (
                  <Spinner sm="sm" color="gray.500" ml="4" />
                )}
              </Heading>
              <NextLink href="/users/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                  iconSpacing={isWideVersion ? "2" : "0"}
                >
                  {isWideVersion ? "Criar novo" : ""}
                </Button>
              </NextLink>
            </Flex>
            {isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>Falha ao obter dados dos usuários</Text>
              </Flex>
            ) : (
              <>
                <Flex justify="center" minWidth={319}>
                  <Table colorScheme="whiteAlpha" minWidth={319}>
                    <Thead>
                      <Tr>
                        <Th px={["4", "4", "6"]} color="gray.300" mx="auto">
                          <Checkbox colorScheme="pink" />
                        </Th>
                        <Th>Usuário</Th>
                        {isWideVersion && <Th>Data de Cadastro</Th>}
                        <Th width={["4", "4", "6"]} mx="auto"></Th>
                      </Tr>
                    </Thead>
                    <Tbody mx="auto" px="10">
                      {data.users.map((user) => {
                        return (
                          <Tr key={user.id}>
                            <Td px={["4", "4", "6"]}>
                              <Checkbox colorScheme="pink"></Checkbox>
                            </Td>
                            <Td>
                              <Box>
                                <Link
                                  color="purple.400"
                                  onMouseEnter={() =>
                                    handlePrefetchUser(user.id)
                                  }
                                >
                                  <Text
                                    fontWeight="bold"
                                    fontSize={["0.875rem", "0.875rem", "1rem"]}
                                  >
                                    {user.name}
                                  </Text>
                                </Link>
                              </Box>
                              <Box>
                                <Text fontSize="sm" color="gray.300">
                                  {user.email}
                                </Text>
                              </Box>
                            </Td>
                            {isWideVersion && <Td>{user.createdAt} </Td>}
                            <Td>
                              <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="purple"
                                leftIcon={
                                  <Icon as={RiPencilLine} fontSize="16" />
                                }
                                iconSpacing={isWideVersion ? "2" : "0"}
                              >
                                {isWideVersion ? "Editar" : ""}
                              </Button>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </Flex>
                <Pagination
                  totalCountOfRegisters={data.totalCount}
                  currentPage={page}
                  onPageChange={setPage}
                />
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
// export const getServerSideProps: GetServerSideProps = async () => {
//   const { users, totalCount } = await getUsers(1);

//   return {
//     props: {
//       users,
//     },
//   };
// };
