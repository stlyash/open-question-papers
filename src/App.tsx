import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import PaperTable from "./AppComponents/PaperTable";
import PaperCard from "./AppComponents/PaperCard";

interface Item {
  College: string;
  ExamMonth: string;
  ExamYear: string;
  Professor: string;
  QuestionPaper: string;
  Subject: string;
  Timestamp: string;
}

function App() {
  const csvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQHo3R_blkcXb8Vo40Ml9yZPKbo1S57F2iWD6zkwLUGrAWDEommpE_T5G9QriSu-u3F6ahfCojSovCJ/pub?output=csv";

  const [displayData, setDisplayData] = useState<Item[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isTable, setIsTable] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvUrl);
        const csvData = await response.text();

        // Split CSV lines
        const lines = csvData.split("\n");

        // Parse CSV data into JSON
        const jsonData = lines.slice(1).map((line): Item => {
          var indi = 0;
          for (let i = 0; i < line.length; i++) {
            if (line[i] === '"' && indi === 0) indi = 1;
            else if (line[i] === '"' && indi === 1) indi = 0;
            if (indi === 0 && line[i] === ",") {
              let a = line;
              let a2 = a.split("");
              a2[i] = "^";
              let a3 = a2.join("");
              line = a3;
            }
          }
          console.log(line);
          const values = line.split("^");
          return {
            College: values[2].trim(),
            ExamMonth: values[6].trim(),
            ExamYear: values[5].trim(),
            Professor: values[3].trim(),
            QuestionPaper: values[4].trim(),
            Subject: values[1].trim(),
            Timestamp: values[0].trim(),
          };
        });

        setDisplayData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching or parsing CSV");
      }
    };

    fetchData();
  }, []);

  const filteredData = displayData.filter((item) =>
    Object.values(item).some((value) =>
      value.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="App">
      <h1>Open Question Papers</h1>
      <div className="upload">
        <Link to={"https://forms.gle/bhx1rYpbj6GPzZMQA"} target="_blank">
          <button>Upload Your Papers</button>
        </Link>
        <br />
        <label className="email-instr">
          (Your email would not be recorded, but you do need a gmail account.)
        </label>
      </div>
      <form className="search">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Start Typing to Search"
        />
        &#128269;
      </form>
      <div className="view-selecter">
        <b style={{ marginRight: "0.2cm" }}>View: </b>
        {/* Grid */}
        <span
          className="view-span"
          onClick={() => {
            setIsTable(false);
          }}
          style={
            !isTable
              ? { border: "solid 1px black" }
              : { border: "solid 1px white" }
          }
        >
          <svg
            className="view-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 440 510"
          >
            <path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40H88c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40H40c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40H88c22.1 0 40-17.9 40-40V328zm32-192v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V136c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40H200c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V328zm32-192v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V136c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40H360c-22.1 0-40 17.9-40 40v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V328z" />
          </svg>
        </span>
        {/* Table */}
        <span
          className="view-span"
          onClick={() => {
            setIsTable(true);
          }}
          style={
            isTable
              ? { border: "solid 1px black" }
              : { border: "solid 1px white" }
          }
        >
          <svg
            className="view-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 510 510"
          >
            <path d="M64 256V160H224v96H64zm0 64H224v96H64V320zm224 96V320H448v96H288zM448 256H288V160H448v96zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
          </svg>
        </span>
      </div>
      {isTable ? (
        <PaperTable fData={filteredData as Item[]} />
      ) : (
        <PaperCard fcData={filteredData as Item[]} />
      )}
    </div>
  );
}

export default App;
