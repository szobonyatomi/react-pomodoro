import React from "react";
import {MdClose} from "react-icons/md";

const MODAL_STYLES = {
    position: "fixed",
    width: "80%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fafafa",
    padding: "40px",
    zIndex: 1000,
    textAlign: "center",
    borderRadius: "10px",
    fontSize: "2em",
};

const OVERLAY_STYLE = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
    opacity: 0.5,
    zIndex: 1000,
};
export default function Modal({open, children, onClose}) {
    if (!open) return null;
    return (
        <>
            <div style={OVERLAY_STYLE}> </div>
            <div className="modal" style={MODAL_STYLES}>
                <p onClick={onClose} className=" closeBtn btn">
                    <MdClose />
                </p>
                {children}
            </div>
        </>
    );
}
