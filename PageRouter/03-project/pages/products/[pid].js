import fs from 'fs/promises';
import path from 'path';
export default function ProductDetailPage(props) {
  const { product } = props;

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const data = await getData();

  const newProduct = data.products.find((product) => product.id === productId);

  if (!newProduct) {
    return { notFound: true };
  }

  return {
    props: {
      product: newProduct,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));
  return {
    paths: pathsWithParams,
    fallback: true, // false일 경우 사전 정의된 경로가 아니면 404 페이지가 표시됨
    // fallback: 'blocking', // 미리 생성되지 않은 경로면 요청 차단 후 해당 페이지를 새로 생성
  };
}
