import path from "path";
import fs from "fs/promises";

function ProductDetailPage(props) {

	const { product } = props;

	if (!product) { // Especially required when fallback set to true
		return <p>Loading product...</p>;
	}

	return (<>
		<h1>{product.name}</h1>
		<p>{product.description}</p>
	</>);
}

async function fetchProducts() {
	try {
		const filePath = path.join(process.cwd(), "data", "mock-data.json");
		const data = await fs.readFile(filePath);

		const text = data.toString("utf-8");
		const { products } = JSON.parse(text);

		console.log(products);
		return Promise.resolve({
			products, error: null,
		});
	} catch (e) {
		return Promise.reject({
			error: e.message, products: null,
		});
	}
}

export async function getStaticPaths() {

	const { products, error } = await fetchProducts();
	const ids = products.map(p => p.id);
	const paths = ids.map(id => ({ params: { product_id: id.toString() } }));
	return {
		// fallback: true -  Pre-render only SOME pages. Other pages are generated JIT. (Remember to check if product exists in Component).
		// fallback: "blocking" - Block the render until the product is loaded.
		// fallback: "false" - All routes are generated.
		fallback: true,
		paths,
	};
}

export async function getStaticProps(context) {

	const { params } = context;
	const { product_id } = params;

	const { products, error } = await fetchProducts();
	const product = products.find(p => p.id === Number(product_id));

	return {
		notFound: error !== null || !product, props: {
			product,
		},
	};
}

export default ProductDetailPage;