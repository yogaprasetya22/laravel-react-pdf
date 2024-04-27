import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");
import ConfirmationModal from "./modal/ConfirmationModal";
import { Link } from "@inertiajs/react";

export default function TabelFeedback({ data: data_table }) {
    const [data, setData] = useState(data_table);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [page, setPage] = useState(5);
    const [search, setSearch] = useState("");

    // handle sort all
    const handleSortStatusAll = () => {
        setData(data_table);
    };

    // handle sort by status panding
    const handleSortStatusPanding = () => {
        const filterData = data_table.filter(
            (item) => item?.feedback === null || item?.feedback?.status_id === 1
        );
        setData(filterData);
    };

    // handle sort by status approved
    const handleSortStatusApproved = () => {
        const filterData = data_table.filter(
            (item) => item?.feedback?.status_id === 2
        );
        setData(filterData);
    };

    // handle sort by status rejected
    const handleSortStatusRejected = () => {
        const filterData = data_table.filter(
            (item) => item?.feedback?.status_id === 3
        );
        setData(filterData);
    };

    useEffect(() => {
        setLoading(true);
        // Fetch items from another resources.
        // const endOffset = Math.min(itemOffset + page, data.length);

        const endOffset = parseInt(itemOffset) + parseInt(page);
        // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const sortData = data
            .sort((a, b) => {
                return new Date(b.created_at) - new Date(a.created_at);
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

    const searchData = () => {
        setItemOffset(0);
        const filteredData = data_table.filter((item) => {
            return (
                item.user.name.toLowerCase().includes(search.toLowerCase()) ||
                item.no_sprin.kode
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                item.no_sprin.unit
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                item.no_sprin.kategori
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                item.no_sprin.tahun
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                [
                    item.no_sprin.kode,
                    item.no_sprin.unit,
                    item.no_sprin.kategori,
                    item.no_sprin.tahun,
                ]
                    .join("/")
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                moment(item.surat_perintah.berlaku)
                    .format("LL")
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                moment(item.surat_perintah.hingga)
                    .format("LL")
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                moment(item.created_at)
                    .fromNow()
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                item.feedback?.status?.name_status
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        });
        setData(filteredData);
    };

    return (
        <div className="bg-white flex flex-col gap-10 rounded-xl ">
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
                                {[5, 10, 15, 20].map((item) => (
                                    <option key={item} value={item}>
                                        {item}
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
                    {/* filter status button */}
                    <div className="flex gap-2 px-5 py-3">
                        <button
                            onClick={handleSortStatusAll}
                            className="btn rounded-md bg-yellow-500/70 text-white btn-md"
                        >
                            All
                        </button>
                        <button
                            onClick={handleSortStatusPanding}
                            className="btn rounded-md bg-blue-500/70 text-white btn-md"
                        >
                            Tertunda
                        </button>
                        <button
                            onClick={handleSortStatusApproved}
                            className="btn rounded-md bg-green-500/70 text-white btn-md"
                        >
                            DiSetujui
                        </button>
                        <button
                            onClick={handleSortStatusRejected}
                            className="btn rounded-md bg-red-500/70 text-white btn-md"
                        >
                            Ditolak
                        </button>
                    </div>
                </div>{" "}
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="font-bold text-lg text-black">
                            <th>No Sprin</th>
                            <th>Name</th>
                            <th>Berlaku</th>
                            <th>Hingga</th>
                            <th>Tanggal Upload</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {currentItems.map((item, index) => (
                        <tbody key={item?.uuid}>
                            <tr>
                                <td>
                                    <p className="font-bold">
                                        {item?.no_sprin?.kode}/
                                        {item?.no_sprin?.unit}/
                                        {item?.no_sprin?.kategori}/
                                        {item?.no_sprin?.tahun}
                                    </p>
                                </td>
                                <td>
                                    <p className="font-bold">
                                        {item?.user?.name}
                                    </p>
                                </td>
                                <td>
                                    <p className="font-bold">
                                        {moment(
                                            item?.surat_perintah?.berlaku
                                        ).format("LL")}
                                    </p>
                                </td>
                                <td>
                                    <p className="font-bold">
                                        {moment(
                                            item?.surat_perintah?.hingga
                                        ).format("LL")}
                                    </p>
                                </td>
                                <td>
                                    <p className="font-bold">
                                        {moment(item?.created_at).fromNow()}
                                    </p>
                                </td>
                                <td>
                                    <div className="flex">
                                        <p
                                            className={` font-bold py-1 px-2 rounded-md text-center text-white ${
                                                item?.feedback?.status_id === 1
                                                    ? "bg-blue-500"
                                                    : item?.feedback
                                                          ?.status_id === 2
                                                    ? "bg-green-500"
                                                    : item?.feedback
                                                          ?.status_id === 3
                                                    ? "bg-red-500"
                                                    : "bg-blue-500"
                                            }`}
                                        >
                                            {item?.feedback?.status?.name_status
                                                ? item?.feedback?.status
                                                      ?.name_status
                                                : "panding"}
                                        </p>
                                    </div>
                                </td>
                                <th className="flex gap-2">
                                    <Link
                                        href={`/feedback/${item?.uuid}`}
                                        className="btn btn-ghost btn-md "
                                    >
                                        <i className="text-green-500 text-xl fas fa-eye"></i>
                                    </Link>
                                </th>
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
            <ConfirmationModal
                message="Apakah anda yakin ingin menghapus data?"
                onConfirm={() => {
                    handleDelete();
                }}
            />
        </div>
    );
}
