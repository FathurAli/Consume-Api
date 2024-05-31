import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Table from "../components/Table";

export default function StuffTrash() {
  const dataThParent = 
  [
    "#",
     "Name",
      "Category",
       "Action"
      ];
  const [stuffs, setStuffs] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/stuffs/trash", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {

        setStuffs(
          res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columnDatabase = {
    "name": null,
    "category": null,
  };

  const buttons = ["restore", "permanent-delete"];

  const endpoint = {
    restore: "http://localhost:8000/stuffs/trash/restore/{id}",
    "permanent-delete":
      "http://localhost:8000/stuffs/trash/permanent-delete/{id}",
  };

  const columnDetailModalDelete = "";

  const judulModalEdit = "";

  const inputData = {};

  return (
    <>
      <Navbar />
      <div className="m-20">
        <Table
          dataTh={dataThParent}
          dataTd={stuffs}
          columDb={columnDatabase}
          buttonData={buttons}
          endpoint={endpoint}
          columnDetail={columnDetailModalDelete}
          judulModalEdit={judulModalEdit}
          inputData={inputData}
        ></Table>
      </div>
    </>
  );
}
