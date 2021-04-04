import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Fernando Marca</Text>
        <Text color="gray.300" fontSize="small">
          fernandomarca@hotmail.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Fernando Marca"
        src="https://github.com/fernandomarca.png"
      />
    </Flex>
  );
}
