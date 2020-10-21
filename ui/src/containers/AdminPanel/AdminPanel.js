import React, { Component } from "react";
import classes from "./AdminPanel.module.scss";
import Input from "../../components/UiItem/Input/Input";

export default class AdminPanel extends Component {
  submitHandler = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div className={classes.AdminPanel}>
        <form onSubmit={this.submitHandler}>
          <Input type="text" placeholder="Введите новый жанр" />
          {/* <input
            value={this.state.newItem}
            type="text"
            placeholder="Введите новый задачу"
            onChange={(text) => this.addNewItem(text)}
          /> */}
          <button className={classes.AddItem}>Добавить жанр</button>
        </form>
        <hr />
        <div>Жанр</div>
      </div>
    );
  }
}
