// src/components/layout/DashboardLayout.jsx

import { useState, useRef, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    IconButton,
    useTheme
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import Header from './Header';
import FilterPanel from './InputPanel';
import Results from './Results';

export default function DashboardLayout() {
    const theme = useTheme();
    const [showFilters, setShowFilters] = useState(true);
    const resultsPaperRef = useRef(null);
    const [resultsFull, setResultsFull] = useState(false);

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
            <Box sx={{ p: theme.spacing(3) }}>
                <Header />
            </Box>

            {/* Small "Filters" button when the panel is hidden */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    px: theme.spacing(4)
                }}
            >
                {!showFilters && (
                    <IconButton
                        onClick={handleToggleFilters}
                        size="small"
                        aria-label="Show filters"
                    >
                        <TuneIcon />
                    </IconButton>
                )}
            </Box>

            <Box
                sx={{
                    mx: 'auto',
                    px: theme.spacing(4),
                    maxWidth: showFilters ? 1420 : 1000 // 420 filter + 1000 results
                }}
            >
                <Grid container spacing={2}>
                    {showFilters && (
                        <Grid
                            item
                            xs={12}
                            md="auto"
                            sx={{
                                width: { xs: '100%', md: 420 },
                                maxWidth: { xs: '100%', md: 420 },
                                flexShrink: 0
                            }}
                        >
                            <Paper
                                elevation={12}
                                sx={{
                                    p: 2,
                                    boxSizing: 'border-box'
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
                                    <Typography variant="h5">
                                        Input Panel
                                    </Typography>
                                    <IconButton
                                        size="small"
                                        onClick={handleToggleFilters}
                                        aria-label="Hide filters"
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Box>

                                <FilterPanel />
                            </Paper>
                        </Grid>
                    )}

                    <Grid
                        item
                        xs={12}
                        md
                        sx={{
                            flexGrow: 1,
                            minWidth: 0,
                            maxWidth: 1000
                        }}
                    >
                        <Paper
                            ref={resultsPaperRef}
                            elevation={2}
                            sx={{
                                p: 2,
                                height: resultsFull ? '100vh' : '100%',
                                boxSizing: 'border-box',
                                transition: 'all 200ms ease'
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
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
