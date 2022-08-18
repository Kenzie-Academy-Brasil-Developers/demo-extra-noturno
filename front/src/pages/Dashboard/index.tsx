import { useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { useProducts } from "../../providers/ProductsProvider";

const Dashboard = () => {
  const { user, signOut, getUserData, accessToken } = useAuth();
  const { products, listProducts } = useProducts();

  useEffect(() => {
    console.log("aqui");
    setTimeout(() => {
      getUserData(accessToken);
      listProducts();
    }, 4000);
  }, []);

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>{user.name}</h2>
      <button onClick={signOut}>"Sair"</button>
      <h1>Meus Produtos</h1>
      <ul>
        {products
          .filter((product) => product.userId === user.id)
          .map((product) => {
            return (
              <li key={product.id}>
                <p>
                  <span>Nome:</span>
                  {product.name}
                </p>
                <span>
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.price)}
                </span>
                <p>Características:</p>
                <ul>
                  {product.features.map((feat) => {
                    return (
                      <div key={feat.id}>
                        <li>{feat.brand}</li>
                        <li>{feat.model}</li>
                        <li>{feat.weight}</li>
                      </div>
                    );
                  })}
                </ul>
              </li>
            );
          })}
      </ul>
      <h1>Produtos</h1>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <p>
                <span>Nome:</span>
                {product.name}
              </p>
              <span>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price)}
              </span>
              <p>Características:</p>
              <ul>
                {product.features.map((feat) => {
                  return (
                    <div key={feat.id}>
                      <li>{feat.brand}</li>
                      <li>{feat.model}</li>
                      <li>{feat.weight}</li>
                    </div>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dashboard;
