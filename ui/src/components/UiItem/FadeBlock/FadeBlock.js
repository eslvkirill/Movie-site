import React from "react";
// import classes from "./FadeBlock.module.scss";
import { Transition } from "react-transition-group";
import "./FadeBlock.scss";

const FadeBlock = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     toggle: true,
  //   };
  // }

  // render() {
  return (
    <>
      {/* <button onClick={() => this.setState({ toggle: !this.state.toggle })}>
          Toggle
        </button> */}

      <Transition
        in={props.showBlock}
        timeout={{ enter: 2500, exit: 1700 }}
        mountOnEnter
        unmountOnExit
      >
        {(state) => (
          <div className={`test ${state}`}>
            <h1>Успешно</h1>
            <div>
              Фильм <span>"{props.rusTitle}"</span> добавлен
            </div>
          </div>
        )}
      </Transition>
    </>
  );
  // }
};

export default FadeBlock;
