import React, { useEffect } from "react";
import {
    Formik,
    Field,
    Form,
    FieldArray,
    ErrorMessage,
    useFormik,
} from "formik";
import * as Yup from "yup";
import { FildArrayTextAreas } from "@/Components/Form/FormExample";

export default function FormLaporan({ formValues, handleFormChange }) {
    return (
        <Formik
            validationSchema={Yup.object().shape({
                pertimbangan: Yup.string().required("Pertimbangan harus diisi"),
                dasar: Yup.array().of(
                    Yup.string().required("Dasar harus diisi")
                ),
                kepada: Yup.object().shape({
                    nama: Yup.string().required("Nama harus diisi"),
                    pangkat: Yup.string().required("Pangkat harus diisi"),
                    nrp: Yup.string().required("NRP harus diisi"),
                    jabatan: Yup.string().required("Jabatan harus diisi"),
                    keterangan: Yup.string().required("Keterangan harus diisi"),
                }),
                untuk: Yup.array().of(
                    Yup.string().required("Untuk harus diisi")
                ),
            })}
            initialValues={formValues}
            enableReinitialize
            onSubmit={handleFormChange}
        >
            {({ values, setFieldValue }) => (
                <Form className="w-full flex gap-5 flex-col">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label>Pertimbangan</label>
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
                                placeholder="Pertimbangan"
                            />
                            <ErrorMessage
                                name="pertimbangan"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Dasar</label>
                            <FieldArray name="dasar">
                                {({ push, remove }) => (
                                    <div className="flex flex-col gap-2">
                                        {values.dasar.map((_, index) => (
                                            <div
                                                className="flex flex-col gap-2 relative"
                                                key={index}
                                            >
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
                                                    placeholder="Dasar"
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
                        <div className="flex flex-col gap-2">
                            <label>Kepada</label>
                            <div className="flex flex-col gap-2">
                                <FildArrayTextAreas
                                    name="kepada.nama"
                                    onChange={(e) =>
                                        setFieldValue(
                                            "kepada.nama",
                                            e.target.value
                                        )
                                    }
                                    onBlur={(e) =>
                                        setFieldValue(
                                            "kepada.nama",
                                            e.target.value
                                        )
                                    }
                                    value={values.kepada.nama}
                                    placeholder="Nama"
                                />
                                <ErrorMessage
                                    name="kepada.nama"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <FildArrayTextAreas
                                    name="kepada.pangkat"
                                    onChange={(e) =>
                                        setFieldValue(
                                            "kepada.pangkat",
                                            e.target.value
                                        )
                                    }
                                    onBlur={(e) =>
                                        setFieldValue(
                                            "kepada.pangkat",
                                            e.target.value
                                        )
                                    }
                                    value={values.kepada.pangkat}
                                    placeholder="Pangkat"
                                />
                                <ErrorMessage
                                    name="kepada.pangkat"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <FildArrayTextAreas
                                    name="kepada.nrp"
                                    onChange={(e) =>
                                        setFieldValue(
                                            "kepada.nrp",
                                            e.target.value
                                        )
                                    }
                                    onBlur={(e) =>
                                        setFieldValue(
                                            "kepada.nrp",
                                            e.target.value
                                        )
                                    }
                                    value={values.kepada.nrp}
                                    placeholder="NRP"
                                />
                                <ErrorMessage
                                    name="kepada.nrp"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <FildArrayTextAreas
                                    name="kepada.jabatan"
                                    onChange={(e) =>
                                        setFieldValue(
                                            "kepada.jabatan",
                                            e.target.value
                                        )
                                    }
                                    onBlur={(e) =>
                                        setFieldValue(
                                            "kepada.jabatan",
                                            e.target.value
                                        )
                                    }
                                    value={values.kepada.jabatan}
                                    placeholder="Jabatan"
                                />
                                <ErrorMessage
                                    name="kepada.jabatan"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <FildArrayTextAreas
                                    name="kepada.keterangan"
                                    onChange={(e) =>
                                        setFieldValue(
                                            "kepada.keterangan",
                                            e.target.value
                                        )
                                    }
                                    onBlur={(e) =>
                                        setFieldValue(
                                            "kepada.keterangan",
                                            e.target.value
                                        )
                                    }
                                    value={values.kepada.keterangan}
                                    placeholder="Keterangan"
                                />
                                <ErrorMessage
                                    name="kepada.keterangan"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Untuk</label>
                            <FieldArray name="untuk">
                                {({ push, remove }) => (
                                    <div className="flex flex-col gap-2">
                                        {values.untuk.map((_, index) => (
                                            <div
                                                className="flex flex-col gap-2 relative"
                                                key={index}
                                            >
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
                                                    placeholder="Untuk"
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
