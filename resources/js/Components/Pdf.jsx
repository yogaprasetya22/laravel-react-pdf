import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import LogoPolri from "../../../public/logo_polri.png";
import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");
import { createTw } from "react-pdf-tailwind";

export const tw = createTw({
    theme: {
        fontFamily: {
            sans: ["Comic Sans"],
        },
    },
});

export default function MyPdf({ data }) {

    return (
        <Document
            // onRender={(blob) => {
            //     console.log(blob._INTERNAL__LAYOUT__DATA_.children);
            // }}
        >
            <Page
                size="A4"
                style={tw(
                    "w-full py-7 pl-14 pr-10 flex flex-col gap-5 bg-white"
                )}
            >
                <View style={tw("w-full flex justify-start -ml-4")}>
                    <View style={tw("flex flex-col max-w-[20rem]")}>
                        <Text style={tw("text-sm text-center font-bold")}>
                            KEPOLISIAN NEGARA REPUBLIK INDONESIA DARAH BALI
                        </Text>
                        <Text style={tw("text-sm font-bold text-center")}>
                            RESOR BANDUNG
                        </Text>
                        <Text style={tw("border-b border-black")}></Text>
                    </View>
                </View>
                <View style={tw("w-full flex justify-center")}>
                    <View style={tw("flex flex-col items-center gap-2")}>
                        <Image
                            src={LogoPolri}
                            style={tw("w-[6rem] h-[6rem]")}
                        />
                        <View style={tw("flex flex-col gap-2 items-center")}>
                            <Text style={tw("text-sm text-center font-bold")}>
                                SURAT PERINTAH
                            </Text>
                            <Text
                                style={tw(
                                    "text-sm text-center font-bold border-t border-black pt-2"
                                )}
                            >
                                Nomor Sprin /177/vI/TUK.7.1.2/
                                {moment().format("YYYY")}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={tw("w-full flex flex-col gap-1")}>
                    <View style={tw("w-full flex flex-col gap-2")}>
                        <View style={tw("flex flex-row")}>
                            <View style={tw("w-[8rem] px-1 py-2")}>
                                <Text style={tw("text-sm")}>Pertimbangan</Text>
                            </View>
                            <View style={tw("w-3 py-2 px-1")}>
                                <Text style={tw("text-sm")}>:</Text>
                            </View>
                            <View style={tw("w-full p-2")}>
                                <Text style={tw("text-sm text-justify")}>
                                    {data.pertimbangan && data.pertimbangan}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={tw("w-full flex flex-col gap-2")}>
                        <View style={tw("flex flex-row")}>
                            <View style={tw("w-[8rem] px-1 py-2")}>
                                <Text style={tw("text-sm")}>Dasar</Text>
                            </View>
                            <View style={tw("w-3 py-2 px-1")}>
                                <Text style={tw("text-sm")}>:</Text>
                            </View>
                            <View style={tw("w-full flex flex-col")}>
                                {data.dasar[0] != "" &&
                                    data.dasar.map((item, index) => (
                                        <View
                                            key={index}
                                            style={tw(
                                                "w-full p-2 flex flex-row"
                                            )}
                                        >
                                            <Text style={tw("text-sm pr-1")}>
                                                {index + 1}.
                                            </Text>
                                            <Text
                                                style={tw(
                                                    "text-sm text-justify pr-4"
                                                )}
                                            >
                                                {item}
                                            </Text>
                                        </View>
                                    ))}
                            </View>
                        </View>
                    </View>
                    <View style={tw("w-full flex justify-center py-2")}>
                        <View style={tw("flex flex-col items-center")}>
                            <Text style={tw("text-sm text-center font-bold")}>
                                DIPERINTAHKAN
                            </Text>
                        </View>
                    </View>
                    <View style={tw("w-full flex flex-col gap-2")}>
                        <View style={tw("flex flex-row")}>
                            <View style={tw("w-[8rem] px-1 py-2")}>
                                <Text style={tw("text-sm")}>Kepada</Text>
                            </View>
                            <View style={tw("w-3 py-2 px-1")}>
                                <Text style={tw("text-sm")}>:</Text>
                            </View>
                            <View style={tw("w-full p-2")}>
                                <Text
                                    style={tw("text-sm text-justify uppercase")}
                                >
                                    {data.kepada.nama && (
                                        <>
                                            {data.kepada.nama},{" "}
                                            {data.kepada.pangkat},{" "}
                                            {data.kepada.nrp},{" "}
                                            {data.kepada.jabatan},{" "}
                                            {data.kepada.keterangan}
                                        </>
                                    )}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={tw("w-full flex flex-col gap-2")}>
                        <View style={tw("flex flex-row")}>
                            <View style={tw("w-[8rem] px-1 py-2")}>
                                <Text style={tw("text-sm")}>Untuk</Text>
                            </View>
                            <View style={tw("w-3 py-2 px-1")}>
                                <Text style={tw("text-sm")}>:</Text>
                            </View>
                            <View style={tw("w-full flex flex-col")}>
                                {data.untuk[0] != "" &&
                                    data.untuk.map((item, index) => (
                                        <View
                                            key={index}
                                            style={tw(
                                                "w-full p-2 flex flex-row"
                                            )}
                                        >
                                            <Text style={tw("text-sm pr-1")}>
                                                {index + 1}.
                                            </Text>
                                            <Text
                                                style={tw(
                                                    "text-sm text-justify pr-4"
                                                )}
                                            >
                                                {item}
                                            </Text>
                                        </View>
                                    ))}
                            </View>
                        </View>
                    </View>
                    <View style={tw("w-full flex flex-col gap-2")}>
                        <View style={tw("flex flex-row")}>
                            <View style={tw("w-[8rem] px-1 py-2")}>
                                <Text style={tw("text-sm")}>Selesai</Text>
                            </View>
                        </View>
                    </View>
                    <View style={tw("flex w-full flex-row justify-end pt-4")}>
                        <View style={tw("flex flex-col items-start gap-5")}>
                            <View style={tw("flex flex-col gap-1")}>
                                <Text style={tw("text-sm font-bold")}>
                                    Dikeluarkan di : Bandung
                                </Text>
                                <View style={tw("flex flex-row gap-3")}>
                                    <Text style={tw("text-sm font-bold")}>
                                        Pada Tanggal :
                                    </Text>
                                    <Text
                                        style={tw(
                                            "underline text-sm font-bold"
                                        )}
                                    >
                                        {moment(new Date()).format("LL")}
                                    </Text>
                                </View>
                            </View>
                            <Text style={tw("text-sm font-bold uppercase")}>
                                Kepala Kepolisian Resor Bandung
                            </Text>
                            <View style={tw("flex flex-col gap-1")}>
                                <View style={tw("text-sm font-bold")}>
                                    <Text style={tw("underline")}>
                                        Irjen Pol. Drs. Asep Saepudin
                                    </Text>
                                </View>
                                <Text style={tw("text-sm font-bold")}>
                                    NRP. 123456789
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={tw("flex justify-start -mt-[2.5rem]")}>
                        <View style={tw("flex flex-col items-start")}>
                            <Text style={tw("text-sm font-bold text-center")}>
                                TEMBUSAN
                            </Text>
                            <Text style={tw("text-sm font-bold text-center")}>
                                1. Kapolres Bandung
                            </Text>
                            <Text style={tw("text-sm font-bold text-center")}>
                                2. Kabag Ops Polres Bandung
                            </Text>
                            <Text
                                style={tw(
                                    "text-sm font-bold text-center underline"
                                )}
                            >
                                3. Kasi Propam Polres Bandung
                            </Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
}
