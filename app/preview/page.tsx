import ClientPreview from "./ClientPreview";

interface PageProps {
    searchParams: Promise<{
        url?: string;
        title?: string;
    }>;
}

// server component simply forwards query to the client-side preview
export default async function Page({ searchParams }: PageProps) {
    const { url, title } = await searchParams;
    return <ClientPreview url={url} title={title} />;
}
