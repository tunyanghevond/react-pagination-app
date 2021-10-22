import { useEffect, useState } from "react";
import "./App.css";

import Search from "./components/search-box/Search";
import Pagination from "./components/pagination/Pagination";
import CardList from "./components/card-list/CardList";
import { USER_PER_PAGE } from "./components/utils/constant";

function App() {
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [term, setTerm] = useState("");
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const fetchMonsters = async () => {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setLoading(false);
      setMonsters(data);

      setTotalPages(Math.ceil(data.length / USER_PER_PAGE));
    };
    fetchMonsters();
  }, []);

  const handleClick = (num) => {
    setPage(num);
  };

  const searchMonster = (items, term) => {
    if (term.length !== 0) {
      const filtered = items.filter((monster) =>
        monster.name.toLowerCase().includes(term.toLowerCase())
      );
      return filtered;
    } else {
      return items;
    }
  };
  const onUpdateSearch = (term) => {
    if (term) {
      setHide(true);
      setTerm(term);
    } else {
      setHide(false);
      setTerm("");
    }
  };
  const visibleMonsters = searchMonster(monsters, term);
  return (
    <div className="App">
      <h1>Monster Rolodex</h1>
      <Search onUpdateSearch={onUpdateSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CardList monsters={term ? visibleMonsters : monsters} page={page} />
        </>
      )}
      {hide ? null : (
        <Pagination totalPages={totalPages} handleClick={handleClick} />
      )}
    </div>
  );
}

export default App;
