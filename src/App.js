import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import "./App.styles.css";

let timer = null;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [value, setValue] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    setValue(event.target.value);

    timer = setTimeout(() => {
      setQuery(event.target.value);
    }, 800);
  };

  useEffect(() => {
    if (query) {
      setResults([]);
      setIsLoading(true);

      fetch(`/api/giphy?query=${query}`)
        .then((res) => res.json())
        .then((res) => {
          setIsLoading(false);
          setResults(res);
        });
    } else {
      clearTimeout(timer);
      setIsLoading(false);
      setResults([]);
    }
  }, [query]);

  console.log({ query });
  return (
    <div className="Root">
      <div className="App">
        <Typography variant="h3" gutterBottom>
          Lets search a giph for today! 💪
        </Typography>

        <TextField
          fullWidth
          id="outlined-search"
          label="What are you looking today?"
          type="search"
          value={value}
          onChange={handleChange}
        />

        <div className="Results">
          {isLoading && !results.length ? (
            <Typography variant="h6" gutterBottom>
              We are fetching the data 🕐
            </Typography>
          ) : (
            <div className="Grid">
              {results?.map((el) => {
                const asset = el.images.original;
                return <img src={asset.url} alt={el.title} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
