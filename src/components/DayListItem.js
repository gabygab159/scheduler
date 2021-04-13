import classnames from "classnames";
import React from "react";
import "components/DayListItem.scss";

const formatSpots = (spots) => {
  if (spots === 0) {
    return "no spots remaining";
  }

  if (spots === 1) {
    return "1 spot remaining";
  } else {
    return `${spots} spots remaining`;
  }
};

export default function DayListItem(props) {
  let dayListItemClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  return (
    <li className={dayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
