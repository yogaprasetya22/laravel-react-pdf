import Layout from "@/Layouts/Layout";
import React, { useEffect } from "react";
import FormLaporan from "@/Components/Form/FormLaporan";
import { useForm } from "@inertiajs/react";
import { BlobProvider, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");
import ConfirmationModal from "@/Components/modal/ConfirmationModal";
import MyPdf from "@/Components/Pdf";
import { toast } from "react-toastify";

export default function DetailHistory({ data, tamplate, auth }) {
    const {
        data: formValues,
        setData: setFormValues,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        nomor_sprin: {
            kode: "",
            unit: "",
            kategori: "",
            tahun: "",
        },
        pertimbangan: "",
        dasar: [""],
        kepada: [
            {
                nama: "",
                pangkat: "",
                nrp: "",
                jabatan: "",
                keterangan: "",
            },
        ],
        untuk: [""],
        surat_perintah: {
            berlaku: "",
            hingga: "",
        },
        uuid: data?.uuid,
    });

    React.useEffect(() => {
        setFormValues({
            nomor_sprin: {
                kode: data?.no_sprin.kode || "",
                unit: data?.no_sprin.unit || "",
                kategori: data?.no_sprin.kategori || "",
                tahun: data?.no_sprin.tahun || "",
            },
            pertimbangan: data?.pertimbangan.pertimbangan || "",
            dasar: data?.dasar.map((item) => item?.dasar) || [""],
            kepada: data?.kepada || [
                {
                    nama: "",
                    pangkat: "",
                    nrp: "",
                    jabatan: "",
                    keterangan: "",
                },
            ],
            untuk: data?.untuk.map((item) => item?.untuk) || [""],
            surat_perintah: {
                berlaku: data?.surat_perintah.berlaku || "",
                hingga: data?.surat_perintah.hingga || "",
            },
            uuid: data?.uuid,
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
        post(route("laporan.update"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast("Berhasil update laporan", {
                    toastId: "customId",
                });
            },
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
                        <FormLaporan
                            formValues={formValues}
                            handleFormChange={handleFormChange}
                        />
                    </div>
                </div>
                <div className="w-full" ref={kananRef}>
                    <PDFViewer width="100%" height="600px" showToolbar={false}>
                        <MyPdf
                            tamplate={tamplate}
                            data={formValues}
                            setPagePdf
                        />
                    </PDFViewer>
                </div>
            </div>
            <div className="flex justify-end fixed bottom-2 right-0">
                <BlobProvider
                    document={<MyPdf tamplate={tamplate} data={formValues} />}
                    fileName={`laporan-${auth?.user.name}-${moment().format(
                        "DD-MM-YYYY"
                    )}.pdf`}
                >
                    {({ blob, url, loading, error }) => (
                        <>
                            <button
                                onClick={() => {
                                    if (data.feedback.status_id === 2) {
                                        toast(
                                            `Maaf tidak bisa Update karna sudah ${data.feedback.status.name_status}`,
                                            {
                                                toastId: "customId",
                                            }
                                        );
                                    } else {
                                        window.my_modal_1.show();
                                    }
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
