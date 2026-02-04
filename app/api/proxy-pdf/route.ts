import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const externalUrl = searchParams.get('url');

    if (!externalUrl) {
        return NextResponse.json({ error: 'URL parameter is missing' }, { status: 400 });
    }

    try {
        const response = await fetch(externalUrl);

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to fetch external resource: ${response.statusText}` },
                { status: response.status }
            );
        }

        // Get content type from the original response
        const contentType = response.headers.get('content-type') || 'application/octet-stream';

        // Return the blob directly
        return new NextResponse(response.body, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
            },
        });

    } catch (error: any) {
        console.error('Proxy PDF error:', error);
        return NextResponse.json({ error: 'Internal server error while proxying PDF', details: error.message }, { status: 500 });
    }
};