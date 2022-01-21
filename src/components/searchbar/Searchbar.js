import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchbarStyled } from "./Searchbar.styled";
import { AiOutlineSearch } from "react-icons/ai";

export default function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleInput = (event) => {
    setInputValue(event.target.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") {
      toast.error("Insert smth");
      return;
    }
    onSubmit(inputValue);
    setInputValue("");
  };

  return (
    <SearchbarStyled>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          <AiOutlineSearch stroke="grey" size={20} />
        </button>

        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleInput}
        />
      </form>
    </SearchbarStyled>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

/* export default class Searchbar extends Component {
  state = {
    inputValue: "",
  };
  handleInput = (event) => {
    this.setState({ inputValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.inputValue.trim() === "") {
      toast.error("Insert smth");
      return;
    }
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: "" });
  };

  render() {
    return (
      <SearchbarStyled>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <AiOutlineSearch stroke="grey" size={20} />
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.handleInput}
          />
        </form>
      </SearchbarStyled>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
 */
