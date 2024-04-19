import Layout from "@/Layouts/Layout";
import React from "react";

export default function Index({ title, auth }) {
    return (
        <Layout title={title} user={auth?.user}>
            <div className="w-full flex flex-col gap-5">
                <iframe
                    src="http://127.0.0.1:8000/storage/laporan/2024-03-10/laporan-client-10-03-2024.pdf"
                    width="50%"
                    height="500px"
                    className="overflow_type"
                ></iframe>
            </div>
        </Layout>
    );
}
