function UserProfilePage(props) {
	const { username } = props;

	return (
		<section>
			<h1>Profile of {username}</h1>
		</section>
	);
}

export default UserProfilePage;

export async function getServerSideProps(context) {

	const { params, req, res } = context;

	return {
		// same properties as getStaticProps: notFound, redirect
		props: {
			username: "MrBeta",
		},
	};
}