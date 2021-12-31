import { Box, Center, Flex, Progress, ProgressProps, BackgroundProps, Text } from "@chakra-ui/react";

const ProgressBar = ({ value }: ProgressProps) => (
  <Box w="100%">
    <Progress hasStripe isAnimated value={value} colorScheme="green" />
    <Center w="100%">
      <Text color="white" mb={2}>
        {value} %
      </Text>
    </Center>
  </Box>
);
export interface SplashScreenProps extends BackgroundProps {
  value: ProgressProps["value"];
}
export const SplashScreen = ({ bg, value }: SplashScreenProps) => {
  return (
    <Center bg={bg} w="100vw" h="100vh">
      <Flex w="50%" flexDirection="column">
        <Text w="100%" align="center" fontSize="6xl" mb={20} color="white">
          原神地图
        </Text>
        <ProgressBar value={value} />
      </Flex>
    </Center>
  );
};
export { SplashScreen as default };
