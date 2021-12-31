import { Box } from "@chakra-ui/react";
import Panel from "@components/Panel";
import { ReactNode } from "react";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      w="100vw"
      h="100vh"
      bg={
        "url('https://assets.yuanshen.site/images/bg/7a9386be46cf07426312725af350420086ece49f151d53fdb971008e08021345.png') repeat"
      }
    >
      {children}
      <Panel />
    </Box>
  );
};
export { MainLayout as default };
