import React, { useState } from "react";
import Button from "../../../../components/UiItem/Button/Button";
import DropupBlock from "./DropupBlock/DropupBlock";
import "./Filters.scss";

const Filters = (props) => {
  const [dropup, setDropup] = useState(false);

  return (
    <div
      className="filtersWrapper"
      style={
        props.isFetch
          ? {
              opacity: "0.85",
              transition: "0.3s",
              pointerEvents: "none",
            }
          : {}
      }
    >
      <div className="filterText">
        <Button type="success" onClick={() => setDropup(!dropup)}>
          Фильтрация
          <span className={dropup ? "up" : "down"}>➤</span>
        </Button>
      </div>
      <DropupBlock
        dropup={dropup}
        setDropup={setDropup}
        sortValue={props.sortValue}
        filterContent={props.filterContent}
        setFilterContent={props.setFilterContent}
        currentPage={props.currentPage}
        setCurrentPage={props.setCurrentPage}
        arrowDirection={props.arrowDirection}
        paginate={props.paginate}
        setLoading={props.setLoading}
        setFetch={props.setFetch}
      />
    </div>
  );
};

export default Filters;
