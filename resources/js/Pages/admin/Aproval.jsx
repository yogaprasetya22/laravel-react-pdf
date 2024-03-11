import Tabel from "@/Components/Tabel";
import Layout from "@/Layouts/Layout";
import React from "react";

export default function Aproval({ title, auth, data }) {
    return (
        <Layout title={title} user={auth?.user}>
            <Tabel data={data} />
        </Layout>
    );
}
