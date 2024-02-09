import MyPdf from "@/Components/Pdf";
import Layout from "@/Layouts/Layout";
import React from "react";
import {
    PDFDownloadLink,
    PDFViewer,
} from "@react-pdf/renderer";

export default function Index({ title, auth }) {
    return (
        <Layout title={title} user={auth?.user}>
            <div className="w-full flex flex-col gap-5">
                <PDFViewer width="100%" height="800px">
                    <MyPdf />
                </PDFViewer>
                <PDFDownloadLink
                    document={<MyPdf />}
                    fileName={`laporan-${new Date().toLocaleDateString()}.pdf`}
                >
                    {({ blob, url, loading, error }) =>
                        loading ? "Loading document..." : "Download now!"
                    }
                </PDFDownloadLink>
            </div>
        </Layout>
    );
}
