import React, { useEffect } from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FildArrayTextAreas } from "@/Components/Form/FormExample";

export default function FormLaporan({ formValues, handleFormChange }) {
    return (
        <Formik
            validationSchema={Yup.object().shape({
                title: Yup.string().required("Title is required"),
                polres: Yup.string().required("Polres is required"),
                tujuan_laporan: Yup.string().required(
                    "Tujuan Laporan is required"
                ),
                dikeluarkan: Yup.string().required("Dikeluarkan is required"),
                nama_unit: Yup.string().required("Nama Unit is required"),
                pemimpin_unit: Yup.string().required(
                    "Pemimpin Unit is required"
                ),
                nrp_pemimpin_unit: Yup.string().required(
                    "NRP Pemimpin Unit is required"
                ),
                tembusan_1: Yup.string().required("Tembusan 1 is required"),
                tembusan_2: Yup.string().required("Tembusan 2 is required"),
                tembusan_3: Yup.string().required("Tembusan 3 is required"),
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
                                Title
                            </label>
                            <FildArrayTextAreas
                                name="title"
                                onChange={(e) =>
                                    setFieldValue("title", e.target.value)
                                }
                                onBlur={(e) =>
                                    setFieldValue("title", e.target.value)
                                }
                                value={values.title}
                                placeholder="Enter Title"
                            />
                            <ErrorMessage
                                name="title"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold">
                                Polres
                            </label>
                            <FildArrayTextAreas
                                name="polres"
                                onChange={(e) =>
                                    setFieldValue("polres", e.target.value)
                                }
                                onBlur={(e) =>
                                    setFieldValue("polres", e.target.value)
                                }
                                value={values.polres}
                                placeholder="Enter Polres"
                            />
                            <ErrorMessage
                                name="polres"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold">
                                Tujuan Laporan
                            </label>
                            <FildArrayTextAreas
                                name="tujuan_laporan"
                                onChange={(e) =>
                                    setFieldValue(
                                        "tujuan_laporan",
                                        e.target.value
                                    )
                                }
                                onBlur={(e) =>
                                    setFieldValue(
                                        "tujuan_laporan",
                                        e.target.value
                                    )
                                }
                                value={values.tujuan_laporan}
                                placeholder="Enter Tujuan Laporan"
                            />
                            <ErrorMessage
                                name="tujuan_laporan"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold">
                                Dikeluarkan
                            </label>
                            <FildArrayTextAreas
                                name="dikeluarkan"
                                onChange={(e) =>
                                    setFieldValue("dikeluarkan", e.target.value)
                                }
                                onBlur={(e) =>
                                    setFieldValue("dikeluarkan", e.target.value)
                                }
                                value={values.dikeluarkan}
                                placeholder="Enter Dikeluarkan"
                            />
                            <ErrorMessage
                                name="dikeluarkan"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold">
                                Nama Unit
                            </label>
                            <FildArrayTextAreas
                                name="nama_unit"
                                onChange={(e) =>
                                    setFieldValue("nama_unit", e.target.value)
                                }
                                onBlur={(e) =>
                                    setFieldValue("nama_unit", e.target.value)
                                }
                                value={values.nama_unit}
                                placeholder="Enter Nama Unit"
                            />
                            <ErrorMessage
                                name="nama_unit"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold">
                                Pemimpin Unit
                            </label>
                            <FildArrayTextAreas
                                name="pemimpin_unit"
                                onChange={(e) =>
                                    setFieldValue(
                                        "pemimpin_unit",
                                        e.target.value
                                    )
                                }
                                onBlur={(e) =>
                                    setFieldValue(
                                        "pemimpin_unit",
                                        e.target.value
                                    )
                                }
                                value={values.pemimpin_unit}
                                placeholder="Enter Pemimpin Unit"
                            />
                            <ErrorMessage
                                name="pemimpin_unit"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold">
                                NRP Pemimpin Unit
                            </label>
                            <FildArrayTextAreas
                                name="nrp_pemimpin_unit"
                                onChange={(e) =>
                                    setFieldValue(
                                        "nrp_pemimpin_unit",
                                        e.target.value
                                    )
                                }
                                onBlur={(e) =>
                                    setFieldValue(
                                        "nrp_pemimpin_unit",
                                        e.target.value
                                    )
                                }
                                value={values.nrp_pemimpin_unit}
                                placeholder="Enter NRP Pemimpin Unit"
                            />
                            <ErrorMessage
                                name="nrp_pemimpin_unit"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold">
                                Tembusan 1
                            </label>
                            <FildArrayTextAreas
                                name="tembusan_1"
                                onChange={(e) =>
                                    setFieldValue("tembusan_1", e.target.value)
                                }
                                onBlur={(e) =>
                                    setFieldValue("tembusan_1", e.target.value)
                                }
                                value={values.tembusan_1}
                                placeholder="Enter Tembusan 1"
                            />
                            <ErrorMessage
                                name="tembusan_1"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold">
                                Tembusan 2
                            </label>
                            <FildArrayTextAreas
                                name="tembusan_2"
                                onChange={(e) =>
                                    setFieldValue("tembusan_2", e.target.value)
                                }
                                onBlur={(e) =>
                                    setFieldValue("tembusan_2", e.target.value)
                                }
                                value={values.tembusan_2}
                                placeholder="Enter Tembusan 2"
                            />
                            <ErrorMessage
                                name="tembusan_2"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xl font-semibold">
                                Tembusan 3
                            </label>
                            <FildArrayTextAreas
                                name="tembusan_3"
                                onChange={(e) =>
                                    setFieldValue("tembusan_3", e.target.value)
                                }
                                onBlur={(e) =>
                                    setFieldValue("tembusan_3", e.target.value)
                                }
                                value={values.tembusan_3}
                                placeholder="Enter Tembusan 3"
                            />
                            <ErrorMessage
                                name="tembusan_3"
                                component="div"
                                className="text-red-500"
                            />
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
