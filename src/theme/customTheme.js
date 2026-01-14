import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#8d56c0',
            light: '#af89d3',
            dark: '#633c86',
            contrastText: '#fff'
        },
        secondary: {
            main: '#3B82F6',
            light: '#60A5FA',
            dark: '#2563EB',
            contrastText: '#fff'
        },
        success: {
            main: '#10B981',
            light: '#6EE7B7',
            dark: '#059669'
        },
        warning: {
            main: '#F59E0B',
            light: '#FBBF24',
            dark: '#D97706'
        },
        error: {
            main: '#EF4444',
            light: '#FCA5A5',
            dark: '#DC2626'
        },
        background: {
            default: '#F9FAFB',
            paper: '#FFFFFF'
        },
        text: {
            primary: '#111827',
            secondary: '#6B7280',
            disabled: '#9CA3AF'
        },
        divider: '#E5E7EB',
        action: {
            hover: 'rgba(49, 31, 55, 0.04)',
            selected: 'rgba(31, 41, 55, 0.08)',
            focus: 'rgba(31, 41, 55, 0.1)'
        }
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif'
        ].join(','),
        h5: {
            fontSize: '1.5rem',
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: '-0.015em'
        },
        h6: {
            fontSize: '1.1rem',
            fontWeight: 600,
            lineHeight: 1.4,
            letterSpacing: '-0.01em'
        },
        subtitle1: {
            fontSize: '0.95rem',
            fontWeight: 600,
            lineHeight: 1.4
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 600,
            lineHeight: 1.4
        },
        body1: {
            fontSize: '0.95rem',
            fontWeight: 500,
            lineHeight: 1.5
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 500,
            lineHeight: 1.5
        }
    },
    shape: {
        borderRadius: 12
    },
    spacing: 8,
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow:
                        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        boxShadow:
                            '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        transform: 'translateY(-2px)'
                    }
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '1.25rem',
                    '&:last-child': {
                        paddingBottom: '1.25rem'
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 8,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }
                },
                outlined: {}
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    transition: 'all 0.2s ease'
                }
            }
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    '& .MuiSlider-rail': {
                        opacity: 1
                    },
                    '& .MuiSlider-track': {
                        border: 'none',
                        height: 6
                    },
                    '& .MuiSlider-thumb': {
                        transition: 'all 0.2s ease'
                    },
                    '& .MuiSlider-valueLabel': {
                        borderRadius: 6,
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        padding: '4px 8px'
                    }
                },
                mark: {
                    display: 'none'
                },
                markLabel: {
                    color: 'inherit',
                    '&.MuiSlider-markLabelActive': {
                        color: 'inherit'
                    }
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    marginTop: '0.5rem',
                    marginBottom: '0.5rem'
                }
            }
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {}
            }
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    fontSize: 12,
                    padding: '2px 8px',
                    textTransform: 'none',
                    fontWeight: 500
                }
            }
        }
    }
});

// Use palette-driven values so labels inherit text.secondary
customTheme.components.MuiSlider.styleOverrides.markLabel = {
    color: customTheme.palette.text.secondary,
    '&.MuiSlider-markLabelActive': {
        color: customTheme.palette.text.secondary
    }
};

// Align component overrides to use base palette values
// Typography
customTheme.typography.subtitle2.color = customTheme.palette.text.secondary;
customTheme.typography.body2.color = customTheme.palette.text.secondary;

// Card
customTheme.components.MuiCard.styleOverrides.root.border = `1px solid ${customTheme.palette.divider}`;

// OutlinedInput
customTheme.components.MuiOutlinedInput.styleOverrides.notchedOutline = {
    borderColor: customTheme.palette.divider
};
customTheme.components.MuiOutlinedInput.styleOverrides.root[
    '&:hover .MuiOutlinedInput-notchedOutline'
] = {
    borderColor: customTheme.palette.divider
};
customTheme.components.MuiOutlinedInput.styleOverrides.root[
    '&.Mui-focused .MuiOutlinedInput-notchedOutline'
] = {
    borderColor: customTheme.palette.primary.main,
    boxShadow: `0 0 0 3px ${customTheme.palette.primary.main}1a`
};

// Button(outlined)
customTheme.components.MuiButton.styleOverrides.outlined = {
    borderColor: customTheme.palette.divider,
    '&:hover': {
        borderColor: customTheme.palette.primary.main,
        backgroundColor: customTheme.palette.action.hover
    }
};

// Slider
const sliderRoot = customTheme.components.MuiSlider.styleOverrides.root;
sliderRoot['& .MuiSlider-rail'] = {
    backgroundColor: customTheme.palette.divider,
    opacity: 1
};
sliderRoot['& .MuiSlider-track'] = {
    backgroundColor: customTheme.palette.primary.light,
    border: 'none',
    height: 6
};
sliderRoot['& .MuiSlider-thumb'] = {
    transition: 'all 0.2s ease'
};
sliderRoot['& .MuiSlider-thumb:hover'] = {
    boxShadow: `0 0 0 8px ${customTheme.palette.primary.main}1a`
};
sliderRoot['& .MuiSlider-valueLabel'] = {
    backgroundColor: customTheme.palette.primary.main,
    color: customTheme.palette.primary.contrastText,
    borderRadius: 6,
    fontSize: '0.75rem',
    fontWeight: 500,
    padding: '4px 8px'
};

// Divider
customTheme.components.MuiDivider.styleOverrides.root.borderColor =
    customTheme.palette.divider;

// ToggleButton
customTheme.components.MuiToggleButtonGroup.styleOverrides.root = {
    borderColor: customTheme.palette.divider
};
customTheme.components.MuiToggleButton.styleOverrides.root = {
    ...customTheme.components.MuiToggleButton.styleOverrides.root,
    color: customTheme.palette.text.secondary,
    borderColor: customTheme.palette.divider,
    '&:hover': {
        backgroundColor: customTheme.palette.action.hover,
        borderColor: customTheme.palette.divider
    },
    '&:focus': {
        outline: 'none'
    },
    '&.Mui-selected': {
        color: customTheme.palette.primary.contrastText,
        backgroundColor: customTheme.palette.primary.main,
        borderColor: customTheme.palette.divider,
        '&:hover': {
            backgroundColor: customTheme.palette.primary.dark,
            borderColor: customTheme.palette.divider
        },
        '&:focus': {
            outline: 'none'
        }
    }
};

export default customTheme;
