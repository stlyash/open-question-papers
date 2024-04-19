import React from 'react'
import { Link } from "react-router-dom";
interface Item {
  College: string;
  ExamMonth: string;
  ExamYear: string;
  Professor: string;
  QuestionPaper: string;
  Subject: string;
  Timestamp: string;
}

interface PaperTableProps {
  fData: Item[];
}
const PaperTable: React.FC<PaperTableProps> = ({ fData }) => {
      const RemoveQuotes = (obj: string) => {
        if (obj[0] === '"') {
          let objArr = obj.split("");
          objArr.pop();
          objArr.shift();
          return objArr.join("");
        } else return obj;
      };
  return (
    <>
      <table>
        <tr>
          <th>Uploaded</th>
          <th>College</th>
          <th>Subject</th>
          <th>Year</th>
          <th>Month</th>
          <th>Professor</th>
          <th>Link</th>
        </tr>
        {fData.map((item) => (
          <tr className="flex-container" key={item["Timestamp"]}>
            <td>{RemoveQuotes(item["Timestamp"])}</td>
            <td>{RemoveQuotes(item["College"])}</td>
            <td>{RemoveQuotes(item["Subject"])}</td>
            <td>{RemoveQuotes(item["ExamYear"])}</td>
            <td>{RemoveQuotes(item["ExamMonth"])}</td>
            <td>{RemoveQuotes(item["Professor"])}</td>
            <td>
              <Link to={item["QuestionPaper"]} target="_blank">
                Link
              </Link>
            </td>
          </tr>
        ))}
      </table>
    </>
  );
};


export default PaperTable