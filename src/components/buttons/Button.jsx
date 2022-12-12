import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../css/button.module.css";
import clsx from "clsx";

// type --> link | button | submit

// whiteBorder- --> boolean --> true: btn-transparent-border-white, false: btn-transparent
// fillGreen --> boolean --> true: btn-green, false: bg-transparent

const Button = ({
  type = "link",
  path,
  label,
  whiteBorder,
  fillGreen,
  fillRed,
  icon,
  onClick,
  disabled = false,
}) => (
  <>
    {type === "link" && (
      <NavLink
        exact
        to={disabled ? "#" : path}
        type="button"
        onClick={disabled ? null : onClick}
        className={clsx(
          styles.btn,
          label && styles.btn_long,
          !fillGreen &&
            !disabled &&
            !whiteBorder &&
            !fillRed &&
            styles.btn_transparent,
          !fillGreen &&
            disabled &&
            !whiteBorder &&
            !fillRed &&
            styles.btn_transparent_disabled,
          whiteBorder &&
            !disabled &&
            !fillGreen &&
            !fillRed &&
            styles.btn_transparent_border_white,
          whiteBorder &&
            disabled &&
            !fillGreen &&
            !fillRed &&
            styles.btn_transparent_border_white_disabled,
          fillGreen &&
            !disabled &&
            !whiteBorder &&
            !fillRed &&
            styles.btn_green,
          fillGreen &&
            disabled &&
            !whiteBorder &&
            !fillRed &&
            styles.btn_green_disabled,
          fillRed && !disabled && styles.btn_red,
          fillRed && disabled && styles.btn_red_disabled
        )}
      >
        {icon}
        {label}
      </NavLink>
    )}

    {(type === "button" || type === "submit") && (
      <button
        type={type}
        onClick={disabled ? null : onClick}
        className={clsx(
          styles.btn,
          label && styles.btn_long,
          !fillGreen &&
            !disabled &&
            !whiteBorder &&
            !fillRed &&
            styles.btn_transparent,
          !fillGreen &&
            disabled &&
            !whiteBorder &&
            !fillRed &&
            styles.btn_transparent_disabled,
          whiteBorder &&
            !disabled &&
            !fillGreen &&
            !fillRed &&
            styles.btn_transparent_border_white,
          whiteBorder &&
            disabled &&
            !fillGreen &&
            !fillRed &&
            styles.btn_transparent_border_white_disabled,
          fillGreen &&
            !disabled &&
            !whiteBorder &&
            !fillRed &&
            styles.btn_green,
          fillGreen &&
            disabled &&
            !whiteBorder &&
            !fillRed &&
            styles.btn_green_disabled,
          fillRed && !disabled && styles.btn_red,
          fillRed && disabled && styles.btn_red_disabled
        )}
      >
        {icon}
        {label}
      </button>
    )}
  </>
);

export default Button;
