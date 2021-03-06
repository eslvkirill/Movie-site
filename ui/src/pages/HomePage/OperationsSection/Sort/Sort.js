import React from "react";
import Select from "../../../../components/UiItem/Select/Select";
import selectStyle from "../../../../components/UiItem/Select/selectStyle";
import "./Sort.scss";

const Sort = (props) => (
  <div className="sortWrapper">
    <div className="sortText">Сортировка по:</div>
    <div
      className="sort"
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
      <div
        onClick={() => {
          props.setCurrentPage(1);
          props.setArrowDirection(!props.arrowDirection);
          props.paginate(1, props.sortValue, !props.arrowDirection);
          props.setFetch(true);
          props.setLoading(true);
        }}
      >
        {props.arrowDirection ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon ascIcon"
            x="0px"
            y="0px"
            width="54"
            height="54"
            viewBox="0 0 226 226"
          >
            <g transform="translate(4.746,4.746) scale(0.958,0.958)">
              <g
                fill="none"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="none"
                strokeLinecap="butt"
                strokeLinejoin="none"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
                style={{ mixBlendMode: "normal" }}
              >
                <g strokeWidth="10" strokeLinejoin="round">
                  <path d="M124.77083,32.95833c2.54699,-0.03602 4.91607,1.30215 6.20008,3.5021c1.28401,2.19995 1.28401,4.92084 0,7.1208c-1.28401,2.19995 -3.65309,3.53812 -6.20008,3.5021h-89.45833c-2.54699,0.03602 -4.91607,-1.30215 -6.20008,-3.5021c-1.28401,-2.19995 -1.28401,-4.92084 0,-7.1208c1.28401,-2.19995 3.65309,-3.53812 6.20008,-3.5021zM162.72258,65.63159l32.95833,32.95833c1.84494,1.77141 2.58811,4.40181 1.94289,6.87676c-0.64522,2.47495 -2.578,4.40774 -5.05295,5.05295c-2.47495,0.64522 -5.10535,-0.09795 -6.87676,-1.94289l-20.90242,-20.90242v103.01318c0.03602,2.54699 -1.30215,4.91607 -3.5021,6.20008c-2.19995,1.28401 -4.92084,1.28401 -7.1208,0c-2.19995,-1.28401 -3.53812,-3.65309 -3.5021,-6.20008v-103.01318l-20.90242,20.90242c-1.77141,1.84494 -4.40181,2.58811 -6.87676,1.94289c-2.47495,-0.64522 -4.40774,-2.578 -5.05295,-5.05295c-0.64522,-2.47495 0.09795,-5.10535 1.94289,-6.87676l32.95833,-32.95833c1.29941,-1.29998 3.0544,-2.04222 4.89225,-2.06909c1.90796,-0.02677 3.74558,0.71955 5.09456,2.06909zM105.9375,70.625c2.54699,-0.03602 4.91607,1.30215 6.20008,3.5021c1.28401,2.19995 1.28401,4.92084 0,7.1208c-1.28401,2.19995 -3.65309,3.53812 -6.20008,3.5021h-70.625c-2.54699,0.03602 -4.91607,-1.30215 -6.20008,-3.5021c-1.28401,-2.19995 -1.28401,-4.92084 0,-7.1208c1.28401,-2.19995 3.65309,-3.53812 6.20008,-3.5021zM87.10417,108.29167c2.54699,-0.03602 4.91607,1.30215 6.20008,3.5021c1.28401,2.19995 1.28401,4.92084 0,7.1208c-1.28401,2.19995 -3.65309,3.53812 -6.20008,3.5021h-51.79167c-2.54699,0.03602 -4.91607,-1.30215 -6.20008,-3.5021c-1.28401,-2.19995 -1.28401,-4.92084 0,-7.1208c1.28401,-2.19995 3.65309,-3.53812 6.20008,-3.5021zM68.27083,145.95833c2.54699,-0.03602 4.91607,1.30215 6.20008,3.5021c1.28401,2.19995 1.28401,4.92084 0,7.1208c-1.28401,2.19995 -3.65309,3.53812 -6.20008,3.5021h-32.95833c-2.54699,0.03602 -4.91607,-1.30215 -6.20008,-3.5021c-1.28401,-2.19995 -1.28401,-4.92084 0,-7.1208c1.28401,-2.19995 3.65309,-3.53812 6.20008,-3.5021zM49.4375,183.625c2.54699,-0.03602 4.91607,1.30215 6.20008,3.5021c1.28401,2.19995 1.28401,4.92084 0,7.1208c-1.28401,2.19995 -3.65309,3.53812 -6.20008,3.5021h-14.125c-2.54699,0.03602 -4.91607,-1.30215 -6.20008,-3.5021c-1.28401,-2.19995 -1.28401,-4.92084 0,-7.1208c1.28401,-2.19995 3.65309,-3.53812 6.20008,-3.5021z"></path>
                </g>
                <path
                  d="M0,226v-226h226v226z"
                  fill="none"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinejoin="miter"
                ></path>
                <g stroke="none" strokeWidth="1" strokeLinejoin="miter">
                  <path d="M35.3125,32.95833c-2.54699,-0.03602 -4.91607,1.30215 -6.20008,3.5021c-1.28401,2.19995 -1.28401,4.92084 0,7.1208c1.28401,2.19995 3.65309,3.53812 6.20008,3.5021h89.45833c2.54699,0.03602 4.91607,-1.30215 6.20008,-3.5021c1.28401,-2.19995 1.28401,-4.92084 0,-7.1208c-1.28401,-2.19995 -3.65309,-3.53812 -6.20008,-3.5021zM157.62801,63.5625c-1.83785,0.02687 -3.59284,0.76911 -4.89225,2.06909l-32.95833,32.95833c-1.84494,1.77141 -2.58811,4.40181 -1.94289,6.87676c0.64522,2.47495 2.578,4.40774 5.05295,5.05295c2.47495,0.64522 5.10535,-0.09795 6.87676,-1.94289l20.90242,-20.90242v103.01318c-0.03602,2.54699 1.30215,4.91607 3.5021,6.20008c2.19995,1.28401 4.92084,1.28401 7.1208,0c2.19995,-1.28401 3.53812,-3.65309 3.5021,-6.20008v-103.01318l20.90242,20.90242c1.77141,1.84494 4.40181,2.58811 6.87676,1.94289c2.47495,-0.64522 4.40774,-2.578 5.05295,-5.05295c0.64522,-2.47495 -0.09795,-5.10535 -1.94289,-6.87676l-32.95833,-32.95833c-1.34899,-1.34954 -3.1866,-2.09586 -5.09456,-2.06909zM35.3125,70.625c-2.54699,-0.03602 -4.91607,1.30215 -6.20008,3.5021c-1.28401,2.19995 -1.28401,4.92084 0,7.1208c1.28401,2.19995 3.65309,3.53812 6.20008,3.5021h70.625c2.54699,0.03602 4.91607,-1.30215 6.20008,-3.5021c1.28401,-2.19995 1.28401,-4.92084 0,-7.1208c-1.28401,-2.19995 -3.65309,-3.53812 -6.20008,-3.5021zM35.3125,108.29167c-2.54699,-0.03602 -4.91607,1.30215 -6.20008,3.5021c-1.28401,2.19995 -1.28401,4.92084 0,7.1208c1.28401,2.19995 3.65309,3.53812 6.20008,3.5021h51.79167c2.54699,0.03602 4.91607,-1.30215 6.20008,-3.5021c1.28401,-2.19995 1.28401,-4.92084 0,-7.1208c-1.28401,-2.19995 -3.65309,-3.53812 -6.20008,-3.5021zM35.3125,145.95833c-2.54699,-0.03602 -4.91607,1.30215 -6.20008,3.5021c-1.28401,2.19995 -1.28401,4.92084 0,7.1208c1.28401,2.19995 3.65309,3.53812 6.20008,3.5021h32.95833c2.54699,0.03602 4.91607,-1.30215 6.20008,-3.5021c1.28401,-2.19995 1.28401,-4.92084 0,-7.1208c-1.28401,-2.19995 -3.65309,-3.53812 -6.20008,-3.5021zM35.3125,183.625c-2.54699,-0.03602 -4.91607,1.30215 -6.20008,3.5021c-1.28401,2.19995 -1.28401,4.92084 0,7.1208c1.28401,2.19995 3.65309,3.53812 6.20008,3.5021h14.125c2.54699,0.03602 4.91607,-1.30215 6.20008,-3.5021c1.28401,-2.19995 1.28401,-4.92084 0,-7.1208c-1.28401,-2.19995 -3.65309,-3.53812 -6.20008,-3.5021z"></path>
                </g>
                <path
                  d=""
                  fill="none"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinejoin="miter"
                ></path>
                <path
                  d=""
                  fill="none"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinejoin="miter"
                ></path>
                <path
                  d=""
                  fill="none"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinejoin="miter"
                ></path>
              </g>
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon descIcon"
            x="0px"
            y="0px"
            width="54"
            height="54"
            viewBox="0 0 226 226"
          >
            <g transform="translate(2.486,2.486) scale(0.978,0.978)">
              <g
                fill="none"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="none"
                strokeLinecap="butt"
                strokeLinejoin="none"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
                style={{ mixBlendMode: "normal" }}
              >
                <g strokeWidth="10" strokeLinejoin="round">
                  <path d="M124.77083,32.95833c2.54699,-0.03602 4.91607,1.30215 6.20008,3.5021c1.28401,2.19995 1.28401,4.92084 0,7.1208c-1.28401,2.19995 -3.65309,3.53812 -6.20008,3.5021h-89.45833c-2.54699,0.03602 -4.91607,-1.30215 -6.20008,-3.5021c-1.28401,-2.19995 -1.28401,-4.92084 0,-7.1208c1.28401,-2.19995 3.65309,-3.53812 6.20008,-3.5021zM162.72042,70.23438c1.35143,1.3497 2.09864,3.18917 2.07124,5.09896v103.01318l20.90242,-20.90242c1.77141,-1.84494 4.40181,-2.58811 6.87676,-1.94289c2.47495,0.64522 4.40774,2.578 5.05295,5.05295c0.64522,2.47495 -0.09795,5.10535 -1.94289,6.87676l-32.95833,32.95833c-2.75812,2.75698 -7.2287,2.75698 -9.98682,0l-32.95833,-32.95833c-1.84494,-1.77141 -2.58811,-4.40181 -1.94289,-6.87676c0.64522,-2.47495 2.578,-4.40774 5.05295,-5.05295c2.47495,-0.64522 5.10535,0.09795 6.87676,1.94289l20.90242,20.90242v-103.01318c-0.0559,-3.89698 3.05524,-7.10277 6.95215,-7.16365c1.90975,-0.02985 3.75018,0.715 5.10161,2.0647zM105.9375,70.625c2.54699,-0.03602 4.91607,1.30215 6.20008,3.5021c1.28401,2.19995 1.28401,4.92084 0,7.1208c-1.28401,2.19995 -3.65309,3.53812 -6.20008,3.5021h-70.625c-2.54699,0.03602 -4.91607,-1.30215 -6.20008,-3.5021c-1.28401,-2.19995 -1.28401,-4.92084 0,-7.1208c1.28401,-2.19995 3.65309,-3.53812 6.20008,-3.5021zM87.10417,108.29167c2.54699,-0.03602 4.91607,1.30215 6.20008,3.5021c1.28401,2.19995 1.28401,4.92084 0,7.1208c-1.28401,2.19995 -3.65309,3.53812 -6.20008,3.5021h-51.79167c-2.54699,0.03602 -4.91607,-1.30215 -6.20008,-3.5021c-1.28401,-2.19995 -1.28401,-4.92084 0,-7.1208c1.28401,-2.19995 3.65309,-3.53812 6.20008,-3.5021zM68.27083,145.95833c2.54699,-0.03602 4.91607,1.30215 6.20008,3.5021c1.28401,2.19995 1.28401,4.92084 0,7.1208c-1.28401,2.19995 -3.65309,3.53812 -6.20008,3.5021h-32.95833c-2.54699,0.03602 -4.91607,-1.30215 -6.20008,-3.5021c-1.28401,-2.19995 -1.28401,-4.92084 0,-7.1208c1.28401,-2.19995 3.65309,-3.53812 6.20008,-3.5021zM49.4375,183.625c2.54699,-0.03602 4.91607,1.30215 6.20008,3.5021c1.28401,2.19995 1.28401,4.92084 0,7.1208c-1.28401,2.19995 -3.65309,3.53812 -6.20008,3.5021h-14.125c-2.54699,0.03602 -4.91607,-1.30215 -6.20008,-3.5021c-1.28401,-2.19995 -1.28401,-4.92084 0,-7.1208c1.28401,-2.19995 3.65309,-3.53812 6.20008,-3.5021z"></path>
                </g>
                <path
                  d="M0,226v-226h226v226z"
                  fill="none"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinejoin="miter"
                ></path>
                <g stroke="none" strokeWidth="1" strokeLinejoin="miter">
                  <path d="M35.3125,32.95833c-2.54699,-0.03602 -4.91607,1.30215 -6.20008,3.5021c-1.28401,2.19995 -1.28401,4.92084 0,7.1208c1.28401,2.19995 3.65309,3.53812 6.20008,3.5021h89.45833c2.54699,0.03602 4.91607,-1.30215 6.20008,-3.5021c1.28401,-2.19995 1.28401,-4.92084 0,-7.1208c-1.28401,-2.19995 -3.65309,-3.53812 -6.20008,-3.5021zM157.61881,68.16968c-3.8969,0.06088 -7.00805,3.26668 -6.95215,7.16365v103.01318l-20.90242,-20.90242c-1.77141,-1.84494 -4.40181,-2.58811 -6.87676,-1.94289c-2.47495,0.64522 -4.40774,2.578 -5.05295,5.05295c-0.64522,2.47495 0.09795,5.10535 1.94289,6.87676l32.95833,32.95833c2.75812,2.75698 7.2287,2.75698 9.98682,0l32.95833,-32.95833c1.84494,-1.77141 2.58811,-4.40181 1.94289,-6.87676c-0.64522,-2.47495 -2.578,-4.40774 -5.05295,-5.05295c-2.47495,-0.64522 -5.10535,0.09795 -6.87676,1.94289l-20.90242,20.90242v-103.01318c0.0274,-1.90979 -0.71982,-3.74926 -2.07124,-5.09896c-1.35143,-1.3497 -3.19186,-2.09455 -5.10161,-2.0647zM35.3125,70.625c-2.54699,-0.03602 -4.91607,1.30215 -6.20008,3.5021c-1.28401,2.19995 -1.28401,4.92084 0,7.1208c1.28401,2.19995 3.65309,3.53812 6.20008,3.5021h70.625c2.54699,0.03602 4.91607,-1.30215 6.20008,-3.5021c1.28401,-2.19995 1.28401,-4.92084 0,-7.1208c-1.28401,-2.19995 -3.65309,-3.53812 -6.20008,-3.5021zM35.3125,108.29167c-2.54699,-0.03602 -4.91607,1.30215 -6.20008,3.5021c-1.28401,2.19995 -1.28401,4.92084 0,7.1208c1.28401,2.19995 3.65309,3.53812 6.20008,3.5021h51.79167c2.54699,0.03602 4.91607,-1.30215 6.20008,-3.5021c1.28401,-2.19995 1.28401,-4.92084 0,-7.1208c-1.28401,-2.19995 -3.65309,-3.53812 -6.20008,-3.5021zM35.3125,145.95833c-2.54699,-0.03602 -4.91607,1.30215 -6.20008,3.5021c-1.28401,2.19995 -1.28401,4.92084 0,7.1208c1.28401,2.19995 3.65309,3.53812 6.20008,3.5021h32.95833c2.54699,0.03602 4.91607,-1.30215 6.20008,-3.5021c1.28401,-2.19995 1.28401,-4.92084 0,-7.1208c-1.28401,-2.19995 -3.65309,-3.53812 -6.20008,-3.5021zM35.3125,183.625c-2.54699,-0.03602 -4.91607,1.30215 -6.20008,3.5021c-1.28401,2.19995 -1.28401,4.92084 0,7.1208c1.28401,2.19995 3.65309,3.53812 6.20008,3.5021h14.125c2.54699,0.03602 4.91607,-1.30215 6.20008,-3.5021c1.28401,-2.19995 1.28401,-4.92084 0,-7.1208c-1.28401,-2.19995 -3.65309,-3.53812 -6.20008,-3.5021z"></path>
                </g>
                <path
                  d=""
                  fill="none"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinejoin="miter"
                ></path>
              </g>
            </g>
          </svg>
        )}
      </div>
      <Select
        isMulti={false}
        isSearchable={false}
        options={props.options}
        defaultValue={props.options[0]}
        onChange={(event) => {
          props.setCurrentPage(1);
          props.paginate(1, event, props.arrowDirection);
          props.setFetch(true);
          props.setLoading(true);
        }}
        noOptionsMessage={() => "Список пуст"}
        styles={selectStyle(
          272,
          15,
          "#fceddc",
          "#995506",
          "#995506",
          20,
          "#995506",
          "#b3752f81",
          "#4d0477b9",
          270,
          "#4d0477b9",
          15,
          4,
          "85%",
          3.35,
          "solid",
          "#b3752f81",
          "#4d0477b9",
          "#b3752f81",
          "#4d0477b9",
          "#b3752f81",
          17,
          230,
          "relative",
          -2,
          "pointer",
          "12%",
          -8,
          "hidden"
        )}
      />
    </div>
  </div>
);

export default Sort;
