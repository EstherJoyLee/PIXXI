"use client";
import Button from "@/components/button/Button";
import Heading from "@/components/heading/Heading";
import Loader from "@/components/loader/Loader";
import { db, storage } from "@/firebase/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../../firebase/firebase";
import styles from "./AddProductClient.module.scss";
import { getErrorMessage } from "../../../utils/getErrorMessage";

export const categories = [
  { id: 1, name: "fruits taste" },
  { id: 2, name: "sweet taste" },
  { id: 3, name: "sour taste" },
  { id: 4, name: "tangy taste" },
  { id: 5, name: "creamy taste" },
  { id: 6, name: "refreshing taste" },
];

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

const AddProductClient = () => {
  const [product, setProduct] = useState({ ...initialState });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const user = auth.currentUser;

    if (user) {
      console.log("user:", user);

      const storageRef = ref(storage, `images/${user.uid}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          toast.error(getErrorMessage(error));
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setProduct((prevState) => ({
                ...prevState,
                imageURL: downloadURL,
              }));
              toast.success("이미지를 성골적으로 업로드했습니다.");
            })
            .catch((error) => {
              toast.error("이미지 URL을 가져오는 데 실패했습니다.");
            });
        }
      );
    }
  };

  const addProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Uploading product: ", product);
      addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });

      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });

      toast.success("상품을 저장했습니다.");
      router.push("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.product}>
        <Heading title="새 상품 생성하기" />
        <form onSubmit={addProduct}>
          <label>상품 이름:</label>
          <input
            type="text"
            placeholder="상품 이름"
            required
            name="name"
            value={product.name}
            onChange={(e) => handleInputChange(e)}
          />

          <div>
            {uploadProgress === 0 ? null : (
              <div className={styles.progress}>
                <div
                  className={styles["progress-bar"]}
                  style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress < 100
                    ? `Uploading... ${uploadProgress}`
                    : `Upload Complete ${uploadProgress}%`}
                </div>
              </div>
            )}

            <input
              type="file"
              placeholder="상품 이미지"
              accept="image/*"
              name="image"
              required
              onChange={(e) => handleImageChange(e)}
            />

            {product.imageURL === "" ? null : (
              <input
                type="text"
                name="imageURL"
                disabled
                value={product.imageURL}
                required
                placeholder="이미지 URL"
              />
            )}
          </div>
          <label>상품 가격:</label>
          <input
            type="number"
            placeholder="상품 가격"
            required
            name="price"
            value={product.price}
            onChange={(e) => handleInputChange(e)}
          />
          <label>상품 카테고리:</label>
          <select
            required
            name="category"
            value={product.category}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="" disabled>
              --상품 카테고리 선택
            </option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </select>

          <label>상품 브랜드/회사:</label>
          <input
            type="text"
            placeholder="상품 브랜드/회사"
            name="brand"
            value={product.brand}
            onChange={(e) => handleInputChange(e)}
          />

          <label>상품 설명:</label>
          <textarea
            name="desc"
            value={product.desc}
            cols={10}
            rows={10}
            required
            onChange={(e) => handleInputChange(e)}
          ></textarea>
          <Button type="submit">상품 생성</Button>
        </form>
      </div>
    </>
  );
};
export default AddProductClient;
