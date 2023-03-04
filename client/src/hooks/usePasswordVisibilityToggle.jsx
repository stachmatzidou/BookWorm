import React, { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const usePasswordVisibilityToggle = () => {
    const [visibility, setVisibility] = useState(false);

    const InputType = visibility ? "text" : "password";

    const Icon = (
        <FontAwesomeIcon
            className="eye"
            icon={visibility ? faEyeSlash : faEye}
            onClick={() => setVisibility((visibility) => !visibility)}
        />
    );

    return [InputType, Icon];
};

export default usePasswordVisibilityToggle;
