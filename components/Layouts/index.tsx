import Navbar from './Navbar';

export default function Layouts({ children }) {
	return (
		<section>
			<Navbar />
			<main>{children}</main>
		</section>
	);
}
