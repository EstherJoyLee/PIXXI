import Image from "next/image";
import Slider from "@/components/slider/Slider";
import Product from "@/components/product/Product";

export default function Home() {
  return (
    <>
      <Slider />
      <Product />
    </>
  );
}
