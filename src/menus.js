import React from "react";

function ThreeDotButton() {
  return (
    <div className="three-dot-button" tabIndex="0">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
}

class PopUpMenu extends React.Component {
  render() {
    return (
      <div className={`pop-up-menu`} tabIndex={"0"}>
        <option className="pop-up-option delete" onClick={this.props.onDelete}>
          Delete
        </option>
      </div>
    );
  }
}

export { ThreeDotButton, PopUpMenu };
