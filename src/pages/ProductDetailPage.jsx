import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { title, images, brand, sku, price, description, dimensions } = product;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Debes de iniciar sesion para ver los productos ");
      navigate("/login");
      return;
    }
    getProductById(id)
      .then((prod) => {
        setProduct(prod);
      })
      .catch((error) => {
        toast.error(`Error al obtener detalles del producto`);
        console.error("Error al obtener detalles del producto", error);
      });
  }, [id]);

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 justify-items-center p-8">
      <section key={`product-${id}`}>
        {
          <img
            src={images}
            alt=""
            className="border rounded-xl border-white/50 h-[100%] w-[100%]"
          />
        }
      </section>
      <section className="max-w-full w-[100%] flex flex-col">
        <div className="w-[100%] h-[50%] sm:h-[30%] p-6 mb-4">
          <h3 className="text-3xl mb-2 font-semibold">{title}</h3>
          <p className="text-lg">{brand}</p>
          <p className="text-sm text-white/50">SKU: {sku}</p>
          <div className="sm:flex sm:flex-row mt-2">
            {product.discountPercentage && (
              <div className="flex flex-row ">
                <h4 className="text-md sm:text-lg sm:mr-2 line-through mr-2">
                  ${price}
                </h4>
                <h4 className="text-md sm:text-lg sm:mr-2 text-red-500">
                  ${Math.round(price - price / product.discountPercentage)}
                </h4>
              </div>
            )}
            <button className="border rounded-lg bg-teal-400 w-[40%] md:w-[30%] lg:w-[20%] mt-1 font-semibold">
              Agregar
            </button>
          </div>
        </div>
        <div className="w-[100%] h-[50%] p-6 text-justify">
          <h2 className="text-2xl font-bold mb-2">Description</h2>
          <p className="text-sm sm:text-lg">{description}</p>
          <p className="mt-3 font-semibold">Dimensions:</p>
          <p className="ml-3">W: {dimensions?.width}cm</p>
          <p className="ml-3">H: {dimensions?.height}cm</p>
          <p className="ml-3">D: {dimensions?.depth}cm</p>
        </div>
      </section>
    </main>
  );
}
