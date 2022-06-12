import Link from "next/link";

function HomePage() {
	return (
		<>
			<h1>Home Page</h1>
			<Link href="/products">Products</Link><br/>
			<Link href="/user-profile">User Profile</Link><br/>
			<Link href="/last-sales">Latest Sales</Link><br/>
		</>
	);
}

export default HomePage;