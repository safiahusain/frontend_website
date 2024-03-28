import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function FontAwesomeCom({ icon, size, className }) {
  const text = icon.split(" ");
  const prefix = text[0];
  const iconName = text[1]?.replace("fa-", "");
  return (
    <FontAwesomeIcon
      className={className && className}
      icon={[`${prefix}`, `${iconName}`]}
    />
  );
}

export default FontAwesomeCom;
