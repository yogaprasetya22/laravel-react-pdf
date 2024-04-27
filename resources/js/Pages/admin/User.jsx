import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");
import Layout from "@/Layouts/Layout";
import Create from "@/Components/modal/User/Create";
import Update from "@/Components/modal/User/Update";
import Delete from "@/Components/modal/User/Delete";

export default function User({ data: data_user }) {
    const [data, setData] = useState(data_user);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [page, setPage] = useState(5);
    const [search, setSearch] = useState("");
    const [dataModal, setDataModal] = useState([]);

    useEffect(() => {
        setLoading(true);
        const endOffset = parseInt(itemOffset) + parseInt(page);
        const sortData = data
            .sort((a, b) => {
                return a.id - b.id;
            })
            .slice(itemOffset, endOffset);
        setCurrentItems(sortData);
        setPageCount(Math.ceil(data.length / page));
        setLoading(false);
    }, [itemOffset, data, page]);

    const handlePageClick = (event) => {
        window.scrollTo({
            top: 60,
            behavior: "smooth",
        });

        const newOffset = (event.selected * page) % data.length;

        setItemOffset(newOffset);
    };

    const searchData = () => {
        setItemOffset(0);
        const filteredData = data_user.filter((item) => {
            return (
                item.user.name.toLowerCase().includes(search.toLowerCase()) ||
                item.user.email.toLowerCase().includes(search.toLowerCase()) ||
                item.user.no_telp
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                item.user.alamat.toLowerCase().includes(search.toLowerCase()) ||
                item.nrp.toLowerCase().includes(search.toLowerCase()) ||
                item.pangkat.toLowerCase().includes(search.toLowerCase()) ||
                item.jabatan.toLowerCase().includes(search.toLowerCase())
            );
        });
        setData(filteredData);
    };

    return (
        <Layout>
            <Create />
            <Update data={dataModal} />
            <Delete uuid={dataModal.uuid} />
            <div className="bg-white flex flex-col gap-10 rounded-xl ">
                <div className="overflow-x-auto">
                    <div className="flex justify-between">
                        <div className="flex  px-5 py-3 gap-10">
                            <div className="flex flex-row items-center justify-center gap-2">
                                <span className="font-bold ">show :</span>
                                <select
                                    className="select "
                                    value={page}
                                    onChange={(e) => setPage(e.target.value)}
                                >
                                    {[5, 10, 15, 20].map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>{" "}
                                <span className="font-bold ">entries</span>
                            </div>
                            <div className="flex flex-row items-center justify-center gap-2">
                                <input
                                    type="text"
                                    className="input input-bordered"
                                    placeholder="Search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button
                                    className="btn"
                                    onClick={() => searchData()}
                                >
                                    <i className="fas fa-search"></i>{" "}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-5 py-3">
                            <button
                                className="btn bg-green-400 text-white"
                                onClick={() => window.my_modal_1.show()}
                            >
                                <i className="fas fa-plus"></i> Add Member
                            </button>
                        </div>
                    </div>{" "}
                    <table className="table">
                        <thead>
                            <tr className="font-bold text-lg text-black">
                                <th>id</th>
                                <th>nrp</th>
                                <th>nama</th>
                                <th>email</th>
                                <th>no telp</th>
                                <th>alamat</th>
                                <th>pangkat</th>
                                <th>jabatan</th>
                                <th className="text-center">aksi</th>
                            </tr>
                        </thead>
                        {currentItems.map((item, index) => (
                            <tbody key={item.uuid}>
                                <tr>
                                    <td>
                                        <p className="font-bold">
                                            {item.user.id}
                                        </p>
                                    </td>
                                    <td>
                                        <p className="font-bold">{item.nrp}</p>
                                    </td>
                                    <td>
                                        <p className="font-bold">
                                            {item.user.name}
                                        </p>
                                    </td>
                                    <td>
                                        <p className="font-bold">
                                            {item.user.email}
                                        </p>
                                    </td>
                                    <td>
                                        <p className="font-bold">
                                            {item.user.no_telp}
                                        </p>
                                    </td>
                                    <td>
                                        <p className="font-bold">
                                            {item.user.alamat}
                                        </p>
                                    </td>
                                    <td>
                                        <p className="font-bold">
                                            {item.pangkat}
                                        </p>
                                    </td>
                                    <td>
                                        <p className="font-bold">
                                            {item.jabatan}
                                        </p>
                                    </td>

                                    <td className="flex flex-row gap-2">
                                        <button
                                            onClick={() => {
                                                window.my_modal_2.show();
                                                setDataModal(item);
                                            }}
                                            className="btn bg-yellow-400"
                                        >
                                            <i className="fas fa-edit text-white"></i>
                                        </button>
                                        <button
                                            onClick={() => {
                                                window.my_modal_3.show();
                                                setDataModal(item);
                                            }}
                                            className="btn bg-red-400"
                                        >
                                            <i className="fas fa-trash text-white"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
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
            </div>
        </Layout>
    );
}
