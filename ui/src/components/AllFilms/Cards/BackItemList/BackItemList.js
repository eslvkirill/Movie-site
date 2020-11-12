import React from "react";
import BackItem from "./BackItem/BackItem";

const BackItemList = (props) => (
  <ol>
    {/* {props.films.map((film, index) => { */}
    {/* return  */}
    <BackItem film={props.film} />

    {/* })} */}
  </ol>
);

export default BackItemList;
