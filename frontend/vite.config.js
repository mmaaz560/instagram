import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy' // <-- 1. Yeh import sabse upar add kiya hai

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        legacy({ // <-- YEH NAYA BLOCK ADD KAREIN
            targets: ['defaults', 'not IE 11']
        })
    ]
})