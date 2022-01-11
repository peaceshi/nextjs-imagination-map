import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

export const LanguageControlPanel = () => {
  const router = useRouter();
  const { pathname, locales, query, asPath } = router;
  const { t } = useTranslation();
  return (
    <Box bg="red.400">
      <Flex w="100%" flexDirection="column">
        <Box w="100%">
          <Text color="white" mb={2}>
            {t("tag:选择语言")}
          </Text>
        </Box>
        {locales?.map((locale, index) => (
          <Button
            key={index}
            onClick={() => {
              void router.push({ pathname, query }, asPath, { locale: locale });
            }}
          >
            {locale}
          </Button>
        ))}
      </Flex>
    </Box>
  );
};

export const TileLayerControlPanel = () => {
  const { locale } = useRouter();

  return (
    <Box bg="green.400">
      <Flex w="100%" flexDirection="column">
        <Link
          href={{
            pathname: `/`
          }}
          locale={locale}
          passHref
        >
          <Button>to Teyvat</Button>
        </Link>
        <Link
          href={{
            pathname: `/[id]`,
            query: { id: "qd" }
          }}
          locale={locale}
          passHref
        >
          <Button>to QD</Button>
        </Link>
        <Link
          href={{
            pathname: `/[id]`,
            query: { id: "qd1" }
          }}
          locale={locale}
          passHref
        >
          <Button>to QD1</Button>
        </Link>
        {/* <Link
          href={{
            pathname: `/[id]`,
            query: { id: "editor" }
          }}
          locale={locale}
          passHref
        >
          <Button>Editor</Button>
        </Link> */}
      </Flex>
    </Box>
  );
};
export const Panel = () => (
  <Flex w="100%">
    <TileLayerControlPanel />
    <Spacer />
    <LanguageControlPanel />
  </Flex>
);
export { Panel as default } from "./Panel";
