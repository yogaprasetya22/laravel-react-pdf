import React, { useEffect } from "react";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");

export default function PdfTamplate({ data }) {
    return (
        <div className="w-full py-5 pl-14 pr-10 flex flex-col gap-5 bg-white ">
            {/* heading */}
            <div className="w-full flex justify-start -ml-4">
                <div className="flex flex-col">
                    <div className="text-sm text-center font-bold max-w-[20rem]">
                        KEPOLISIAN NEGARA REPUBLIK INDONESIA DARAH BALI
                    </div>
                    <div className="text-sm font-bold  text-center">
                        RESOR BANDUNG
                    </div>
                    <div className="border-b border-black "></div>
                </div>
            </div>

            {/* header */}
            <div className="w-full flex  justify-center ">
                <div className="flex flex-col items-center gap-2">
                    <img
                        src="logo_polri.png"
                        alt="logo_polri"
                        className="w-[5rem] h-[5rem]"
                    />
                    <div className="flex flex-col">
                        <div className="text-center font-bold text-sm ">
                            SURAT PERINTAH
                        </div>
                        <div className="border-b border-black "></div>
                        <div className="text-center font-bold text-sm">
                            Nomor Sprin /177/vI/TUK.7.1.2/2023
                        </div>
                    </div>
                </div>
            </div>

            {/* body */}
            <div className="table w-full space-y-3">
                <div className="table-row-group">
                    <div className="table-row">
                        <div className="table-cell p-1 font-bold text-sm">
                            Pertimbangan
                        </div>
                        <div className="table-cell p-2 font-bold text-sm pr-7">
                            :
                        </div>
                        <div className="table-cell text-sm font-bold text-justify">
                            {data.pertimbangan && data.pertimbangan}
                        </div>
                    </div>
                </div>
                <div className="table-row-group">
                    <div className="table-row">
                        <div className="table-cell p-1 font-bold text-sm">
                            Dasar
                        </div>
                        <div className="table-cell p-2 font-bold text-sm pr-7">
                            :
                        </div>
                        <div className="flex flex-col gap-2">
                            {data.dasar[0] != "" &&
                                data.dasar.map((item, index) => (
                                    <ul
                                        key={index}
                                        className="flex flex-row gap-2"
                                    >
                                        <li className="text-sm font-bold text-justify">
                                            {index + 1}.
                                        </li>
                                        <li className="text-sm font-bold text-justify">
                                            {item}
                                        </li>
                                    </ul>
                                ))}
                        </div>
                    </div>
                </div>
                <div className="table-row-group">
                    <div className="table-row">
                        <div className="table-cell p-1 font-bold text-sm"></div>
                        <div className="table-cell p-1 font-bold text-sm"></div>
                        <div className="table-cell p-1 font-bold text-sm text-center pr-32">
                            DIPERINTAHKAN
                        </div>
                    </div>
                </div>
                <div className="table-row-group">
                    <div className="table-row">
                        <div className="table-cell p-1 font-bold text-sm">
                            Kepada
                        </div>
                        <div className="table-cell p-2 font-bold text-sm pr-7">
                            :
                        </div>
                        <div className="table-cell text-sm font-bold text-justify uppercase">
                            {data.kepada.nama && (
                                <>
                                    {data.kepada.nama},{data.kepada.pangkat},
                                    {data.kepada.nrp},{data.kepada.jabatan},
                                    {data.kepada.keterangan}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="table-row-group">
                    <div className="table-row">
                        <div className="table-cell p-1 font-bold text-sm">
                            Untuk
                        </div>
                        <div className="table-cell p-2 font-bold text-sm pr-7">
                            :
                        </div>
                        <div className="flex flex-col gap-2">
                            {data.untuk[0] != "" &&
                                data.untuk.map((item, index) => (
                                    <ul
                                        key={index}
                                        className="flex flex-row gap-2"
                                    >
                                        <li className="text-sm font-bold text-justify">
                                            {index + 1}.
                                        </li>
                                        <li className="text-sm font-bold text-justify">
                                            {item}
                                        </li>
                                    </ul>
                                ))}
                        </div>
                    </div>
                </div>
                <div className="table-row-group">
                    <div className="table-row">
                        <div className="table-cell p-1 font-bold text-sm">
                            Selesai
                        </div>
                    </div>
                </div>
            </div>

            {/* footer */}
            <div className="flex justify-end">
                <div className="flex flex-col items-start gap-5">
                    <div className="flex flex-col gap-1">
                        <div className="text-sm font-bold">
                            Dikeluarkan di : Bandung
                        </div>
                        <div className="text-sm font-bold">
                            Pada Tanggal :{" "}
                            <span className="underline">
                                {moment(data.tanggal).format("LL")}
                            </span>
                        </div>
                    </div>
                    <div className="text-sm font-bold uppercase">
                        Kepala Kepolisian Resor Bandung
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-sm font-bold">
                            <span className="underline">
                                Irjen Pol. Drs. Asep Saepudin
                            </span>
                        </div>
                        <div className="text-sm font-bold">NRP. 123456789</div>
                    </div>
                </div>
            </div>
            <div className="flex justify-start -mt-[5rem]">
                <div className="flex flex-col items-start">
                    <div className="text-sm font-bold text-center">
                        TEMBUSAN
                    </div>
                    <div className="text-sm font-bold text-center">
                        1. Kapolres Bandung
                    </div>
                    <div className="text-sm font-bold text-center">
                        2. Kabag Ops Polres Bandung
                    </div>
                    <div className="text-sm font-bold text-center">
                        3. Kasi Propam Polres Bandung
                    </div>
                </div>
            </div>
        </div>
    );
}
