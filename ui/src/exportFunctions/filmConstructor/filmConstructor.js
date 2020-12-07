export function filmConstructor(data) {
  return [
    ...data.map((film) => {
      Object.keys(film).map((name) => {
        if (Array.isArray(film[name]) && film[name] !== "poster") {
          film[name] = film[name].map((value) => value.name).join(", ");
        }
        if (name === "time") {
          film[name] = `${film[name].hour}ч ${film[name].minute}м`;
        }
        return film[name];
      });
      return film;
    }),
  ];
}
