import { Box, Flex, Text, SimpleGrid, theme } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options = {
  theme: {
    // mode: "dark",
    // palette: "palette3",
    monochrome: {
      // enabled: false,
      // color: theme.colors.gray[800],
      // shadeTo: "dark",
      // shadeIntensity: 0.7,
    },
  },
  chart: {
    toolbar: {
      show: false,
      offsetX: 0,
      offsetY: 0,

      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        // reset: true | '<img src="/static/icons/reset.png" width="20">',
        customIcons: [],
      },
      export: {
        csv: {
          filename: undefined,
          columnDelimiter: ",",
          headerCategory: "category",
          headerValue: "value",
          dateFormatter(timestamp) {
            return new Date(timestamp).toDateString();
          },
        },
        svg: {
          filename: undefined,
        },
        png: {
          filename: undefined,
        },
      },
      autoSelected: "zoom",
    },

    zoom: {
      //   enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    // show: false,
    borderColor: theme.colors.gray[600],
    row: {
      colors: ["transparent", "transparent"],
      opacity: 0.8,
    },
    column: {
      colors: ["transparent", "transparent"],
      opacity: 0.8,
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: { enabled: false },
  stroke: {
    curve: "smooth",
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2021-03-18T00:00:00.000Z",
      "2021-03-19T00:00:00.000Z",
      "2021-03-20T00:00:00.000Z",
      "2021-03-21T00:00:00.000Z",
      "2021-03-22T00:00:00.000Z",
      "2021-03-23T00:00:00.000Z",
      "2021-03-24T00:00:00.000Z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [{ name: "series1", data: [31, 120, 10, 28, 51, 18, 109] }];

export default function DashBoard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Taxa de abertura
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
