import React from "react";
import classNames from "classnames";
import styles from "./Divider.module.scss";

interface IDividerProps {
  space?: number;
  color?: string;
  [x: string]: any;
}

const Divider = ({
  space = 22,
  color = "#CCC",
  ...restProps
}: IDividerProps) => {
  const style = {
    marginTop: space,
    marginBottom: space,
    background: color,
  };
  return (
    <div
      role="presentation"
      className={classNames(styles.line)}
      style={style}
      {...restProps}
    ></div>
  );
};

export default Divider;
