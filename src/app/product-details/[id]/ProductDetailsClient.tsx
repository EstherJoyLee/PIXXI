"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import useFetchDocument from "@/hooks/useFetchDocument";
import styles from "./ProductDetails.module.scss";
import Loader from "@/components/loader/Loader";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import Divider from "@/components/divider/Divider";
import { priceFormat } from "@/utils/priceFormat";
import listCashIcon from "@/assets/list-cash-icon.png";
import Button from "@/components/button/Button";
import ProductReviewItem from "@/components/product/productReviewItem/ProductReviewItem";
import useFetchDocuments from "@/hooks/useFetchDocuments";
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from "@/redux/slice/cartSlice";
import { useDispatch } from "react-redux";

const ProductDetailsClient = () => {
  const { id } = useParams();
  const stringId = Array.isArray(id) ? id[0] : id;

  const { document: product } = useFetchDocument("products", stringId);
  const { documents: review } = useFetchDocuments("review", [
    "productID",
    "==",
    stringId,
  ]);

  const [count, setCount] = useState(1);

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(ADD_TO_CART({ ...product, quantity: count }));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1));

  const tomorrowDate = tomorrow.getDate();
  const tomorrowMonth = tomorrow.getMonth();

  return (
    <>
      <section className={styles.product}>
        {product === null ? (
          <Loader />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <Image
                  width={477}
                  height={410}
                  src={product.imageURL}
                  alt={product.name}
                  priority
                />
              </div>
              <div className={styles.content}>
                <div className={styles.header}>
                  <p className={styles.brandName}>{product.brand}</p>
                  <p className={styles.productName}>{product.name}</p>
                  <div className={styles.rating}>
                    <Rating initialValue={3} size={17} />
                    <span className={styles.count}>10,000개 상품평</span>
                  </div>
                </div>

                <Divider space={0} />

                <div className={styles.container}>
                  <p className={styles.price}>{priceFormat(product.price)}원</p>

                  <div className={styles.rewardCashBadge}>
                    <Image src={listCashIcon} alt="cash-icon" width={12} />
                    <span>최대 {product.price / 10}원 적립</span>
                  </div>
                </div>

                <Divider space={0} />

                <div className={styles.rewardCashWrapper}>
                  <div className={styles.rewardSummary}>
                    <Image src={listCashIcon} alt="cash-icon" width={15} />
                    <p>
                      캐시적립 혜택<span>|</span> 최대{" "}
                      <strong>{product.price / 10}</strong>원 적립
                    </p>
                  </div>
                  <div className={styles.rewardCashPromotion}>
                    <p>쿠페이 머니 결제 시 1% 적립</p>
                    <p>[로켓와우 + 쿠페이 계좌이체] 결제 시 2% 적립</p>
                    <p>[로켓와우 + 쿠페이 머니] 결제 시 4% 추가 적립</p>
                    <button>로켓와우 무료체험 신청하기</button>
                  </div>
                </div>

                <Divider space={0} />

                <div className={styles.bottom}>
                  <p className={styles.price}>{product.price * count}원</p>

                  <div className={styles.count}>
                    <Button
                      onClick={() => setCount((prev) => prev - 1)}
                      disabled={count > 1 ? false : true}
                      secondary
                    >
                      -
                    </Button>
                    <p>
                      <b>{count}</b>
                    </p>
                    <Button
                      secondary
                      onClick={() => setCount((prev) => prev + 1)}
                    >
                      +
                    </Button>

                    <Button
                      onClick={() => {
                        addToCart();
                      }}
                    >
                      장바구니 담기
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className={styles.card}>
          <h3>상품평 ({review.length})</h3>
          <div>
            {review.length === 0 ? (
              <p className={styles.noReviewText}>
                해당 상품에 대한 상품평이 아직 없습니다.
              </p>
            ) : (
              <>
                {review.map((item) => {
                  return (
                    <ProductReviewItem
                      key={item.id}
                      rate={item.rate}
                      review={item.review}
                      reviewDate={item.reviewDate}
                      userName={item.userName}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsClient;
