import Layout from "@/Layouts/Layout";
import React, { useEffect } from "react";
import FormTamplate from "@/Components/Form/FormTamplate";
import PdfTamplate from "@/Components/PdfTamplate";
import { useForm } from "@inertiajs/react";
import { BlobProvider, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");
import ConfirmationModal from "@/Components/modal/ConfirmationModal";

export default function Tamplate({ auth, data }) {
    const {
        data: formValues,
        setData: setFormValues,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        title: "",
        polres: "",
        tujuan_laporan: "",
        dikeluarkan: "",
        nama_unit: "",
        pemimpin_unit: "",
        nrp_pemimpin_unit: "",
        tembusan_1: "",
        tembusan_2: "",
        tembusan_3: "",
    });

    useEffect(() => {
        setFormValues({
            title: data?.title || "",
            polres: data?.polres || "",
            tujuan_laporan: data?.tujuan_laporan || "",
            dikeluarkan: data?.dikeluarkan || "",
            nama_unit: data?.nama_unit || "",
            pemimpin_unit: data?.pemimpin_unit || "",
            nrp_pemimpin_unit: data?.nrp_pemimpin_unit || "",
            tembusan_1: data?.tembusan_1 || "",
            tembusan_2: data?.tembusan_2 || "",
            tembusan_3: data?.tembusan_3 || "",
        });
    }, [data]);

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
        formData.append("file", blob);
        setFormValues({ ...formValues, file: formData });
        post(route("admin.store_tamplate"), {
            // preserveScroll: true,
            // onSuccess: () => {
            //     reset();
            // },
        });
    };
    return (
        <Layout>
            <div className="flex flex-row gap-2 relative -m-4">
                <div
                    className="h-[600px] border border-black bg-white w-1/3 flex flex-col gap-5 p-2 py-10 overflow-y-auto hover:overflow_type overflow"
                    ref={kiriRef}
                >
                    <div className="flex-grow">
                        <FormTamplate
                            formValues={formValues}
                            handleFormChange={handleFormChange}
                        />
                    </div>
                </div>
                <div className="w-full" ref={kananRef}>
                    <PDFViewer width="100%" height="600px" showToolbar={false}>
                        <PdfTamplate data={formValues} setPagePdf />
                    </PDFViewer>
                </div>
            </div>
            <div className="flex justify-end fixed bottom-2 right-0">
                <BlobProvider
                    document={<PdfTamplate data={formValues} />}
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
                        </>
                    )}
                </BlobProvider>
            </div>
        </Layout>
    );
}
