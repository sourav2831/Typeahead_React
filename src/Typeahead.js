import { useState, useRef } from "react";
import { fetchData, debounce } from "./util";
import { suggestionApi } from "./constants";
import "./index.css";

const Typeahead = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsData, setSuggestionsData] = useState([]);
  const inputRef = useRef();

  const handleInputChange = async (e) => {
    const value = e.target.value;
    if (!value) {
      setSuggestionsData([]);
      return;
    }
    const data = await fetchData(suggestionApi + `?term=${value}`);
    setSuggestionsData(data.suggestions);
  };

  const handleSuggestionClick = (e) => {
    e.preventDefault();
    const value = e.target.innerText;
    inputRef.current.value = value;
  };

  return (
    <div
      className="container"
      tabIndex="1"
      onBlur={() => setShowSuggestions(false)}
      onFocus={() => setShowSuggestions(true)}
    >
      <input
        className={`input-box ${showSuggestions ? "suggestions-open" : ""}`}
        onChange={debounce(handleInputChange)}
        ref={inputRef}
      />
      {showSuggestions && (
        <div className="suggestions-box" onClick={handleSuggestionClick}>
          {suggestionsData.map(({ value }) => {
            return (
              <div className="suggestion" key={value}>
                {value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Typeahead;
