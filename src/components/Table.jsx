import React, { useState } from "react";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



export default function Table({
  dataTh,
  dataTd,
  columDb,
  buttonData,
  endpoint,
  columnDetail,
  judulModalEdit,
  inputData,
}) {
  console.log(dataTd);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [endpointReplaced, setEndpointReplaced] = useState({});
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);

  function handleModalDelete(id) {
    const endpointDetail = endpoint["detail"];
    const endpointDelete = endpoint["delete"];

    const detailReplaced = endpointDetail.replace("{id}", id);
    const deleteReplaced = endpointDelete.replace("{id}", id);

    const replace = {
      detail: detailReplaced,
      delete: deleteReplaced,
    };

    setEndpointReplaced(replace);
    setIsOpenModalDelete(true);
  }
  function handleModalEdit(id) {
    const endpointsDetail = endpoint["detail"];
    const endpointsUpdate = endpoint["update"];
    const detailReplaced = endpointsDetail.replace("{id}", id);
    const updateReplaced = endpointsUpdate.replace("{id", id);
    const replaced = {
      detail: detailReplaced,
      update: updateReplaced,
    };
    setEndpointReplaced(replaced);
    setIsOpenModalEdit(true);
  }
  function handleModalAdd() {
    const replaced = {
      "create": endpoint["create"],
    };
    setEndpointReplaced(replaced);
    setIsOpenModalAdd(true);
  }
  const navigate = useNavigate();

  function handleRestore(id) {
    let endpointRestore = endpoint["restore"].replace("{id}",id);
    axios
      .get(endpointRestore, {
        headers: {
          Authorization: "Bearer " + 
          localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
       
        navigate('/stuffs')
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div class="m-12  overflow-x-auto shadow-md ">
        {buttonData.includes("create") ? (
          <button
            onClick={handleModalAdd}
            type="button"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-9 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Create
          </button>
        ) : (
          ""
        )}
        {buttonData.includes("trash") ? (
          <Link 
            to={'/stuffs/trash'}
            class="focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
          >
            Trash
          </Link>
        ) : (
          ""
        )}

        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {dataTh.map((data, index) => (
                <th scope="col" class="px-6 py-3" key={index}>
                  {data}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Object.entries(dataTd).map(([index, value]) => (
              <tr class="bg-white border-b  dark:border-gray-700">
                <td class="px-6 py-4 text-right">{parseInt(index) + 1}.</td>

                {Object.entries(columDb).map(([i, v]) => (
                  <td class="px-6 py-4">
                    {!v
                      ? value[i]
                      : value[i.replace(/[!@#$%^&*]/, "")]
                      ? value[i.replace(/[!@#$%^&*]/, "")][v]
                      : "0"}
                  </td>
                ))}
                <td class="px-6 py-4 text-right">
                  {buttonData.includes("edit") ? (
                    <button
                      onClick={() => handleModalEdit(value.id)}
                      type="button"
                      class= "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-9 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Edit{""}
                    </button>
                  ) : (
                    ""
                  )}
                  {buttonData.includes("delete") ? (
                    <button
                      onClick={() => handleModalDelete(value.id)}
                      type="button"
                      class= "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-9 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                    Delete{""}
                    </button>
                  ) : (
                    ""
                  )}
                    {buttonData.includes("restore") ? (
                    <a
                      href="#"
                      onClick={() => handleRestore(value.id)}
                      class="font-medium text-green-600 dark:text-green-500 hover:underline"
                    >
                      Restore|{" "}
                    </a>
                  ) : (
                    ""
                  )}
                    {buttonData.includes("permanent-delete") ? (
                    <a
                      href="#"
                      class="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      |Permanent Delete{" "}
                    </a>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalDelete
        isOpen={isOpenModalDelete}
        closeModal={() => setIsOpenModalDelete(false)}
        endpoint={endpointReplaced}
        columnDetail={columnDetail}
      ></ModalDelete>
      <ModalEdit
        isOpen={isOpenModalEdit}
        closeModal={() => setIsOpenModalEdit(false)}
        judulModal={judulModalEdit}
        inputData={inputData}
        endpoint={endpointReplaced}
      ></ModalEdit>
      <ModalAdd
        isOpen={isOpenModalAdd}
        closeModal={() => setIsOpenModalAdd(false)}
        judulModal={judulModalEdit}
        inputData={inputData}
        endpoint={endpointReplaced}
      ></ModalAdd>
    </>
  );
}
