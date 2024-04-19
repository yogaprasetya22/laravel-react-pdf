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

export default function PdfTamplate({ data, url }) {
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
                                "text-sm text-center font-bold uppercase text-green-600"
                            )}
                        >
                            {data?.title === "" ? "..." : data?.title}
                        </Text>
                        <Text
                            style={tw(
                                "text-sm font-bold text-center uppercase text-green-600"
                            )}
                        >
                            Polres {data?.polres === "" ? "..." : data?.polres}
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
                                __ client __
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
                                    __ client __
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
                                {new Array(1).fill(0).map((item, index) => (
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
                                            __ client __
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
                                {new Array(1).fill(0).map((item, index) => (
                                    <View style={tw("w-full p-2")} key={index}>
                                        <Text
                                            style={tw(
                                                "text-sm text-justify uppercase"
                                            )}
                                        >
                                            __ client __
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
                                {new Array(1).fill(0).map((item, index) => (
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
                                            __ client __
                                        </Text>
                                    </View>
                                ))}
                                <View
                                    style={tw("w-full px-2 py-1 flex flex-row")}
                                >
                                    <Text style={tw("text-sm pr-1")}>2.</Text>
                                    <Text
                                        style={tw("text-sm text-justify pr-4")}
                                    >
                                        surat perintah ini berlaku sejak tanggal{" "}
                                        __ client __ s.d. __ client __ .
                                    </Text>
                                </View>
                                <View
                                    style={tw("w-full px-2 py-1 flex flex-row")}
                                >
                                    <Text style={tw("text-sm pr-1")}>3.</Text>
                                    <Text
                                        style={tw("text-sm text-justify pr-4")}
                                    >
                                        melaksanakan perintah ini dengan seksama
                                        dan penuh tanggung jawab.
                                    </Text>
                                </View>
                                <View
                                    style={tw("w-full px-2 py-1 flex flex-row")}
                                >
                                    <Text style={tw("text-sm pr-1")}>4.</Text>
                                    <Text
                                        style={tw(
                                            "text-sm text-justify pr-4 text-green-600"
                                        )}
                                    >
                                        sebelum dan sesudah melaksanakan surat
                                        perintah ini melaporkan kepada{" "}
                                        {data?.tujuan_laporan === ""
                                            ? "..."
                                            : data?.tujuan_laporan}{" "}
                                        Polres{" "}
                                        {data?.polres === ""
                                            ? "..."
                                            : data?.polres}
                                        .
                                    </Text>
                                </View>
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
                        <View style={tw("flex flex-col items-start")}>
                            <View style={tw("flex flex-col gap-1")}>
                                <Text
                                    style={tw(
                                        "text-sm font-bold text-green-600"
                                    )}
                                >
                                    Dikeluarkan di :{" "}
                                    {data?.polres === "" ? "..." : data?.polres}
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
                                <Text
                                    style={tw(
                                        "text-sm font-bold uppercase text-green-600"
                                    )}
                                >
                                    {data?.nama_unit === ""
                                        ? "..."
                                        : data?.nama_unit}
                                </Text>
                            </View>
                            {url && (
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
                            )}
                            <View style={tw("flex flex-col gap-1")}>
                                <View style={tw("flex flex-col")}>
                                    <Text
                                        style={tw(
                                            "text-sm font-bold text-green-600"
                                        )}
                                    >
                                        {data?.pemimpin_unit === ""
                                            ? "..."
                                            : data?.pemimpin_unit}
                                    </Text>
                                    <Text
                                        style={tw("border-b border-black")}
                                    ></Text>
                                </View>
                                <Text
                                    style={tw(
                                        "text-sm font-bold text-green-600"
                                    )}
                                >
                                    {data?.nrp_pemimpin_unit === ""
                                        ? "..."
                                        : data?.nrp_pemimpin_unit}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={tw("flex justify-start -mt-[2.5rem]")}>
                        <View style={tw("flex flex-col items-start")}>
                            <Text style={tw("text-sm font-bold text-center")}>
                                TEMBUSAN
                            </Text>
                            <Text
                                style={tw(
                                    "text-sm font-bold text-center text-green-600"
                                )}
                            >
                                1.{" "}
                                {data?.tembusan_1 === ""
                                    ? "..."
                                    : data?.tembusan_1}
                            </Text>
                            <Text
                                style={tw(
                                    "text-sm font-bold text-center text-green-600"
                                )}
                            >
                                2.{" "}
                                {data?.tembusan_2 === ""
                                    ? "..."
                                    : data?.tembusan_2}
                            </Text>
                            <View style={tw("flex flex-col gap-1")}>
                                <Text
                                    style={tw(
                                        "text-sm font-bold text-center text-green-600"
                                    )}
                                >
                                    3.{" "}
                                    {data?.tembusan_3 === ""
                                        ? "..."
                                        : data?.tembusan_3}
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
