import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.js',
                'resources/leaflet/leaflet.css',
                'resources/leaflet/leaflet-src.js',
                'resources/js/map.js',
                'resources/js/admin.js'
            ],
            refresh: true,
        }),
    ],
});
