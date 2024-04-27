import Layout from "@/Layouts/Layout";
import SignatureCanvas from "react-signature-canvas";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import MyPdf from "@/Components/Pdf";
import { useState, useRef, useEffect } from "react";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");
import { useForm, router } from "@inertiajs/react";

export default function DetailFeedback({ data, tamplate, laporan }) {
    const [sign, setSign] = useState(null);
    const [url, setUrl] = useState(null);
    const {
        data: formatValue,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        feedback: "",
        laporan_uuid: laporan.uuid,
        url: "",
        status_id: "1",
    });

    useEffect(() => {
        setData({
            feedback: laporan?.feedback?.feedback || "",
            laporan_uuid: laporan?.uuid || "",
            url: laporan?.url || "",
            status_id: laporan?.feedback?.status_id || "1",
        });
    }, [data]);

    return (
        <Layout>
            <div className="w-full flex  flex-row gap-5 justify-between">
                <div className=" w-[60%] h-auto bg-white flex flex-col gap-5 p-5 shadow-md">
                    <div className="flex flex-row justify-between ">
                        <div className="flex flex-col gap-5">
                            <h1 className="text-2xl font-bold">
                                Detail Feedback
                            </h1>
                        </div>
                        <div className="flex flex-col gap-5">
                            <PDFDownloadLink
                                document={
                                    <MyPdf
                                        tamplate={tamplate}
                                        data={data}
                                        url={url}
                                    />
                                }
                                fileName="laporan.pdf"
                            >
                                {({ blob, url, loading, error }) => (
                                    <button className="btn hover:bg-blue-400/85 rounded-md bg-blue-500 font-extrabold text-white p-2 text-xs">
                                        {loading
                                            ? "Loading document..."
                                            : "Download Pdf"}
                                    </button>
                                )}
                            </PDFDownloadLink>
                        </div>
                    </div>
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-row gap-2">
                            <div className="flex flex-col gap-5 pr-10">
                                <p className="text-md">Nama</p>
                                <p className="text-md">Email</p>
                                <p className="text-md">No Telp</p>
                                <p className="text-md">Pangkat</p>
                                <p className="text-md">Jabatan</p>
                            </div>
                            <div className="flex flex-col gap-5">
                                <p className="text-md">:</p>
                                <p className="text-md">:</p>
                                <p className="text-md">:</p>
                                <p className="text-md">:</p>
                                <p className="text-md">:</p>
                            </div>
                            <div className="flex flex-col gap-5">
                                <p className="text-md truncate w-[10rem]">
                                    {data.user.user.name}
                                </p>
                                <p className="text-md truncate w-[10rem]">
                                    {data.user.user.email}
                                </p>
                                <p className="text-md">
                                    {data.user.user.no_telp}
                                </p>
                                <p className="text-md">{data.user.pangkat}</p>
                                <p className="text-md">{data.user.jabatan}</p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-3">
                            <div className="flex flex-col gap-5">
                                <p className="text-md">Nomor Sprin</p>
                                <p className="text-md">Berlaku</p>
                                <p className="text-md">Hingga</p>
                                <p className="text-md">Status</p>
                            </div>{" "}
                            <div className="flex flex-col gap-5">
                                <p className="text-md">:</p>
                                <p className="text-md">:</p>
                                <p className="text-md">:</p>
                                <p className="text-md">:</p>
                            </div>
                            <div className="flex flex-col gap-5">
                                <p className="text-md">
                                    {data.nomor_sprin.kode}/
                                    {data.nomor_sprin.unit}/
                                    {data.nomor_sprin.kategori}/
                                    {data.nomor_sprin.tahun}
                                </p>
                                <p className="text-md">
                                    {moment(data.surat_perintah.berlaku).format(
                                        "LL"
                                    )}
                                </p>
                                <p className="text-md">
                                    {moment(data.surat_perintah.hingga).format(
                                        "LL"
                                    )}
                                </p>
                                <p
                                    className={` p-1 text-center rounded-md text-white shadow-md ${
                                        data?.feedback?.status_id === 1
                                            ? "bg-blue-500"
                                            : data?.feedback?.status_id === 2
                                            ? "bg-green-500"
                                            : data?.feedback?.status_id === 3
                                            ? "bg-red-500"
                                            : "bg-blue-500"
                                    }`}
                                >
                                    {data?.feedback?.status?.name_status
                                        ? data?.feedback?.status?.name_status
                                        : "tertunda"}
                                </p>
                            </div>
                        </div>
                    </div>{" "}
                    <div className="w-full flex justify-end">
                        <div className="flex w-1/5 gap-3 justify-between">
                            <button
                                className="btn hover:bg-red-400/85 rounded-md bg-red-500 font-extrabold text-white"
                                onClick={() => router.visit("/feedback")}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
                <PDFViewer width="100%" height="600px" showToolbar={false}>
                    <MyPdf tamplate={tamplate} data={data} setPagePdf />
                </PDFViewer>
            </div>
        </Layout>
    );
}
