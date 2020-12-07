import React from "react";
import Filters from "./Filters/Filters";
import Sort from "./Sort/Sort";
import "./OperationsSection.scss";

const OperationsSection = (props) => {
  return (
    <section className="operationsSection">
      <Filters
        sortValue={props.sortValue}
        filterContent={props.filterContent}
        setFilterContent={props.setFilterContent}
        currentPage={props.currentPage}
        setCurrentPage={props.setCurrentPage}
        paginate={props.paginate}
        arrowDirection={props.arrowDirection}
        setFetch={props.setFetch}
        setLoading={props.setLoading}
      />
      <Sort
        options={props.options}
        sortValue={props.sortValue}
        arrowDirection={props.arrowDirection}
        setArrowDirection={props.setArrowDirection}
        currentPage={props.currentPage}
        setCurrentPage={props.setCurrentPage}
        paginate={props.paginate}
        isFetch={props.isFetch}
        setFetch={props.setFetch}
        setLoading={props.setLoading}
      />
      <hr />
    </section>
  );
};

export default OperationsSection;
