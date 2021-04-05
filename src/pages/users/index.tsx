import {
  Box,
  Button,
  Checkbox,
  Td,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UserList() {
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
            </Flex>

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
                  <Tr>
                    <Td px={["4", "4", "6"]}>
                      <Checkbox colorScheme="pink"></Checkbox>
                    </Td>
                    <Td>
                      <Box>
                        <Text
                          fontWeight="bold"
                          fontSize={["0.875rem", "0.875rem", "1rem"]}
                        >
                          Fernando Marca
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.300">
                          fernandomarca@hotmail.com
                        </Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>04 de Abril, 2021</Td>}
                    <Td>
                      <Button
                        as="a"
                        size="sm"
                        fontSize="sm"
                        colorScheme="purple"
                        leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                        iconSpacing={isWideVersion ? "2" : "0"}
                      >
                        {isWideVersion ? "Editar" : ""}
                      </Button>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td px={["4", "4", "6"]}>
                      <Checkbox colorScheme="pink"></Checkbox>
                    </Td>
                    <Td>
                      <Box>
                        <Text
                          fontWeight="bold"
                          fontSize={["0.875rem", "0.875rem", "1rem"]}
                        >
                          Fernando Marca
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.300">
                          fernandomarca@hotmail.com
                        </Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>04 de Abril, 2021</Td>}
                    <Td>
                      <Button
                        as="a"
                        size="sm"
                        fontSize="sm"
                        colorScheme="purple"
                        leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                        iconSpacing={isWideVersion ? "2" : "0"}
                      >
                        {isWideVersion ? "Editar" : ""}
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Flex>
            <Pagination></Pagination>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
