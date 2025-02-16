import { supabase } from "./supabaseBackend";


async function fetchItems({ itemsInfo }: { itemsInfo: string }) {

    // let itemData: string = "";
    // if (itemsInfo === "allData") {
    //     itemData = "fashions";
    // } else if (itemsInfo === "men") {
    //     itemData = "men";
    // } else if (itemsInfo === "women") {
    //     itemData = "women";
    // } else {
    //     console.error("Invalid itemsInfo provided:", itemsInfo);
    //     throw new Error("Invalid itemsInfo provided");
    // }


    let { data, error } = await supabase
        .from(itemsInfo)
        .select('*')


    if (error) {
        throw new Error('Error fetching Items');

    }

    return data

}


export default fetchItems