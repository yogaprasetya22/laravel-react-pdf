import Layout from "@/Layouts/Layout";
import React, { useEffect } from "react";
// import { useState } from "react";
import FormLaporan from "@/Components/Form/FormLaporan";
import MyPdf, { tw } from "@/Components/Pdf";
import { useForm } from "@inertiajs/react";
import { BlobProvider, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");
import axios from "axios";
import ConfirmationModal from "@/Components/modal/ConfirmationModal";

export default function Laporan({ title, auth }) {
    const {
        data: formValues,
        setData: setFormValues,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        pertimbangan: "",
        dasar: [""],
        kepada: {
            nama: "",
            pangkat: "",
            nrp: "",
            jabatan: "",
            keterangan: "",
        },
        untuk: [""],
    });

    const [pagePdf, setPagePdf] = React.useState(1);

    // Ref untuk mengakses fungsi print pada komponen PdfTamplate
    let pdRef = React.useRef();
    let printButtonRef = React.useRef();
    let kiriRef = React.useRef();
    let kananRef = React.useRef();
    if (!pdRef.current) {
        if (printButtonRef.current) {
            printButtonRef.current.click();
        }
    }

    useEffect(() => {
        const kananElement = kananRef.current;
        const kiriElement = kiriRef.current;

        if (!kananElement || !kiriElement) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.target === kananElement) {
                    kiriElement.style.height = `${entry.contentRect.height}px`;
                }
            }
        });

        resizeObserver.observe(kananElement);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    const handleFormChange = (values) => {
        setFormValues(values); // Set nilai formValues sesuai dengan values yang diperbarui
    };

    const sendToServer = (data, blob) => {
        window.my_modal_1.close();
        const formData = new FormData();
        // formData.append("pertimbangan", pertimbangan);
        // formData.append("dasar", JSON.stringify(dasar));
        // formData.append("kepada", JSON.stringify(kepada));
        // formData.append("untuk", JSON.stringify(untuk));
        formData.append("uuid", auth?.user.uuid);
        formData.append("file", blob);
        axios
            .post("/post/laporan", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    reset();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <Layout title={title} user={auth?.user}>
            <div className="flex flex-row gap-2 relative">
                <div
                    className="h-[600px] border border-black bg-white w-1/3 flex flex-col gap-5 p-2 py-10 overflow-y-auto hover:overflow_type overflow"
                    ref={kiriRef}
                >
                    <div className="flex-grow">
                        <FormLaporan
                            formValues={formValues}
                            handleFormChange={handleFormChange}
                        />
                    </div>
                </div>
                <div className="w-full" ref={kananRef}>
                    {/* <PdfTamplate data={formValues} pdfRef={pdRef} /> */}
                    <PDFViewer width="100%" height="600px" showToolbar={false}>
                        <MyPdf data={formValues} setPagePdf />
                    </PDFViewer>
                </div>
            </div>
            <div className="flex justify-end fixed bottom-2 right-0">
                {/* <PDFDownloadLink
                    document={<MyPdf data={formValues} />}
                    fileName={`laporan-${auth?.user.name}-${moment().format(
                        "DD-MM-YYYY"
                    )}.pdf`}
                    // download={false}
                >
                    {({ blob, url, loading, error }) => (
                        <button
                            onClick={() => sendToServer(formValues, blob)}
                            className="btn hover:bg-green-400 rounded-md bg-blue-500 font-extrabold text-white "
                        >
                            {loading ? "Loading document..." : "Simpan"}
                        </button>
                    )}
                </PDFDownloadLink> */}
                <BlobProvider
                    document={<MyPdf data={formValues} />}
                    fileName={`laporan-${auth?.user.name}-${moment().format(
                        "DD-MM-YYYY"
                    )}.pdf`}
                >
                    {({ blob, url, loading, error }) => (
                        <>
                            <button
                                onClick={() => {
                                    window.my_modal_1.show();
                                }}
                                className="btn hover:bg-blue-400/85 rounded-md bg-blue-500 font-extrabold text-white "
                            >
                                {loading ? "Loading document..." : "Simpan"}
                            </button>
                            <ConfirmationModal
                                message="Apakah anda yakin ingin menyimpan laporan?"
                                onConfirm={() => sendToServer(formValues, blob)}
                            />
                            {/* <dialog
                                id="my_modal_1"
                                className="modal backdrop-blur-sm"
                            >
                                <div className="modal-box w-2/4 max-w-5xl overflow">
                                    <div className=" w-full flex flex-col gap-5">
                                        <div className="text-center">
                                            <h1 className="text-2xl font-bold">
                                                Konfirmasi
                                            </h1>
                                        </div>
                                        <div className="text-center">
                                            <p>
                                                Apakah anda yakin ingin
                                                menyimpan laporan?
                                            </p>
                                        </div>
                                        <div className="flex justify-center gap-5">
                                            <button
                                                onClick={() =>
                                                    sendToServer(
                                                        formValues,
                                                        blob
                                                    )
                                                }
                                                className="btn bg-blue-500 hover:bg-blue-400/85 text-white font-bold px-4 py-2 rounded"
                                            >
                                                Ya
                                            </button>
                                            <button
                                                onClick={() =>
                                                    window.my_modal_1.close()
                                                }
                                                className="btn bg-red-500 hover:bg-red-400/85 text-white font-bold px-4 py-2 rounded"
                                            >
                                                Tidak
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </dialog> */}
                        </>
                    )}
                </BlobProvider>
            </div>
        </Layout>
    );
}
