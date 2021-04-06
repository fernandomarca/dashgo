import { Button, Flex, Stack } from "@chakra-ui/react";
import Head from "next/head";
import { Input } from "../components/form/Input";
import { useForm, SubmitHandler } from "react-hook-form";

type SignInformData = {
  email: string;
  password: string;
};

export default function SigIn() {
  const { register, handleSubmit, formState } = useForm();

  const handleSignIn: SubmitHandler<SignInformData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
  };

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
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <Input
              name="email"
              type="email"
              label="E-mail"
              {...register("email")}
            />
            <Input
              name="password"
              type="password"
              label="Senha"
              {...register("password")}
            />
          </Stack>
          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
