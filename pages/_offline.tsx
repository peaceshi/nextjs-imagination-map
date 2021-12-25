// export const getStaticProps: GetStaticProps = async ({ locale }) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ["common", "footer"]))
//   }
// });

export default function Home() {
  return <h1>Offline</h1>;
}
