import Navbar from './Navbar';

export default function Layouts({ children }) {
	return (
		<div>
			<Navbar />
			<main>{children}</main>
		</div>
	);
}
