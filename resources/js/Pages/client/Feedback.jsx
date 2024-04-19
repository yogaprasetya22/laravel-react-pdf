import TabelFeedback from "@/Components/TabelFeedback";
import Layout from "@/Layouts/Layout";
import React from "react";

export default function Feedback({ data }) {
    return (
        <Layout>
            <TabelFeedback data={data} />
        </Layout>
    );
}
