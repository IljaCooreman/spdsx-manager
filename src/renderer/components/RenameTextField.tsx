import * as React from 'react';
import { TextField } from '@material-ui/core';

interface RenameTextField {
    handleRenameBlur: (newName: string) => void;
    initialName: string;
}

const RenameTextField: React.FunctionComponent<RenameTextField> = ({
    handleRenameBlur,
    initialName
}) => {
    const inputRef = React.useRef();

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        handleRenameBlur(e.target.value);
    };

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            inputRef.current.focus();
        }, 0);

        return () => {
            clearTimeout(timeout);
        };
    }, [inputRef]);

    return (
        <form>
            <TextField
                id="change-name"
                defaultValue={initialName}
                inputRef={inputRef}
                onBlur={handleBlur}
                inputProps={{ maxLength: 12 }}
            />
        </form>
    );
};

export default RenameTextField;
