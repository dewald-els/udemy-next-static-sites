import path from "path";
import fs from "fs/promises";
import Link from "next/link";

function ProductsPage(props) {
	const { products } = props;

	return (
		<ul>
			{products.map(p => <li key={p.id}>
				<Link href={`/products/${p.id}`}>{p.name}</Link>
			</li>)}
		</ul>
	);
}

export default ProductsPage;

export async function getStaticProps(context) {
	console.log(context);
	console.log("Regenerating...");
	const filePath = path.join(process.cwd(), "data", "mock-data.json");
	console.log(filePath);
	const data = await fs.readFile(filePath);
	const text = data.toString("utf-8");
	const { products } = JSON.parse(text);

	return {
		revalidate: 10,
		// notFound: true, <- Show 404 page
		// redirect: "", <- Perhaps no data found?
		props: {
			products,
		},
	};
}