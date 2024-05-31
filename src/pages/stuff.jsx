import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";

export default function Stuff() {
  const dataThParent = [
    "#",
    "Name",
    "Category",
    "Total_Available",
    "Total_Defec",
    "Action"
  ];
  const [stuffs, setStuffs] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/stuffs", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        const sortedStuffs = res.data.data.sort((a, b) => a.name.localeCompare(b.name));
        setStuffs(sortedStuffs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columnDatabase = {
    "name": null,
    "category": null,
    "stuff_stock": 
    "total_available",
    "stuff_stock*":
    "total_defec",
  };

  const buttons = [
    "edit", 
    "delete",
    "create",
    "trash"
  ];

  const endpoint = {
    "detail":"http://localhost:8000/stuffs/{id}",
    "delete":"http://localhost:8000/stuffs/delete/{id}",
    "update":"http://localhost:8000/stuffs/update/{id}",
    "create":"http://localhost:8000/stuffs/store",
    "trash":"http://localhost:8000/stuffs/trash"
  }
  const columnDetailModalDelete = 'name'

  const judulModalEdit = 'Stuff'

  const inputData = {
    "name": {
      "type": "text",
      "options": null,
    },
    "category": {
      "type": "select",
      "options": ['HTL','KLN','Teknisi/Sarpras'],
  },

}
  return (
    <>
      <Navbar />
      <div class="p-10">
        <Table
          dataTh={dataThParent}
          dataTd={stuffs}
          columDb={columnDatabase}
          buttonData={buttons}
          endpoint={endpoint}
          columnDetail={columnDetailModalDelete}
          judulModalEdit={judulModalEdit}
          inputData={inputData}
        />
      </div>
    </>
  );
}
