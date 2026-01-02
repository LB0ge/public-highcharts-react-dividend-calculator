import * as React from 'react';
import PropTypes from 'prop-types';
import { NumberField as BaseNumberField } from '@base-ui-components/react/number-field';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';

/**
 * This component is a placeholder for FormControl to correctly set the shrink label state on SSR.
 */
function SSRInitialFilled() {
    return null;
}
SSRInitialFilled.muiName = 'Input';

function NumberField({
    id: idProp,
    label,
    error,
    size = 'medium',
    onKeyDown,
    unit,
    value,
    onChange,
    ...other
}) {
    let id = React.useId();
    if (idProp) {
        id = idProp;
    }

    return (
        <BaseNumberField.Root
            // min={0}
            allowWheelScrub
            // Fully controlled: value from parent (context)
            value={value ?? null}
            onValueChange={(val) => {
                // NOTE: signature is (value, eventDetails), not (event, value)
                if (!onChange) return;

                if (val == null || Number.isNaN(val)) {
                    onChange('');
                } else {
                    onChange(val);
                }
            }}
            {...other}
            render={(props, state) => (
                <FormControl
                    size={size}
                    ref={props.ref}
                    disabled={state.disabled}
                    required={state.required}
                    error={error}
                    variant="outlined"
                >
                    {props.children}
                </FormControl>
            )}
        >
            <SSRInitialFilled {...other} />
            <InputLabel htmlFor={id}>{label}</InputLabel>

            <BaseNumberField.Input
                onKeyDown={onKeyDown}
                id={id}
                render={(props, state) => (
                    <OutlinedInput
                        label={label}
                        inputRef={props.ref}
                        // Let Base UI drive the input value
                        value={state.inputValue}
                        onBlur={props.onBlur}
                        onChange={props.onChange}
                        onKeyUp={props.onKeyUp}
                        onKeyDown={props.onKeyDown}
                        onFocus={props.onFocus}
                        slotProps={{
                            input: props
                        }}
                        endAdornment={
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                {unit && (
                                    <InputAdornment
                                        position="start"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            px: 0,
                                            color: 'text.secondary',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {unit}
                                    </InputAdornment>
                                )}

                                <InputAdornment
                                    position="end"
                                    sx={{
                                        flexDirection: 'column',
                                        maxHeight: 'unset',
                                        alignSelf: 'stretch',
                                        borderLeft: '1px solid',
                                        borderColor: 'divider',
                                        ml: 0,
                                        '& button': {
                                            py: 0,
                                            flex: 1,
                                            borderRadius: 0.5
                                        }
                                    }}
                                >
                                    <BaseNumberField.Increment
                                        render={
                                            <IconButton
                                                size={size}
                                                aria-label="Increase"
                                            />
                                        }
                                    >
                                        <KeyboardArrowUpIcon
                                            fontSize={size}
                                            sx={{
                                                transform: 'translateY(2px)'
                                            }}
                                        />
                                    </BaseNumberField.Increment>

                                    <BaseNumberField.Decrement
                                        render={
                                            <IconButton
                                                size={size}
                                                aria-label="Decrease"
                                            />
                                        }
                                    >
                                        <KeyboardArrowDownIcon
                                            fontSize={size}
                                            sx={{
                                                transform: 'translateY(-2px)'
                                            }}
                                        />
                                    </BaseNumberField.Decrement>
                                </InputAdornment>
                            </Box>
                        }
                        sx={{ pr: 0 }}
                    />
                )}
            />
        </BaseNumberField.Root>
    );
}

NumberField.propTypes = {
    error: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.node,
    size: PropTypes.oneOf(['medium', 'small']),
    unit: PropTypes.node,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func
};

export default NumberField;
