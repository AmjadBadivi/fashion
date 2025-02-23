import { supabase } from "./supabaseBackend";
import { QueryClient } from "@tanstack/react-query";

type Pay = {
    cardholderName: string,
    cardNumber: string,
    month: string,
    year: string,
    cvv: string,
}

export const queryClient = new QueryClient()

async function fetchItems({ itemsInfo }: { itemsInfo: string }) {

    let { data, error } = await supabase
        .from(itemsInfo)
        .select('*')
    if (error) {
        throw new Error('Error fetching Items');

    }
    return data

}

export async function sendPayment(x: Pay) {

    const { data, error } = await supabase.from('payment').insert([
        {
            ...x
        },
    ]);

    if (error) {
        throw new Error(error.message);
    }

    return { success: true, data };
}


export default fetchItems