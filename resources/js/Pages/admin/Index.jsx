import Layout from "@/Layouts/Layout";
import { Link } from "@inertiajs/react";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function Index({ data: data_table }) {
    const [data, setData] = useState(data_table);
    const [hingga, setHingga] = useState(
        moment().format("YYYY-MM-DD").toString()
    );
    const [berlaku, setBerlaku] = useState(
        moment().format("YYYY-MM-DD").toString()
    );
    const [currentData, setCurrentData] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [Loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(5);

    useEffect(() => {
        setCurrentData(
            data_table.filter((item) => {
                return (
                    moment(item.surat_perintah.berlaku).format("YYYY-MM-DD") >=
                        berlaku &&
                    moment(item.surat_perintah.hingga).format("YYYY-MM-DD") <=
                        hingga
                );
            })
        );
    }, [data, berlaku, hingga]);

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
        // setDate(
        //     moment(filteredData[0].surat_perintah.berlaku).format("YYYY-MM-DD")
        // );
        setData(filteredData);
    };

    return (
        <Layout>
            <div className="flex flex-col gap-5">
                <div className="flex w-full justify-between gap-5">
                    <div className="w-full bg-pink-500/80 flex flex-row items-center text-white font-semibold text-lg rounded-md p-2 gap-4  shadow-md">
                        <div
                            className="bg-white py-5 p-2 flex flex-col justify-center items-center pr-6 shadow-2xl"
                            style={{
                                clipPath:
                                    "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
                            }}
                        >
                            <p className="text-md font-extrabold text-gray-500">
                                {moment(berlaku).format("YYYY")}
                            </p>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center ">
                            <p className="text-xs font-semibold text-white">
                                tahun ini
                            </p>
                            <p className="text-3xl font-semibold">
                                {
                                    data_table.filter(
                                        (item) =>
                                            moment(item.created_at).format(
                                                "YYYY"
                                            ) === moment(berlaku).format("YYYY")
                                    ).length
                                }
                            </p>
                        </div>
                    </div>
                    <div className="w-full bg-blue-500/80 flex flex-row items-center text-white font-semibold text-lg rounded-md p-2 gap-4  shadow-md">
                        <div
                            className="bg-white py-5 p-2 flex flex-col justify-center items-center pr-6 shadow-2xl"
                            style={{
                                clipPath:
                                    "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
                            }}
                        >
                            <p className="text-md font-extrabold text-gray-500 min-w-[7rem]">
                                {moment(berlaku).format("MMMM")}{" "}
                                {moment(berlaku).format("MMMM") !==
                                    moment(hingga).format("MMMM") && "/"}
                                {moment(berlaku).format("MMMM") ===
                                moment(hingga).format("MMMM")
                                    ? ""
                                    : moment(hingga).format("MMMM")}
                            </p>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center ">
                            <p className="text-xs font-semibold text-white">
                                bulan ini
                            </p>
                            <p className="text-3xl font-semibold">
                                {
                                    data_table.filter(
                                        (item) =>
                                            moment(item.created_at).format(
                                                "MMMM"
                                            ) === moment(berlaku).format("MMMM")
                                    ).length
                                }
                            </p>
                        </div>
                    </div>
                    <div className="w-full bg-yellow-500/80 flex flex-row items-center text-white font-semibold text-lg rounded-md p-2 gap-4  shadow-md">
                        <div
                            className="bg-white py-5 p-2 flex flex-col justify-center items-center pr-6 shadow-2xl"
                            style={{
                                clipPath:
                                    "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
                            }}
                        >
                            <p className="text-md font-extrabold text-gray-500 min-w-[8rem]">
                                {moment(berlaku).format("dddd") ===
                                moment().format("dddd")
                                    ? "Hari Ini"
                                    : moment(berlaku).format("dddd")}{" "}
                                {moment(berlaku).format("dddd") !==
                                    moment().format("dddd") && "/"}
                                {moment(berlaku).format("dddd") ===
                                moment().format("dddd")
                                    ? ""
                                    : moment(berlaku).format("DD")}
                            </p>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center ">
                            <p className="text-xs font-semibold text-white">
                                hari ini
                            </p>
                            <p className="text-3xl font-semibold">
                                {
                                    currentData.filter(
                                        (item) =>
                                            moment(item.created_at).format(
                                                "dddd"
                                            ) === moment(berlaku).format("dddd")
                                    ).length
                                }
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-white rounded-md shadow-md">
                    <div className="overflow-x-auto">
                        <div className="w-full flex justify-between gap-5">
                            <div className="flex gap-2 px-5 py-3 items-center">
                                {/* input type date */}
                                <label
                                    htmlFor="berlaku"
                                    className="flex flex-row items-center gap-2"
                                >
                                    <span>Berlaku :</span>
                                    <input
                                        id="berlaku"
                                        type="date"
                                        className="input input-bordered "
                                        value={berlaku}
                                        onChange={(e) =>
                                            setBerlaku(e.target.value)
                                        }
                                    />
                                </label>
                                <label
                                    htmlFor="hingga"
                                    className="flex flex-row items-center gap-2"
                                >
                                    <span>Hingga :</span>
                                    <input
                                        id="hingga"
                                        type="date"
                                        className="input input-bordered "
                                        value={hingga}
                                        onChange={(e) =>
                                            setHingga(e.target.value)
                                        }
                                    />
                                </label>
                                <div className="flex flex-row items-center justify-center gap-1">
                                    <input
                                        type="text"
                                        className="input input-bordered max-w-[10rem]"
                                        placeholder="Search"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                    <button
                                        className="btn"
                                        onClick={() => searchData()}
                                    >
                                        <i className="fas fa-search"></i>{" "}
                                    </button>
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
                            <thead className="bg-green-500">
                                <tr className="font-bold text-lg text-white">
                                    <th className="text-center">No Sprin</th>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Berlaku</th>
                                    <th className="text-center">Hingga</th>
                                    <th className="text-center">
                                        Tanggal Upload
                                    </th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">Detail</th>
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
                                                        : "tertunda"}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="border-x">
                                            <Link
                                                href={`/admin/detail/${item.uuid}`}
                                                className="btn btn-ghost btn-md "
                                            >
                                                <i className="text-green-500 text-xl fas fa-eye"></i>
                                            </Link>
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
