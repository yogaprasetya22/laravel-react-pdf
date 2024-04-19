import Layout from "@/Layouts/Layout";
import moment from "moment";
import "moment/locale/id";
moment.locale("id");
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function Index({ data: data_table }) {
    const [data, setData] = useState(data_table);
    const [bulan, setBulan] = useState(moment().format("MMMM").toLowerCase());
    const [currentData, setCurrentData] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [page, setPage] = useState(5);

    useEffect(() => {
        setCurrentData(
            data.filter((item) => {
                return moment(item.created_at).format("MMMM").toLowerCase() ===
                    bulan
                    ? item
                    : null;
            })
        );
    }, [bulan, data]);

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
        const sortData = currentData
            .sort((a, b) => {
                return new Date(b.created_at) - new Date(a.created_at);
            })
            .slice(itemOffset, endOffset);
        setCurrentItems(sortData);
        setPageCount(Math.ceil(currentData.length / page));
        setLoading(false);
    }, [itemOffset, currentData, page]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        window.scrollTo({
            top: 60,
            behavior: "smooth",
        });

        const newOffset = (event.selected * page) % currentData.length;

        setItemOffset(newOffset);
    };

    return (
        <Layout>
            <div className="flex flex-col gap-5">
                <div className="flex w-full justify-between gap-5">
                    <div className="w-full bg-blue-500 flex flex-row items-center text-white font-semibold text-lg rounded-md p-2 gap-4">
                        <div
                            className="bg-white p-2 flex flex-col justify-center items-center pr-6 shadow-2xl"
                            style={{
                                clipPath:
                                    "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
                            }}
                        >
                            <p className="text-xs font-semibold text-gray-400">
                                Panding
                            </p>
                            <i className="fas fa-exclamation-triangle text-2xl p-2 text-yellow-500"></i>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center ">
                            <p className="text-xs font-semibold text-gray-200">
                                bulan ini
                            </p>
                            <p className="text-3xl font-semibold">
                                {
                                    currentData.filter(
                                        (item) =>
                                            item?.feedback === null ||
                                            item?.feedback?.status_id === 1
                                    ).length
                                }
                            </p>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center ">
                            <p className="text-xs font-semibold text-gray-200">
                                Keseluruhan
                            </p>
                            <p className="text-3xl font-semibold">
                                {
                                    data.filter(
                                        (item) =>
                                            item?.feedback === null ||
                                            item?.feedback?.status_id === 1
                                    ).length
                                }
                            </p>
                        </div>
                    </div>
                    <div className="w-full bg-green-500 flex flex-row items-center text-white font-semibold text-lg rounded-md p-2 gap-4">
                        <div
                            className="bg-white p-2 flex flex-col justify-center items-center pr-6 shadow-2xl"
                            style={{
                                clipPath:
                                    "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
                            }}
                        >
                            <p className="text-xs font-semibold text-gray-400">
                                Setuju
                            </p>
                            <i className="fas fa-check-circle text-2xl p-2 text-green-500"></i>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center ">
                            <p className="text-xs font-semibold text-gray-200">
                                bulan ini
                            </p>
                            <p className="text-3xl font-semibold">
                                {
                                    currentData.filter(
                                        (item) =>
                                            item?.feedback?.status_id === 2
                                    ).length
                                }
                            </p>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center ">
                            <p className="text-xs font-semibold text-gray-200">
                                Keseluruhan
                            </p>
                            <p className="text-3xl font-semibold">
                                {
                                    data.filter(
                                        (item) =>
                                            item?.feedback?.status_id === 2
                                    ).length
                                }
                            </p>
                        </div>
                    </div>
                    <div className="w-full bg-red-500 flex flex-row items-center text-white font-semibold text-lg rounded-md p-2 gap-4">
                        <div
                            className="bg-white p-2 flex flex-col justify-center items-center pr-6 shadow-2xl"
                            style={{
                                clipPath:
                                    "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
                            }}
                        >
                            <p className="text-xs font-semibold text-gray-400">
                                Tolak
                            </p>
                            <i className="fas fa-times text-2xl p-2 text-red-600"></i>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center ">
                            <p className="text-xs font-semibold text-gray-200">
                                bulan ini
                            </p>
                            <p className="text-3xl font-semibold">
                                {
                                    currentData.filter(
                                        (item) =>
                                            item?.feedback?.status_id === 3
                                    ).length
                                }
                            </p>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center ">
                            <p className="text-xs font-semibold text-gray-200">
                                Keseluruhan
                            </p>
                            <p className="text-3xl font-semibold">
                                {
                                    data.filter(
                                        (item) =>
                                            item?.feedback?.status_id === 3
                                    ).length
                                }
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-white">
                    <div className="overflow-x-auto">
                        <div className="w-full flex justify-between gap-5">
                            <div className="flex gap-2 px-5 py-3 items-center">
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
                                </button>{" "}
                                <div className="flex justify-center items-center ">
                                    <select
                                        name="bulan"
                                        id="bulan"
                                        className="border border-gray-300 rounded-md p-2"
                                        value={bulan}
                                        onChange={(e) =>
                                            setBulan(e.target.value)
                                        }
                                    >
                                        <option value="januari">Januari</option>
                                        <option value="februari">
                                            Februari
                                        </option>
                                        <option value="maret">Maret</option>
                                        <option value="april">April</option>
                                        <option value="mei">Mei</option>
                                        <option value="juni">Juni</option>
                                        <option value="juli">Juli</option>
                                        <option value="agustus">Agustus</option>
                                        <option value="september">
                                            September
                                        </option>
                                        <option value="oktober">Oktober</option>
                                        <option value="november">
                                            November
                                        </option>
                                        <option value="desember">
                                            Desember
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-normal items-center py-5">
                                <ReactPaginate
                                    className="flex flex-row gap-1 w-full justify-end items-center select-none pr-10"
                                    nextLabel=">"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={2}
                                    marginPagesDisplayed={1}
                                    pageCount={pageCount}
                                    previousLabel="<"
                                    pageClassName=" text-sm border  p-2 rounded-md "
                                    pageLinkClassName=" rounded-md  px-2 py-2 font-semibold font-roboto"
                                    previousClassName=" p-2 rounded-md text-blue-800 hover:scale-125 hover:scale text-xl"
                                    previousLinkClassName="text-xl p-2  font-semibold font-roboto"
                                    nextClassName=" p-2 rounded-md text-blue-800 hover:scale-125 hover:scale text-xl"
                                    nextLinkClassName="text-xl p-2  font-semibold font-roboto "
                                    breakLabel="..."
                                    breakClassName=" p-2 rounded-md text-blue-800"
                                    breakLinkClassName="text-sm font-semibold font-roboto "
                                    containerClassName="pagination"
                                    activeClassName="bg-transparan border border-blue-800 text-blue-800"
                                />
                            </div>
                        </div>
                        <table className="table">
                            <thead className="bg-gray-600">
                                <tr className="font-bold text-lg text-white">
                                    <th className="text-center">No Sprin</th>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Berlaku</th>
                                    <th className="text-center">Hingga</th>
                                    <th className="text-center">
                                        Tanggal Upload
                                    </th>
                                    <th className="text-center">Status</th>
                                </tr>
                            </thead>
                            {currentItems.map((item, index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td className="border-x">
                                            <p className="font-bold text-center">
                                                {item?.no_sprin?.kode}/
                                                {item?.no_sprin?.unit}/
                                                {item?.no_sprin?.kategori}/
                                                {item?.no_sprin?.tahun}
                                            </p>
                                        </td>
                                        <td className="border-x">
                                            <p className="font-bold text-center">
                                                {item.user.name}
                                            </p>
                                        </td>
                                        <td className="border-x">
                                            <p className="font-bold text-center">
                                                {moment(
                                                    item.surat_perintah.berlaku
                                                ).format("LL")}
                                            </p>
                                        </td>
                                        <td className="border-x">
                                            <p className="font-bold text-center">
                                                {moment(
                                                    item.surat_perintah.hingga
                                                ).format("LL")}
                                            </p>
                                        </td>
                                        <td className="border-x">
                                            <p className="font-bold text-center">
                                                {moment(item.created_at).format(
                                                    "LL"
                                                )}
                                            </p>
                                        </td>
                                        <td className="border-x">
                                            <div className="flex justify-center">
                                                <p
                                                    className={`uppercase font-bold py-1 px-2 rounded-md text-center text-white ${
                                                        item?.feedback
                                                            ?.status_id === 1
                                                            ? "bg-blue-500"
                                                            : item?.feedback
                                                                  ?.status_id ===
                                                              2
                                                            ? "bg-green-500"
                                                            : item?.feedback
                                                                  ?.status_id ===
                                                              3
                                                            ? "bg-red-500"
                                                            : "bg-blue-500"
                                                    }`}
                                                >
                                                    {item?.feedback?.status
                                                        ?.name_status
                                                        ? item?.feedback?.status
                                                              ?.name_status
                                                        : "panding"}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
