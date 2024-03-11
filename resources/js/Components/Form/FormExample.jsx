import { useEffect, useRef } from "react";

export const FildArrayTextAreas = ({
    name,
    value,
    placeholder,
    onChange,
    onBlur,
    errors,
    touched,
}) => {
    const textAreaRef = useRef(null);
    const resizeTextArea = () => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height =
            textAreaRef.current.scrollHeight + "px";
    };
    useEffect(() => {
        resizeTextArea();
    }, [value]);
    return (
        <textarea
            ref={textAreaRef}
            id={name}
            rows={1}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            className="border-2 border-gray-200 py-2 w-full overflow-y-hidden"
        ></textarea>
    );
};
