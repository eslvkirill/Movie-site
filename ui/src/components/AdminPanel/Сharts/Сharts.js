import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ComposedChart,
} from "recharts";
import ContentLoader from "../../UiItem/Loaders/ContentLoader/ContentLoader";
import "./Charts.scss";

const Charts = () => {
  const [bestsellers, setBestsellers] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getStatistics = async () => {
      try {
        await axios.get("/api/movies/bestsellers").then((response) => {
          console.log(response);
          setBestsellers(
            Object.keys(response.data)
              .map((data) => ({
                movie: data,
                "Кол-во фильмов": response.data[data],
              }))
              .sort()
          );
        });

        await axios.get("/api/orders/monthly-sales").then((response) => {
          console.log(response);

          setMonthlySales(
            Object.keys(response.data).map((data) => ({
              datatime: data,
              "Кол-во фильмов": response.data[data],
            }))
          );
        });

        setLoading(true);
      } catch (e) {
        console.log(e);
      }
    };
    getStatistics();
  }, []);

  return (
    <div className="charts">
      {loading ? (
        <>
          <div>
            <h2 className="topMovies">Топ 5 самых популярных фильмов</h2>
            <ComposedChart
              layout="vertical"
              width={600}
              height={400}
              data={bestsellers}
              margin={{
                top: 15,
                right: 0,
                bottom: 0,
                left: 0,
              }}
            >
              <CartesianGrid stroke="#ffac97" strokeDasharray="5 5" />
              <XAxis type="number" stroke="#fafafa" />
              <YAxis
                dataKey="movie"
                type="category"
                stroke="#fafafa"
                width={120}
              />
              <Tooltip
                wrapperStyle={{
                  width: 190,
                  height: 20,
                }}
                cursor={{ fill: "#fafafa" }}
              />
              <Bar dataKey={"Кол-во фильмов"} barSize={20} fill="#c43a18" />
            </ComposedChart>
          </div>
          <div>
            <h2>Проданные фильмы за месяц</h2>
            <BarChart
              width={550}
              height={300}
              data={monthlySales}
              margin={{
                top: 15,
                right: 35,
                bottom: 0,
                left: 0,
              }}
            >
              <XAxis dataKey="datatime" stroke="#fafafa" />
              <YAxis stroke="#fafafa" />
              <Tooltip
                wrapperStyle={{
                  width: 190,
                }}
                cursor={{ fill: "#fafafa1e" }}
              />
              <CartesianGrid stroke="#e0aaff" strokeDasharray="5 5" />
              <Bar dataKey={"Кол-во фильмов"} fill="#bc49ff" barSize={30} />
            </BarChart>
          </div>
        </>
      ) : (
        <ContentLoader />
      )}
    </div>
  );
};

export default Charts;
