import { Button, Flex, Stack } from "@chakra-ui/react";
import Head from "next/head";
import { Input } from "../components/form/Input";
export default function SigIn() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Flex
          as="form"
          w="100%"
          justify="center"
          maxWidth={360}
          bg="gray.800"
          p="8"
          borderRadius="8"
          flexDir="column"
        >
          <Stack spacing="4">
            <Input name="email" type="email" label="E-mail" />
            <Input name="password" type="password" label="Senha" />
          </Stack>
          <Button type="submit" mt="6" colorScheme="pink" size="lg">
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
