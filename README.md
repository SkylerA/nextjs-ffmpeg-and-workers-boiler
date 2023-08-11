# ffmpeg/worker setup
> **_NOTE:_**  This is my experimentation with working around CORS issues when using ffmpeg.wasm and web workers. This approach might not be ideal.
> 
> **_NOTE:_**  This was written when ffmpeg.wasm was at version 0.11.6, it has since had a major update with some changes in how you use it so this boilerplate might not work with the new version.
- Install FFmpeg.wasm
    - `npm install @ffmpeg/ffmpeg @ffmpeg/core`
- enable CORS so FFMPEG can use SharedBuffer
    
    Add the following to the nextConfig object in next.config.js
    ```
    async headers() {
        return [
        {
            source: "/",
            headers: [
            {
                key: "Cross-Origin-Embedder-Policy",
                value: "require-corp",
            },
            {
                key: "Cross-Origin-Opener-Policy",
                value: "same-origin",
            },
            ],
        },
        ];
    },
    ```
- Put your worker (example.worker.js) file in public
- Create an api path that will serve the file from public when requested. This will resolve CORS issues when creating the worker.
  
  Create `pages/api/<some_name>.js`
   ```
    import fs from "fs";
    import path from "path";
    import { NextApiResponse } from "next";

    export default async function handler(req, res) {
    const filePath = path.join(process.cwd(), "public", "example.worker.js");
    const fileContent = fs.readFileSync(filePath, "utf-8");

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/javascript");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");

    res.status(200).send(fileContent);
    }
    ```
- See useEffect in index.tsx for bootstrap of worker and ffmpeg
- No visual feedback on the page, check console for ffmpeg loaded and worker messages


# Regular Next.js Docs Below

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
