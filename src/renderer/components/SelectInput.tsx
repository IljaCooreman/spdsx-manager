import * as React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

interface SelectInputProps {
    label: string;
    options: { key: number; value: string }[];
    handleChange: (value: number) => any;
    selectedValue: number;
}

const SelectInput: React.FunctionComponent<SelectInputProps> = ({
    label,
    options,
    selectedValue,
    handleChange
}) => {
    const onChange = (e: any) => {
        handleChange(e.target.value);
    };
    return (
        <FormControl
            // variant="outlined"
            style={{
                minWidth: '110px',
                margin: '12px',
                flexGrow: 1
            }}
        >
            <InputLabel id={`outlined-input-${label}`}>{label}</InputLabel>
            <Select
                labelId={`outlined-input-${label}`}
                id="demo-controlled-open-select"
                value={selectedValue}
                onChange={onChange}
                label={label}
            >
                {options.map(({ key, value }) => {
                    return (
                        <MenuItem key={key} value={key}>
                            {value}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default SelectInput;
