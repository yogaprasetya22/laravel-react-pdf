import PdfTamplate from "@/Components/PdfTamplate";
import Layout from "@/Layouts/Layout";
import React, { useEffect } from "react";
import { useState } from "react";
import ReactToPrint from "react-to-print";
import Laporan from "@/Components/Form/Laporan";
import MyPdf, { tw } from "@/Components/Pdf";
import { useForm } from "@inertiajs/react";
import { BlobProvider, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");
import axios from "axios";
// post.laporan;
export default function Index({ title, auth }) {
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
    let pdRef = React.useRef();
    let printButtonRef = React.useRef();
    let kiriRef = React.useRef();
    let kananRef = React.useRef();
    if (!pdRef.current) {
        if (printButtonRef.current) {
            console.log(pdRef);
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
        const { pertimbangan, dasar, kepada, untuk } = data;
        const formData = new FormData();
        formData.append("pertimbangan", pertimbangan);
        formData.append("dasar", JSON.stringify(dasar));
        formData.append("kepada", JSON.stringify(kepada));
        formData.append("untuk", JSON.stringify(untuk));
        formData.append("file", blob);
        formData.append(
            "fileName",
            `laporan-${auth?.user.name}-${moment().format("DD-MM-YYYY")}.pdf`
        );

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
            });
    };
    return (
        <Layout title={title} user={auth?.user}>
            <div className="flex flex-row gap-2 relative">
                <div
                    className="border border-black bg-white w-1/3 flex flex-col gap-5 p-2 py-10 overflow-y-auto overflow_type"
                    ref={kiriRef}
                >
                    <div className="flex-grow">
                        <Laporan
                            formValues={formValues}
                            handleFormChange={handleFormChange}
                        />
                    </div>
                </div>
                <div className="w-full" ref={kananRef}>
                    {/* <PdfTamplate data={formValues} pdfRef={pdRef} /> */}
                    <PDFViewer width="100%" height="800px" showToolbar={false}>
                        <MyPdf data={formValues} />
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
                        <button
                            onClick={() => sendToServer(formValues, blob)}
                            className="btn hover:bg-green-400 rounded-md bg-blue-500 font-extrabold text-white "
                        >
                            {loading ? "Loading document..." : "Simpan"}
                        </button>
                    )}
                </BlobProvider>
            </div>
        </Layout>
    );
}
