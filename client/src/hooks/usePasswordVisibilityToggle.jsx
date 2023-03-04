import React, { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RenderInBrowser from "react-render-in-browser";


const usePasswordVisibilityToggle = () => {
    const [visibility, setVisibility] = useState(false);

    const InputType = visibility ? "text" : "password";

    const Icon = (
        <RenderInBrowser except edge>
            <FontAwesomeIcon
                className="eye"
                icon={visibility ? faEyeSlash : faEye}
                onClick={() => setVisibility((visibility) => !visibility)}
            />
        </RenderInBrowser>
    );

    return [InputType, Icon];
};

export default usePasswordVisibilityToggle;
