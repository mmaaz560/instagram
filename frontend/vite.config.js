import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

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