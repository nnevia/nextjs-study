import fs from 'fs/promises';
import path from 'path';
export default function ProductDetailPage(props) {
  const { product } = props;

  // if (!product) {
  //   return <p>Loading...</p>;
  // }

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const newProduct = data.products.find((product) => product.id === productId);

  return {
    props: {
      product: newProduct,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: 'p1' } },
      { params: { pid: 'p2' } },
      { params: { pid: 'p3' } },
      { params: { pid: 'p4' } },
    ],
    //  fallback: false, // false일 경우 사전 정의된 경로가 아니면 404 페이지가 표시됨
    fallback: 'blocking', // 미리 생성되지 않은 경로면 요청 차단 후 해당 페이지를 새로 생성
  };
}
