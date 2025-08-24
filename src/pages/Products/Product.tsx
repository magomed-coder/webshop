import { useParams } from "react-router-dom";

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // id берём из URL
  return <h1>Product Page. ID: {id}</h1>;
};

export default Product;
