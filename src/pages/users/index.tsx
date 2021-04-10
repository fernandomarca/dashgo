import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
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
import Link from "next/link";
import React from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export default function UserList() {
  //
  const { isLoading, error, data } = useQuery("users", async () => {
    const response = await fetch("http://localhost:3000/api/users");
    const data = await response.json();

    const users: User[] = data.users.map((user: User) => {
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

    return users;
  });

  const isWideVersion = useBreakpointValue({ base: false, lg: true });

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
                Usuários
              </Heading>
              <Link href="/users/create" passHref>
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
              </Link>
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
                      {data.map((user) => {
                        return (
                          <Tr key={user.id}>
                            <Td px={["4", "4", "6"]}>
                              <Checkbox colorScheme="pink"></Checkbox>
                            </Td>
                            <Td>
                              <Box>
                                <Text
                                  fontWeight="bold"
                                  fontSize={["0.875rem", "0.875rem", "1rem"]}
                                >
                                  {user.name}
                                </Text>
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
                <Pagination />
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
