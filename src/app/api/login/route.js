import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
    try {
        const { username, password } = await request.json();
        const filePath = path.join(process.cwd(), 'src/data/Customers.json');
        const fileContent = await fs.readFile(filePath, 'utf8');
        const customers = JSON.parse(fileContent);

        const customer = customers.find(c => c.CUSTOMER_ID === String(username) && c.CUSTOMER_CODE === password);

        if (customer) {
            return NextResponse.json({
                success: true,
                customer: {
                    id: customer.CUSTOMER_ID,
                    code: customer.CUSTOMER_CODE,
                    name: customer.CUSTOMER_NAME,
                    email: customer.CONTACT_MAIL_ID
                }
            });
        } else {
            return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
        }
    } catch (error) {
        console.error('[API Login POST] Login error:', {
            message: error.message,
            stack: error.stack
        });
        return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
    }
}
