import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const ORDERS_FILE = path.join(process.cwd(), 'src/data/Orders.json');

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');

    try {
        const fileContent = await fs.readFile(ORDERS_FILE, 'utf8');
        let orders = JSON.parse(fileContent);

        if (customerId) {
            orders = orders.filter(o => o.customerId === customerId);
        }

        return NextResponse.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { customerId, items, total, date } = body;

        const fileContent = await fs.readFile(ORDERS_FILE, 'utf8');
        const orders = JSON.parse(fileContent);

        const newOrder = {
            id: `ORD-${Date.now()}`,
            ...body,
            date: date || new Date().toISOString(),
            status: 'Processing'
        };

        orders.push(newOrder);

        await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));

        return NextResponse.json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
