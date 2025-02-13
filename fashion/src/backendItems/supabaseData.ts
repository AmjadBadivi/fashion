import { supabase } from "./supabaseBackend";


async function fetchItems() {

    let { data, error } = await supabase
        .from('fashions')
        .select('*')


    if (error) {
        console.error('Error fetching users:', error);
        return;
    }

    return data

}


export default fetchItems