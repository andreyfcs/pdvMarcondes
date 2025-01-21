import { NextResponse } from 'next/server';
import db from '../../lib/db'; 

export async function GET (req) {
    try {
        const [saleItems] = await db.query('SELECT * FROM sale_items');
        return NextResponse.json(saleItems, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Erro ao buscar venda', error: error.message },
            { status: 500 }
        );
    } }

export async function POST(req) {
    try {
        const body = await req.json();
        let { sale, product, quantity, price, subtotal = 0 } = body;
        if ( sale || product || quantity || price || subtotal === null) {
        return NextResponse.json (
            { message: 'Campos Obrigatorios estão faltando'},
            { status: 400 }
        );
    }

    } catch (error) {   
        return NextResponse.json(

        )
    } }
    

