export default function InfoKeyboard() {
	return (
		<div className="pointer-events-none fixed inset-x-0 bottom-0 px-4 pb-4">
			<div className="pointer-events-auto ml-auto max-w-xl rounded-xl bg-white p-6 ring-1 ring-gray-900/10">
				<p className="text-sm leading-6 text-gray-900">
					description avec les images de touches du clavier
					<a href="#" className="font-semibold text-indigo-600">
						Titre de l'info
					</a>
					.
				</p>
				<div className="mt-4 flex items-center gap-x-5">
					<button
						type="button"
						className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
					>
						J'ai compris
					</button>
				</div>
			</div>
		</div>
	);
}
