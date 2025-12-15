// src/components/layout/DashboardLayout.jsx

import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Paper, IconButton, useTheme } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import Header from './Header';
import FilterPanel from './InputPanel';
import Results from './Results';

export default function DashboardLayout() {
    const theme = useTheme();
    const resultsPaperRef = useRef(null);
    const [resultsFull, setResultsFull] = useState(false);
    const [showFilters, setShowFilters] = useState(true);

    useEffect(() => {
        function onFullChange() {
            const el =
                document.fullscreenElement || document.webkitFullscreenElement;
            setResultsFull(el === resultsPaperRef.current);
        }

        document.addEventListener('fullscreenchange', onFullChange);
        document.addEventListener('webkitfullscreenchange', onFullChange);
        return () => {
            document.removeEventListener('fullscreenchange', onFullChange);
            document.removeEventListener(
                'webkitfullscreenchange',
                onFullChange
            );
        };
    }, []);

    const handleToggleFilters = () => {
        setShowFilters((prev) => !prev);
    };

    const collapsedFilterWidth = 64;
    const filterPanelWidth = showFilters ? 420 : collapsedFilterWidth;

    return (
        <Box
            borderRight="5px solid"
            borderColor="divider"
            sx={{
                flexGrow: 1,
                minHeight: '100vh',
                minWidth: 360,
                width: '100vw',
                boxSizing: 'border-box',
                bgcolor: 'background.default'
            }}
        >
            <Box sx={{ p: theme.spacing(2) }}>
                <Header />
            </Box>

            <Box
                sx={{
                    mx: 'auto',
                    px: {
                        xs: theme.spacing(2),
                        md: theme.spacing(4)
                    },
                    maxWidth: {
                        xs: '100%',
                        md: 1000 + filterPanelWidth
                    },
                    pb: theme.spacing(4),
                    width: '100%',
                    boxSizing: 'border-box'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: theme.spacing(2),
                        alignItems: {
                            xs: 'stretch',
                            md: showFilters ? 'stretch' : 'flex-start'
                        },
                        justifyContent: {
                            xs: 'stretch',
                            md: showFilters ? 'stretch' : 'center'
                        }
                    }}
                >
                    <Box
                        sx={{
                            width: {
                                xs: showFilters ? '100%' : collapsedFilterWidth,
                                md: filterPanelWidth
                            },
                            maxWidth: {
                                xs: showFilters ? '100%' : collapsedFilterWidth,
                                md: filterPanelWidth
                            },
                            flexShrink: 0,
                            display: 'flex',
                            justifyContent: { xs: 'center', md: 'flex-start' },
                            alignSelf: {
                                xs: showFilters ? 'stretch' : 'flex-start',
                                md: showFilters ? 'stretch' : 'flex-start'
                            }
                        }}
                    >
                        <Paper
                            elevation={12}
                            sx={{
                                p: showFilters ? 2 : 0,
                                boxSizing: 'border-box',
                                overflow: 'hidden',
                                width: {
                                    xs: showFilters
                                        ? '100%'
                                        : collapsedFilterWidth,
                                    md: '100%'
                                },
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: showFilters ? 'stretch' : 'center',
                                justifyContent: showFilters
                                    ? 'flex-start'
                                    : 'center',
                                gap: showFilters ? 2 : 0,
                                minHeight: showFilters
                                    ? 'auto'
                                    : collapsedFilterWidth,
                                height: {
                                    xs: 'auto',
                                    md: showFilters
                                        ? '100%'
                                        : collapsedFilterWidth
                                },
                                flexGrow: showFilters ? 1 : 0
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: showFilters
                                        ? 'space-between'
                                        : 'center',
                                    width: '100%',
                                    minHeight: showFilters
                                        ? 32
                                        : collapsedFilterWidth,
                                    height: showFilters
                                        ? 'auto'
                                        : collapsedFilterWidth,
                                    gap: showFilters ? 1 : 0
                                }}
                            >
                                {showFilters && (
                                    <Typography
                                        variant="h5"
                                        sx={{ whiteSpace: 'nowrap', pr: 1 }}
                                    >
                                        Input Panel
                                    </Typography>
                                )}
                                <IconButton
                                    size="small"
                                    onClick={handleToggleFilters}
                                    aria-label={
                                        showFilters
                                            ? 'Hide filters'
                                            : 'Show filters'
                                    }
                                >
                                    {showFilters ? (
                                        <CloseIcon fontSize="small" />
                                    ) : (
                                        <TuneIcon fontSize="small" />
                                    )}
                                </IconButton>
                            </Box>
                            {showFilters && (
                                <Box sx={{ mt: 2, height: '100%' }}>
                                    <FilterPanel />
                                </Box>
                            )}
                        </Paper>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            minWidth: 0,
                            maxWidth: {
                                xs: '100%',
                                md: 1000
                            },
                            width: '100%',
                            display: 'flex',
                            alignSelf: 'stretch'
                        }}
                    >
                        <Paper
                            ref={resultsPaperRef}
                            elevation={2}
                            sx={{
                                p: 2,
                                height: resultsFull ? '100vh' : '100%',
                                boxSizing: 'border-box',
                                transition: 'all 200ms ease',
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    mb: 2
                                }}
                            >
                                <Typography variant="h5">Results</Typography>
                                <IconButton
                                    size="small"
                                    aria-label={
                                        resultsFull
                                            ? 'Exit fullscreen'
                                            : 'Open results fullscreen'
                                    }
                                    onClick={async () => {
                                        try {
                                            if (!resultsFull) {
                                                if (
                                                    resultsPaperRef.current
                                                        ?.requestFullscreen
                                                ) {
                                                    await resultsPaperRef.current.requestFullscreen();
                                                } else if (
                                                    resultsPaperRef.current
                                                        ?.webkitRequestFullscreen
                                                ) {
                                                    // Safari
                                                    resultsPaperRef.current.webkitRequestFullscreen();
                                                }
                                            } else {
                                                if (
                                                    document.fullscreenElement
                                                ) {
                                                    await document.exitFullscreen();
                                                } else if (
                                                    document.webkitFullscreenElement
                                                ) {
                                                    document.webkitExitFullscreen();
                                                }
                                            }
                                        } catch (err) {
                                            console.warn(
                                                'Fullscreen toggle failed',
                                                err
                                            );
                                        }
                                    }}
                                >
                                    {resultsFull ? (
                                        <FullscreenExitIcon />
                                    ) : (
                                        <FullscreenIcon />
                                    )}
                                </IconButton>
                            </Box>

                            <Results />
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
