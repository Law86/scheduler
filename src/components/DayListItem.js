import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const spotsAvailable = (spots) => {
    if (spots === 0) {
      return "no spots available";
    } else if (spots === 1) {
      return `${spots} spot available`;
    } else {
      return `${spots} spots available`;
    }
  };

  return (
    <li
      data-testid="day"
      className={dayClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <>
        <h3 className="text--light">{spotsAvailable(props.spots)}</h3>
      </>
    </li>
  );
}
