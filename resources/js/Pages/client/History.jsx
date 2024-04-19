import TabelHistory from "@/Components/TabelHistory";
import Layout from "@/Layouts/Layout";
import React from "react";

export default function History({ data }) {
    return (
        <Layout>
            <TabelHistory data={data} />
        </Layout>
    );
}
