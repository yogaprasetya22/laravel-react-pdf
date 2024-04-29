import Layout from "@/Layouts/Layout";
import SignatureCanvas from "react-signature-canvas";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import MyPdf from "@/Components/Pdf";
import { useState, useRef, useEffect } from "react";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");
import { router, useForm, usePage } from "@inertiajs/react";

export default function DetailAproval({ data, tamplate, status, laporan }) {
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

    const textAreaRef = useRef(null);
    const resizeTextArea = () => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height =
            textAreaRef.current.scrollHeight + "px";
    };
    useEffect(() => {
        resizeTextArea();
    }, [formatValue.feedback]);

    const handleClear = () => {
        sign.clear();
        setUrl("");
    };
    const handleGenerate = () => {
        setUrl(sign.getTrimmedCanvas().toDataURL("image/png"));
    };
    const handleUpdate = () => {
        setData("url", url);
        post(route("admin.aproval.post"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setUrl("");
            },
        });
    };
    return (
        <Layout>
            <div className="w-full flex  flex-row gap-5 justify-between">
                <div className=" w-[60%] h-auto bg-white flex flex-col gap-5 p-5 shadow-md">
                    <div className="flex flex-row justify-between ">
                        <div className="flex flex-col gap-5">
                            <h1 className="text-2xl font-bold">
                                Detail Aproval
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
                            </div>{" "}
                            <div className="flex flex-col gap-5">
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
                            </div>
                        </div>
                    </div>
                    {/* <div className="w-full flex flex-col">
                        <div className="border-2">
                            <SignatureCanvas
                                penColor="black"
                                canvasProps={{
                                    width: 500,
                                    height: 200,
                                    className: "sigCanvas",
                                }}
                                ref={(ref) => {
                                    setSign(ref);
                                }}
                            />{" "}
                        </div>
                        <div className="flex gap-3 w-full justify-between pt-1">
                            <div className="flex gap-3">
                                <button
                                    className="btn hover:bg-teal-400/85 rounded-md bg-teal-500 font-extrabold text-white"
                                    onClick={handleUpdate}
                                >
                                    Sumbit
                                </button>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    className="btn hover:bg-blue-400/85 rounded-md bg-blue-500 font-extrabold text-white"
                                    onClick={handleClear}
                                >
                                    Clear
                                </button>
                                <button
                                    className="btn hover:bg-green-400/85 rounded-md bg-green-500 font-extrabold text-white"
                                    onClick={handleGenerate}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div> */}
                    <div className="flex flex-row gap-5">
                        <select
                            name="status_id"
                            id="status_id"
                            value={formatValue.status_id}
                            className="border border-gray-300 rounded-md p-2 w-1/2"
                            onChange={(e) => {
                                setData("status_id", e.target.value);
                            }}
                        >
                            {status.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name_status}
                                </option>
                            ))}
                        </select>
                        <textarea
                            ref={textAreaRef}
                            name="feedback"
                            id="feedback"
                            rows={1}
                            value={formatValue.feedback}
                            onChange={(e) => {
                                setData("feedback", e.target.value);
                            }}
                            className="border-2 border-gray-300 rounded-md py-2 w-full overflow-y-hidden"
                            placeholder="Feedback"
                        ></textarea>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="flex w-1/5 gap-3 justify-between">
                            <button
                                className="btn hover:bg-yellow-400/85 rounded-md bg-yellow-500 font-extrabold text-white"
                                onClick={() =>
                                    router.visit(
                                        `/admin/aproval/update/${laporan.uuid}`
                                    )
                                }
                            >
                                update
                            </button>
                        </div>
                        <div className="w-full flex justify-end gap-5">
                            <div className="flex w-1/5 gap-3 justify-between">
                                <button
                                    className="btn hover:bg-red-400/85 rounded-md bg-red-500 font-extrabold text-white"
                                    onClick={() =>
                                        router.visit("/admin/aproval")
                                    }
                                >
                                    Back
                                </button>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    className="btn hover:bg-green-400/85 rounded-md bg-green-500 font-extrabold text-white"
                                    onClick={handleUpdate}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <PDFViewer width="100%" height="600px" showToolbar={false}>
                    <MyPdf
                        tamplate={tamplate}
                        data={data}
                        url={url}
                        setPagePdf
                    />
                </PDFViewer>
            </div>
        </Layout>
    );
}
