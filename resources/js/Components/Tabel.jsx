import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");
import ConfirmationModal from "./modal/ConfirmationModal";

export default function Tabel({ data }) {
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [page, setPage] = useState(5);

    useEffect(() => {
        setLoading(true);
        // Fetch items from another resources.
        // const endOffset = Math.min(itemOffset + page, data.length);

        const endOffset = parseInt(itemOffset) + parseInt(page);
        // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const sortData = data
            .sort((a, b) => {
                return a.id - b.id;
            })
            .slice(itemOffset, endOffset);
        setCurrentItems(sortData);
        setPageCount(Math.ceil(data.length / page));
        setLoading(false);
    }, [itemOffset, data, page]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        window.scrollTo({
            top: 60,
            behavior: "smooth",
        });

        const newOffset = (event.selected * page) % data.length;

        setItemOffset(newOffset);
    };

    const handleDelete = () => {
        window.my_modal_1.close();
        console.log("delete");
    };
    return (
        <div className="bg-white flex flex-col gap-10 rounded-xl my-10">
            <div className="overflow-x-auto">
                <div className="flex justify-between">
                    <div className="flex  px-5 py-3 gap-10">
                        {/* count page */}
                        <div className="flex flex-row items-center justify-center gap-2">
                            <span className="font-bold ">show :</span>
                            <select
                                className="select "
                                value={page}
                                onChange={(e) => setPage(e.target.value)}
                            >
                                {new Array(5).fill(0).map((item, index) => (
                                    <option key={index} value={index + 1}>
                                        {index + 1}
                                    </option>
                                ))}
                            </select>{" "}
                            <span className="font-bold ">entries</span>
                        </div>
                        {/* search */}
                        <div className="flex flex-row items-center justify-center gap-2">
                            <input
                                type="text"
                                className="input input-bordered"
                                placeholder="Search"
                            />
                            <button className="btn">
                                <i className="fas fa-search"></i>{" "}
                            </button>
                        </div>
                    </div>
                    {/* add member */}
                    <div className="flex items-center gap-2 px-5 py-3">
                        <button className="btn bg-green-400">
                            <i className="fas fa-plus"></i> Add Member
                        </button>
                    </div>
                </div>{" "}
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="font-bold text-lg text-black">
                            <th>UUID</th>
                            <th>Name</th>
                            <th>Tanggal</th>
                            <th>File</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {currentItems.map((item, index) => (
                            <tr key={item.uuid}>
                                <td>
                                    <p className="font-bold">{item.uuid}</p>
                                </td>
                                <td>
                                    <p className="font-bold">
                                        {item.user.name}
                                    </p>
                                </td>
                                <td>
                                    <p className="font-bold">
                                        {moment(item.created_at).fromNow()}
                                    </p>
                                </td>
                                <td>
                                    <a
                                        href={`/storage/laporan/${item.uuid}/${item.file}`}
                                        target="_blank"
                                        className="text-blue-500 underline"
                                    >
                                        {item.file}
                                    </a>
                                </td>
                                <th className="flex gap-2">
                                    {/* <button className="btn btn-ghost btn-md ">
                                        <i className="text-green-500 text-xl fas fa-edit"></i>
                                    </button> */}
                                    <button
                                        className="btn btn-ghost btn-md"
                                        onClick={() => {
                                            window.my_modal_1.show();
                                        }}
                                    >
                                        <i className="text-red-500 text-xl fas fa-trash-alt"></i>
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>{" "}
                </table>
                <div className="flex justify-normal items-center py-5">
                    <ReactPaginate
                        className="flex flex-row gap-1 w-full justify-center items-center select-none"
                        nextLabel="next"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={1}
                        pageCount={pageCount}
                        previousLabel="prev"
                        pageClassName=" text-xl  p-2 rounded-md "
                        pageLinkClassName=" rounded-md text-black  px-4 py-2 font-semibold font-roboto"
                        previousClassName=" p-2 rounded-md text-gray-400 hover:text-black"
                        previousLinkClassName="text-xl p-2  font-semibold font-roboto"
                        nextClassName=" p-2 rounded-md text-gray-400 hover:text-black"
                        nextLinkClassName="text-xl p-2  font-semibold font-roboto "
                        breakLabel="..."
                        breakClassName=" p-2 rounded-md text-black"
                        breakLinkClassName="text-xl font-semibold font-roboto "
                        containerClassName="pagination"
                        activeClassName="bg-green-400 text-white"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
            <ConfirmationModal
                message="Apakah anda yakin ingin menghapus data?"
                onConfirm={() => {
                    handleDelete();
                }}
            />
        </div>
    );
}
