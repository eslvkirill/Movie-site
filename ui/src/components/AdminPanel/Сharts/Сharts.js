import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ComposedChart,
} from "recharts";
import "./Charts.scss";

const data = [
  { date: "24.12.2020", "Кол-во фильмов": 5 },
  { date: "25.12.2020", "Кол-во фильмов": 2 },
  { date: "26.12.2020", "Кол-во фильмов": 10 },
  { date: "27.12.2020", "Кол-во фильмов": 4 },
];

const data2 = [
  { movie: "Отель Гранд Будапешт", "Кол-во фильмов": 10 },
  { movie: "Другая земля", "Кол-во фильмов": 8 },
  { movie: "Большой Лебовски", "Кол-во фильмов": 5 },
  { movie: "Леон", "Кол-во фильмов": 5 },
  { movie: "Одержимость", "Кол-во фильмов": 2 },
];

const Charts = () => {
  return (
    <div className="charts">
      <div>
        <h2 className="topMovies">Топ 5 самых популярных фильмов</h2>
        <ComposedChart
          layout="vertical"
          width={600}
          height={400}
          data={data2}
          margin={{
            top: 15,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <CartesianGrid stroke="#ffac97" strokeDasharray="5 5" />
          <XAxis type="number" stroke="#fafafa" />
          <YAxis dataKey="movie" type="category" stroke="#fafafa" width={120} />
          <Tooltip
            wrapperStyle={{
              width: 190,
              height: 20,
            }}
            cursor={{ fill: "#fafafa" }}
          />
          <Bar dataKey="Кол-во фильмов" barSize={20} fill="#c43a18" />
        </ComposedChart>
      </div>
      <div>
        <h2>Проданные фильмы за месяц</h2>
        <BarChart
          width={550}
          height={300}
          data={data}
          margin={{
            top: 15,
            right: 35,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis dataKey="date" stroke="#fafafa" />
          <YAxis stroke="#fafafa" />
          <Tooltip
            wrapperStyle={{
              width: 190,
            }}
            cursor={{ fill: "#fafafa1e" }}
          />
          <CartesianGrid stroke="#e0aaff" strokeDasharray="5 5" />
          <Bar dataKey="Кол-во фильмов" fill="#bc49ff" barSize={30} />
        </BarChart>
      </div>
    </div>
  );
};

export default Charts;
