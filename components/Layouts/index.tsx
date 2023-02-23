import Navbar from './Navbar';

export default function Layouts({ children }) {
	return (
		<section className="flex items-start">
			<Navbar />
			<main className="relative w-full bg-white dark:bg-[#111]">
				{children}
			</main>
		</section>
	);
}
