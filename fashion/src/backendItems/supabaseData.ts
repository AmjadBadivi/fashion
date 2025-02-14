import { supabase } from "./supabaseBackend";


async function fetchItems() {

    let { data, error } = await supabase
        .from('fashions')
        .select('*')


    if (error) {
        throw new Error('Error fetching Items');

    }

    return data

}


export default fetchItems