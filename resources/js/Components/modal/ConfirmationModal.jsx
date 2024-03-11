import React from "react";

export default function ConfirmationModal({ message, onConfirm }) {
    return (
        <dialog id="my_modal_1" className="modal backdrop-blur-sm">
            <div className="modal-box w-2/4 max-w-5xl overflow">
                <div className=" w-full flex flex-col gap-5">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Konfirmasi</h1>
                    </div>
                    <div className="text-center">
                        <p>{message}</p>
                    </div>
                    <div className="flex justify-center gap-5">
                        <button
                            onClick={() => onConfirm()}
                            className="btn bg-blue-500 hover:bg-blue-400/85 text-white font-bold px-4 py-2 rounded"
                        >
                            Ya
                        </button>
                        <button
                            onClick={() => window.my_modal_1.close()}
                            className="btn bg-red-500 hover:bg-red-400/85 text-white font-bold px-4 py-2 rounded"
                        >
                            Tidak
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
}
