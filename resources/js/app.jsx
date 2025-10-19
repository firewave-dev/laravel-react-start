import '@mantine/core/styles.css';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

import { createTheme, MantineProvider } from '@mantine/core';
import { LanguageProvider } from './contexts/LanguageContext';

const theme = createTheme({
  /** Your theme override here */
});

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.jsx`,
            import.meta.glob('./pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <LanguageProvider>
                <MantineProvider theme={theme}>
                    <App {...props} />
                </MantineProvider>
            </LanguageProvider>
        )
    },
    progress: {
        color: '#4B5563',
    },
});

