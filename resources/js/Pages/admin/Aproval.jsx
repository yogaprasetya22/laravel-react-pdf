import Tabel from "@/Components/Tabel";
import Layout from "@/Layouts/Layout";
import React from "react";

export default function Aproval({ data }) {
    return (
        <Layout>
            <Tabel data={data} />
        </Layout>
    );
}
