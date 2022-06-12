import { fetchLastSales, mapLastSales, useLastSales } from "../api/sales";

function LastSalesPage(props) {

	console.log("PROPS: ", props);

	const { sales, error } = useLastSales(props.sales);

	if (error) {
		return <p>Error: {error}</p>;
	}

	if (!sales) {
		return <p>Loading data</p>;
	}

	return (
		<div>
			<h1>Last Sales</h1>
			<ul>
				{sales.map((sale, idx) => <li key={idx}>{sale.username} -- QTY: {sale.volume}</li>)}
			</ul>
		</div>
	);
}

export async function getStaticProps() {

	try {
		const sales = await fetchLastSales("<Firebase-RT-Databse-URL.json>");
		return {
			revalidate: 10,
			props: {
				sales: mapLastSales(sales),
			},
		};
	} catch (e) {
		console.log(e);
		return {
			props: {
				error: e.message,
			},
			redirect: {
				destination: "/"
			}
		};
	}

}

export default LastSalesPage;