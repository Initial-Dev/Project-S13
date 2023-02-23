import Navbar from './Navbar';

export default function Layouts({ children }) {
	return (
		<div className="bg-white dark:bg-dark">
			<Navbar />
			<main>{children}</main>
		</div>
	);
}
