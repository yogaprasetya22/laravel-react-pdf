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
            sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        },
    },
});

export default function MyPdf({ data, tamplate }) {
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
                        <Text
                            style={tw(
                                "text-sm text-center font-bold uppercase"
                            )}
                        >
                            {tamplate?.title === "" ? "..." : tamplate?.title}
                        </Text>
                        <Text
                            style={tw(
                                "text-sm font-bold text-center uppercase"
                            )}
                        >
                            {data?.polres === "" ? "..." : data?.polres}
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
                                Nomor Sprin /
                                {data?.nomor_sprin?.kode
                                    ? data?.nomor_sprin?.kode
                                    : "..."}
                                /
                                {data?.nomor_sprin?.unit
                                    ? data?.nomor_sprin?.unit
                                    : "..."}
                                /
                                {data?.nomor_sprin?.kategori
                                    ? data?.nomor_sprin?.kategori
                                    : "..."}
                                /
                                {data?.nomor_sprin?.tahun
                                    ? data?.nomor_sprin?.tahun
                                    : "..."}
                                .
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={tw("w-full flex flex-col gap-3")}>
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
                                    {data?.pertimbangan && data?.pertimbangan}.
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
                            <View style={tw("w-full flex flex-col pt-1")}>
                                {data?.dasar[0] != "" &&
                                    data?.dasar.map((item, index) => (
                                        <View
                                            key={index}
                                            style={tw(
                                                "w-full px-2 py-1 flex flex-row"
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
                                                {item}.
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
                            <View style={tw("w-full flex flex-col")}>
                                {data?.kepada.length &&
                                    data?.kepada.map((item, index) => (
                                        <View
                                            style={tw(
                                                "w-full px-2 py-1 flex flex-row"
                                            )}
                                            key={index}
                                        >
                                            {" "}
                                            <Text style={tw("text-sm pr-1")}>
                                                {index + 1}.
                                            </Text>
                                            <Text
                                                style={tw(
                                                    "text-sm text-justify uppercase"
                                                )}
                                            >
                                                {item.nama != "" && (
                                                    <>
                                                        {item.nama},{" "}
                                                        {item.pangkat},{" "}
                                                        {item.nrp},{" "}
                                                        {item.jabatan},{" "}
                                                        {item.keterangan}.
                                                    </>
                                                )}
                                            </Text>
                                        </View>
                                    ))}
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
                            <View style={tw("w-full flex flex-col pt-1")}>
                                {data?.untuk.length && (
                                    <>
                                        {data?.untuk[0] != "" &&
                                            data?.untuk.map((item, index) => (
                                                <View
                                                    key={index}
                                                    style={tw(
                                                        "w-full px-2 py-1 flex flex-row"
                                                    )}
                                                >
                                                    <Text
                                                        style={tw(
                                                            "text-sm pr-1"
                                                        )}
                                                    >
                                                        {index + 1}.
                                                    </Text>
                                                    <Text
                                                        style={tw(
                                                            "text-sm text-justify pr-4"
                                                        )}
                                                    >
                                                        {item}.
                                                    </Text>
                                                </View>
                                            ))}
                                        <View
                                            style={tw(
                                                "w-full px-2 py-1 flex flex-row"
                                            )}
                                        >
                                            <Text style={tw("text-sm pr-1")}>
                                                {data?.untuk.length + 1}.
                                            </Text>
                                            <Text
                                                style={tw(
                                                    "text-sm text-justify pr-4"
                                                )}
                                            >
                                                surat perintah ini berlaku sejak
                                                tanggal{" "}
                                                {data?.surat_perintah.berlaku
                                                    ? moment(
                                                          data?.surat_perintah
                                                              .berlaku
                                                      ).format("LL")
                                                    : "..."}{" "}
                                                s.d.{" "}
                                                {data?.surat_perintah.berlaku
                                                    ? moment(
                                                          data?.surat_perintah
                                                              .hingga
                                                      ).format("LL")
                                                    : "..."}{" "}
                                                .
                                            </Text>
                                        </View>
                                        <View
                                            style={tw(
                                                "w-full px-2 py-1 flex flex-row"
                                            )}
                                        >
                                            <Text style={tw("text-sm pr-1")}>
                                                {data?.untuk.length + 2}.
                                            </Text>
                                            <Text
                                                style={tw(
                                                    "text-sm text-justify pr-4"
                                                )}
                                            >
                                                melaksanakan perintah ini dengan
                                                seksama dan penuh tanggung
                                                jawab.
                                            </Text>
                                        </View>
                                        <View
                                            style={tw(
                                                "w-full px-2 py-1 flex flex-row"
                                            )}
                                        >
                                            <Text style={tw("text-sm pr-1")}>
                                                {data?.untuk.length + 3}.
                                            </Text>
                                            <Text
                                                style={tw(
                                                    "text-sm text-justify pr-4"
                                                )}
                                            >
                                                sebelum dan sesudah melaksanakan
                                                surat perintah ini melaporkan
                                                kepada{" "}
                                                {tamplate?.tujuan_laporan === ""
                                                    ? "..."
                                                    : tamplate?.tujuan_laporan}{" "}
                                                Polres{" "}
                                                {tamplate?.polres === ""
                                                    ? "..."
                                                    : tamplate?.polres}
                                                .
                                            </Text>
                                        </View>
                                    </>
                                )}{" "}
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
                        <View style={tw("flex flex-col items-start gap-14")}>
                            <View style={tw("flex flex-col gap-1")}>
                                <Text style={tw("text-sm font-bold")}>
                                    Dikeluarkan di :{" "}
                                    {tamplate?.polres === ""
                                        ? "..."
                                        : tamplate?.polres}
                                </Text>
                                <View style={tw("flex flex-row gap-3")}>
                                    <Text style={tw("text-sm font-bold")}>
                                        Pada Tanggal :
                                    </Text>
                                    <Text style={tw("text-sm font-bold")}>
                                        {moment(new Date()).format("LL")}
                                    </Text>
                                </View>
                                <Text
                                    style={tw("border-b border-black")}
                                ></Text>
                                <Text style={tw("text-sm font-bold uppercase")}>
                                    {tamplate?.nama_unit === ""
                                        ? "..."
                                        : tamplate?.nama_unit}
                                </Text>
                            </View>
                            {/* {url && (
                                <View
                                    style={tw(
                                        "w-full flex justify-center items-center"
                                    )}
                                >
                                    <Image
                                        src={url}
                                        style={tw("w-[7rem] h-[3.5rem]")}
                                    />
                                </View>
                            )} */}
                            <View style={tw("flex flex-col gap-1")}>
                                <View style={tw("flex flex-col")}>
                                    <Text style={tw("text-sm font-bold")}>
                                        {tamplate?.pemimpin_unit === ""
                                            ? "..."
                                            : tamplate?.pemimpin_unit}
                                    </Text>
                                    <Text
                                        style={tw("border-b border-black")}
                                    ></Text>
                                </View>
                                <Text style={tw("text-sm font-bold")}>
                                    NRP.{" "}
                                    {tamplate?.nrp_pemimpin_unit === ""
                                        ? "..."
                                        : tamplate?.nrp_pemimpin_unit}
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
                                1.{" "}
                                {tamplate?.tembusan_1 === ""
                                    ? "..."
                                    : tamplate?.tembusan_1}
                            </Text>
                            <Text style={tw("text-sm font-bold text-center")}>
                                2.{" "}
                                {tamplate?.tembusan_2 === ""
                                    ? "..."
                                    : tamplate?.tembusan_2}
                            </Text>
                            <View style={tw("flex flex-col gap-1")}>
                                <Text
                                    style={tw("text-sm font-bold text-center")}
                                >
                                    3.{" "}
                                    {tamplate?.tembusan_3 === ""
                                        ? "..."
                                        : tamplate?.tembusan_3}
                                </Text>
                                <Text
                                    style={tw("border-b border-black")}
                                ></Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
}
