import React, { useEffect } from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FildArrayTextAreas } from "@/Components/Form/FormExample";

export default function FormLaporan({ formValues, handleFormChange }) {
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
                        nrp: Yup.string().required("NRP harus diisi"),
                        jabatan: Yup.string().required("Jabatan harus diisi"),
                        keterangan: Yup.string().required(
                            "Keterangan harus diisi"
                        ),
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
                            <label className="text-xl font-semibold">
                                Nomor Sprin
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
                        <hr />
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold">
                                Pertimbangan
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
                        <hr />
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold">
                                Dasar
                            </label>
                            <FieldArray name="dasar">
                                {({ push, remove }) => (
                                    <div className="flex flex-col gap-2">
                                        {values.dasar.map((_, index) => (
                                            <div
                                                className="flex flex-col gap-2 relative"
                                                key={index}
                                            >
                                                <div className="border-b border-gray-500"></div>
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
                        <hr />
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold">
                                Kepada
                            </label>
                            <FieldArray name="kepada">
                                {({ push, remove }) => (
                                    <div className="flex flex-col gap-2">
                                        {values.kepada.map((_, index) => (
                                            <div
                                                className="flex flex-col gap-2 relative"
                                                key={index}
                                            >
                                                <div className="border-b border-gray-500"></div>
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
                                                <div className="flex flex-col gap-2">
                                                    <Field
                                                        name={`kepada.${index}.nrp`}
                                                        type="text"
                                                        placeholder="NRP"
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
                                                    name={`kepada.${index}.keterangan`}
                                                    onChange={(e) =>
                                                        setFieldValue(
                                                            `kepada.${index}.keterangan`,
                                                            e.target.value
                                                        )
                                                    }
                                                    onBlur={(e) =>
                                                        setFieldValue(
                                                            `kepada.${index}.keterangan`,
                                                            e.target.value
                                                        )
                                                    }
                                                    value={
                                                        values.kepada[index]
                                                            .keterangan
                                                    }
                                                    placeholder="Keterangan"
                                                />
                                                <ErrorMessage
                                                    name={`kepada.${index}.keterangan`}
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
                                                    keterangan: "",
                                                })
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                )}
                            </FieldArray>
                        </div>
                        <hr />
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold">
                                Untuk
                            </label>
                            <FieldArray name="untuk">
                                {({ push, remove }) => (
                                    <div className="flex flex-col gap-2">
                                        {values.untuk.map((_, index) => (
                                            <div
                                                className="flex flex-col gap-2 relative"
                                                key={index}
                                            >
                                                <div className="border-b border-gray-500"></div>
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
                                                </button>
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
                        <hr />
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold">
                                Surat Perintah
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
