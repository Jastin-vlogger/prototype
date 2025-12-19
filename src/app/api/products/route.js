import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const skip = (page - 1) * limit;

    try {
        const filePath = path.join(process.cwd(), 'src/data/Product.json');
        const fileContent = await fs.readFile(filePath, 'utf8');
        const products = JSON.parse(fileContent);

        const paginatedProducts = products.slice(skip, skip + limit);

        return NextResponse.json({
            products: paginatedProducts,
            total: products.length,
            page,
            limit,
            totalPages: Math.ceil(products.length / limit)
        });
    } catch (error) {
        console.error('[API Products GET] Error fetching products:', {
            message: error.message,
            stack: error.stack
        });
        return NextResponse.json({ error: 'Failed to fetch products', details: error.message }, { status: 500 });
    }
}
