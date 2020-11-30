import React from "react";
import "./BackItem.scss";

const BackItem = (props) => (
  <div className="BackItem">
    <div className="titles">
      <div className="engTitle">{props.engTitle}</div>
      <div className="rusTitle">{props.rusTitle}</div>
    </div>
    <div className="bottomOfBackItem">
      <div className="details">
        <div className="genres">
          жанр: <div>{props.genres}</div>
        </div>
        <div className="time">
          длительность: <div>{props.time}</div>
        </div>
        <div className="director">
          режиссёр: <div>Уэс Андерсон</div>
        </div>
      </div>
      <div className="linkToMoviePage">➤ к фильму</div>
    </div>
  </div>
);

export default BackItem;
