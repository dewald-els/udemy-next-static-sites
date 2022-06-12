import useSWR from "swr";
import { useEffect, useState } from "react";

export const  URL = "<Firebase-RT-Databse-URL.json>";

export const fetchLastSales = (...args) => fetch(...args).then(r => r.json());

export const mapLastSales = (sales = []) => sales.filter(Boolean);

/**
 *
 * @returns {{error: string, sales: undefined | []}}
 */
export function useLastSales(initialState) {

	const [sales, setSales] = useState(initialState);
	const { data, error } = useSWR(URL, fetchLastSales);

	useEffect(() => {
		if (!data) {
			return;
		}

		setSales((prev) => mapLastSales(data));

	}, [data]);

	return { sales, error };

}
