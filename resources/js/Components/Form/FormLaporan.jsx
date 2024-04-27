import React, { useEffect } from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FildArrayTextAreas } from "@/Components/Form/FormExample";

export default function FormLaporan({
    formValues,
    handleFormChange,
    no_sprin,
}) {
    return (
        <Formik
            validationSchema={Yup.object().shape({
                nomor_sprin: Yup.object().shape({
                    kode: Yup.string().required("Kode harus diisi"),
                    unit: Yup.string().required("Unit harus diisi"),
                    kategori: Yup.string().required("Kategori harus diisi"),
                    tahun: Yup.string().required("Tahun harus diisi"),
                }),
                pertimbangan: Yup.string().required("Pertimbangan harus diisi"),
                dasar: Yup.array().of(
                    Yup.string().required("Dasar harus diisi")
                ),
                kepada: Yup.array().of(
                    Yup.object().shape({
                        nama: Yup.string().required("Nama harus diisi"),
                        pangkat: Yup.string().required("Pangkat harus diisi"),
                        picked: Yup.string().required("Picked harus diisi"),
                        nrp: Yup.string().required("NRP/NIP harus diisi"),
                        jabatan: Yup.string().required("Jabatan harus diisi"),
                        tugas: Yup.string().required("Tugas harus diisi"),
                    })
                ),
                untuk: Yup.array().of(
                    Yup.string().required("Untuk harus diisi")
                ),
                surat_perintah: Yup.object().shape({
                    berlaku: Yup.string().required("Berlaku harus diisi"),
                    hingga: Yup.string().required("Hingga harus diisi"),
                }),
            })}
            initialValues={formValues}
            enableReinitialize
            onSubmit={handleFormChange}
        >
            {({ values, setFieldValue }) => (
                <Form className="w-full flex gap-5 flex-col">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold pb-1">
                                Nomor Sprin{" "}
                                <span className="text-red-500 text-xl">*</span>
                            </label>
                            <div className="flex flex-col gap-2">
                                <Field
                                    name="nomor_sprin.kode"
                                    type="text"
                                    placeholder="Kode"
                                    className="border-2 border-gray-200 py-2"
                                />
                                <ErrorMessage
                                    name="nomor_sprin.kode"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Field
                                    name="nomor_sprin.unit"
                                    type="text"
                                    placeholder="Unit"
                                    className="border-2 border-gray-200 py-2"
                                />
                                <ErrorMessage
                                    name="nomor_sprin.unit"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Field
                                    name="nomor_sprin.kategori"
                                    type="text"
                                    placeholder="Kategori"
                                    className="border-2 border-gray-200 py-2"
                                />
                                <ErrorMessage
                                    name="nomor_sprin.kategori"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Field
                                    name="nomor_sprin.tahun"
                                    type="text"
                                    placeholder="Tahun"
                                    className="border-2 border-gray-200 py-2"
                                />
                                <ErrorMessage
                                    name="nomor_sprin.tahun"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>
                        </div>
                        <div className="divider">
                            <span className="text-teal-600/80">DAN</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold pb-1">
                                Pertimbangan{" "}
                                <span className="text-red-500 text-xl">*</span>
                            </label>
                            <FildArrayTextAreas
                                name="pertimbangan"
                                onChange={(e) =>
                                    setFieldValue(
                                        "pertimbangan",
                                        e.target.value
                                    )
                                }
                                onBlur={(e) =>
                                    setFieldValue(
                                        "pertimbangan",
                                        e.target.value
                                    )
                                }
                                value={values.pertimbangan}
                                placeholder="Enter Pertimbangan"
                            />
                            <ErrorMessage
                                name="pertimbangan"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div className="divider">
                            <span className="text-teal-600/80">DAN</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold pb-1">
                                Dasar{" "}
                                <span className="text-red-500 text-xl">*</span>
                            </label>
                            <FieldArray name="dasar">
                                {({ push, remove }) => (
                                    <div className="flex flex-col gap-5">
                                        {values.dasar.map((_, index) => (
                                            <div
                                                className="flex flex-col gap-2 relative"
                                                key={index}
                                            >
                                                <div className="border-b border-gray-400"></div>
                                                <FildArrayTextAreas
                                                    name={`dasar.${index}`}
                                                    onChange={(e) =>
                                                        setFieldValue(
                                                            `dasar.${index}`,
                                                            e.target.value
                                                        )
                                                    }
                                                    onBlur={(e) =>
                                                        setFieldValue(
                                                            `dasar.${index}`,
                                                            e.target.value
                                                        )
                                                    }
                                                    value={values.dasar[index]}
                                                    placeholder="Enter Dasar"
                                                />
                                                <ErrorMessage
                                                    name={`dasar.${index}`}
                                                    component="div"
                                                    className="text-red-500"
                                                />
                                                <button
                                                    type="button"
                                                    className="px-2 bg-red-500 text-white rounded-md absolute right-0 -top-3"
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                >
                                                    -
                                                </button>
                                                <span className="px-2 bg-white text-teal-500/80 border-r border-t border-l rounded-md absolute left-0 -top-4 text-lg">
                                                    {index + 1}
                                                </span>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="p-1 bg-green-500 text-white rounded-md"
                                            onClick={() => push("")}
                                        >
                                            +
                                        </button>
                                    </div>
                                )}
                            </FieldArray>
                        </div>
                        <div className="divider">
                            <span className="text-teal-600/80">DAN</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold pb-1">
                                Kepada{" "}
                                <span className="text-red-500 text-xl">*</span>
                            </label>
                            <FieldArray name="kepada">
                                {({ push, remove }) => (
                                    <div className="flex flex-col gap-8">
                                        {values.kepada.map((_, index) => (
                                            <div
                                                className="flex flex-col gap-2 relative"
                                                key={index}
                                            >
                                                <div className="border-b border-gray-400"></div>
                                                <div className="flex flex-col gap-2">
                                                    <Field
                                                        name={`kepada.${index}.nama`}
                                                        type="text"
                                                        placeholder="Nama"
                                                        className="border-2 border-gray-200 py-2"
                                                    />
                                                    <ErrorMessage
                                                        name={`kepada.${index}.nama`}
                                                        component="div"
                                                        className="text-red-500"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <Field
                                                        name={`kepada.${index}.pangkat`}
                                                        type="text"
                                                        placeholder="Pangkat"
                                                        className="border-2 border-gray-200 py-2"
                                                    />
                                                    <ErrorMessage
                                                        name={`kepada.${index}.pangkat`}
                                                        component="div"
                                                        className="text-red-500"
                                                    />
                                                </div>
                                                <div className="flex flex-row gap-2 items-center justify-center">
                                                    <label className="flex flex-row gap-1 items-center">
                                                        <Field
                                                            type="radio"
                                                            name={`kepada.${index}.picked`}
                                                            value="NRP"
                                                            className="radio radio-success"
                                                        />
                                                        <span className="text-xs">
                                                            NRP
                                                        </span>
                                                    </label>
                                                    /
                                                    <label className="flex flex-row gap-1 items-center">
                                                        <Field
                                                            type="radio"
                                                            name={`kepada.${index}.picked`}
                                                            value="NIP"
                                                            className="radio radio-success"
                                                        />
                                                        <span className="text-xs">
                                                            NIP
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <Field
                                                        name={`kepada.${index}.nrp`}
                                                        type="text"
                                                        placeholder={`${
                                                            values.kepada[index]
                                                                .picked ===
                                                            "NRP"
                                                                ? "NRP"
                                                                : "NIP"
                                                        }`}
                                                        className="border-2 border-gray-200 py-2"
                                                    />
                                                    <ErrorMessage
                                                        name={`kepada.${index}.nrp`}
                                                        component="div"
                                                        className="text-red-500"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <Field
                                                        name={`kepada.${index}.jabatan`}
                                                        type="text"
                                                        placeholder="Jabatan"
                                                        className="border-2 border-gray-200 py-2"
                                                    />
                                                    <ErrorMessage
                                                        name={`kepada.${index}.jabatan`}
                                                        component="div"
                                                        className="text-red-500"
                                                    />
                                                </div>
                                                <FildArrayTextAreas
                                                    name={`kepada.${index}.tugas`}
                                                    onChange={(e) =>
                                                        setFieldValue(
                                                            `kepada.${index}.tugas`,
                                                            e.target.value
                                                        )
                                                    }
                                                    onBlur={(e) =>
                                                        setFieldValue(
                                                            `kepada.${index}.tugas`,
                                                            e.target.value
                                                        )
                                                    }
                                                    value={
                                                        values.kepada[index]
                                                            .tugas
                                                    }
                                                    placeholder="Tugas"
                                                />
                                                <ErrorMessage
                                                    name={`kepada.${index}.tugas`}
                                                    component="div"
                                                    className="text-red-500"
                                                />
                                                <button
                                                    type="button"
                                                    className="px-2 bg-red-500 text-white rounded-md absolute right-0 -top-3"
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                >
                                                    -
                                                </button>{" "}
                                                <span className="px-2 bg-white text-teal-500/80 border-r border-t border-l rounded-md absolute left-0 -top-4 text-lg">
                                                    {index + 1}
                                                </span>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="p-1 bg-green-500 text-white rounded-md"
                                            onClick={() =>
                                                push({
                                                    nama: "",
                                                    pangkat: "",
                                                    nrp: "",
                                                    jabatan: "",
                                                    tugas: "",
                                                })
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                )}
                            </FieldArray>
                        </div>
                        {values.kepada.length > 4 && (
                            <>
                                <div className="divider">
                                    <span className="text-teal-600/80">
                                        DAN
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xl font-semibold pb-1">
                                        Lampiran Tugas{" "}
                                        <span className="text-red-500 text-xl">
                                            *
                                        </span>
                                    </label>
                                    <FildArrayTextAreas
                                        name="lampiran"
                                        onChange={(e) =>
                                            setFieldValue(
                                                "lampiran",
                                                e.target.value
                                            )
                                        }
                                        onBlur={(e) =>
                                            setFieldValue(
                                                "lampiran",
                                                e.target.value
                                            )
                                        }
                                        value={values.lampiran}
                                        placeholder="Enter Lampiran"
                                    />
                                    <ErrorMessage
                                        name="lampiran"
                                        component="div"
                                        className="text-red-500"
                                    />
                                </div>
                            </>
                        )}
                        <div className="divider">
                            <span className="text-teal-600/80">DAN</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold pb-1">
                                Untuk{" "}
                                <span className="text-red-500 text-xl">*</span>
                            </label>
                            <FieldArray name="untuk">
                                {({ push, remove }) => (
                                    <div className="flex flex-col gap-5">
                                        {values.untuk.map((_, index) => (
                                            <div
                                                className="flex flex-col gap-2 relative"
                                                key={index}
                                            >
                                                <div className="border-b border-gray-400"></div>
                                                <FildArrayTextAreas
                                                    name={`untuk.${index}`}
                                                    onChange={(e) =>
                                                        setFieldValue(
                                                            `untuk.${index}`,
                                                            e.target.value
                                                        )
                                                    }
                                                    onBlur={(e) =>
                                                        setFieldValue(
                                                            `untuk.${index}`,
                                                            e.target.value
                                                        )
                                                    }
                                                    value={values.untuk[index]}
                                                    placeholder="Enter Untuk"
                                                />
                                                <ErrorMessage
                                                    name={`untuk.${index}`}
                                                    component="div"
                                                    className="text-red-500"
                                                />
                                                <button
                                                    type="button"
                                                    className="px-2 bg-red-500 text-white rounded-md absolute right-0 -top-3 "
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                >
                                                    -
                                                </button>{" "}
                                                <span className="px-2 bg-white text-teal-500/80 border-r border-t border-l rounded-md absolute left-0 -top-4 text-lg">
                                                    {index + 1}
                                                </span>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="p-1 bg-green-500 text-white rounded-md"
                                            onClick={() => push("")}
                                        >
                                            +
                                        </button>
                                    </div>
                                )}
                            </FieldArray>
                        </div>
                        <div className="divider">
                            <span className="text-teal-600/80">DAN</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold pb-1">
                                Surat Perintah{" "}
                                <span className="text-red-500 text-xl">*</span>
                            </label>
                            <div className="flex flex-col gap-2">
                                <Field
                                    name="surat_perintah.berlaku"
                                    type="date"
                                    placeholder="Berlaku"
                                    className="border-2 border-gray-200 py-2"
                                />
                                <ErrorMessage
                                    name="surat_perintah.berlaku"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>
                            <label className="text-md text-center font-semibold">
                                s.d
                            </label>
                            <div className="flex flex-col gap-2">
                                <Field
                                    name="surat_perintah.hingga"
                                    type="date"
                                    placeholder="Hingga"
                                    className="border-2 border-gray-200 py-2"
                                />
                                <ErrorMessage
                                    name="surat_perintah.hingga"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" fixed right-[0] bottom-[10%] z-50">
                        <button
                            className="btn hover:bg-green-400/85 rounded-md bg-green-500 font-extrabold text-white "
                            type="submit"
                            // disabled={isSubmitting}
                        >
                            Update Laporan
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
