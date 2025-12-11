import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1F2937', // Deep charcoal
            light: '#374151',
            dark: '#111827',
            contrastText: '#fff'
        },
        secondary: {
            main: '#06B6D4', // Vibrant cyan
            light: '#22D3EE',
            dark: '#0891B2',
            contrastText: '#fff'
        },
        success: {
            main: '#10B981', // Emerald green
            light: '#6EE7B7',
            dark: '#059669'
        },
        warning: {
            main: '#F59E0B', // Amber
            light: '#FBBF24',
            dark: '#D97706'
        },
        error: {
            main: '#EF4444', // Red
            light: '#FCA5A5',
            dark: '#DC2626'
        },
        background: {
            default: '#F9FAFB', // Light gray
            paper: '#FFFFFF'
        },
        text: {
            primary: '#111827',
            secondary: '#6B7280',
            disabled: '#9CA3AF'
        },
        divider: '#E5E7EB',
        action: {
            hover: 'rgba(31, 41, 55, 0.04)',
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
            lineHeight: 1.4,
            color: '#6B7280'
        },
        body1: {
            fontSize: '0.95rem',
            fontWeight: 500,
            lineHeight: 1.5
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 500,
            lineHeight: 1.5,
            color: '#6B7280'
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
                    border: '1px solid #E5E7EB',
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
                outlined: {
                    borderColor: '#E5E7EB',
                    '&:hover': {
                        borderColor: '#1F2937',
                        backgroundColor: 'rgba(31, 41, 55, 0.04)'
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    transition: 'all 0.2s ease',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#D1D5DB'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#06B6D4',
                        boxShadow: '0 0 0 3px rgba(6, 182, 212, 0.1)'
                    }
                },
                notchedOutline: {
                    borderColor: '#E5E7EB'
                }
            }
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    '& .MuiSlider-rail': {
                        backgroundColor: '#E5E7EB',
                        opacity: 1
                    },
                    '& .MuiSlider-track': {
                        backgroundColor: '#06B6D4',
                        border: 'none',
                        height: 6
                    },
                    '& .MuiSlider-thumb': {
                        backgroundColor: '#06B6D4',
                        boxShadow: '0 2px 8px rgba(6, 182, 212, 0.4)',
                        transition: 'all 0.2s ease',
                        '&:hover, &.Mui-focusVisible': {
                            boxShadow: '0 4px 16px rgba(6, 182, 212, 0.6)'
                        }
                    },
                    '& .MuiSlider-valueLabelCircle': {
                        backgroundColor: '#1F2937'
                    },
                    '& .MuiSlider-valueLabel': {
                        borderRadius: 6,
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        backgroundColor: '#1F2937',
                        color: '#FFFFFF',
                        padding: '4px 8px'
                    }
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: '#E5E7EB',
                    marginTop: '0.5rem',
                    marginBottom: '0.5rem'
                }
            }
        },
        MuiBox: {
            styleOverrides: {
                root: {
                    transition: 'all 0.2s ease'
                }
            }
        }
    }
});

export default customTheme;
