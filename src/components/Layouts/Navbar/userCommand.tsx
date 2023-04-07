import { Dialog, Transition } from '@headlessui/react';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import { Fragment, useState } from 'react';

export default function UserCommand() {
	const { data: session } = useSession();
	const [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	return (
		<>
			{session?.user && (
				<>
					{session.user.image && (
						<>
							<button
								style={{
									backgroundImage: `url('${session.user.image}')`,
								}}
								className="rounded-full float-left h-7 w-7 bg-white bg-cover bg-no-repeat"
								type="button"
								onClick={openModal}
							/>
							<Transition appear show={isOpen} as={Fragment}>
								<Dialog
									as="div"
									className="relative z-10"
									onClose={closeModal}
								>
									<Transition.Child
										as={Fragment}
										enter="ease-out duration-300"
										enterFrom="opacity-0"
										enterTo="opacity-100"
										leave="ease-in duration-200"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<div className="fixed inset-0 bg-black bg-opacity-25" />
									</Transition.Child>
									<div className="fixed inset-0 overflow-y-auto">
										<div className="flex min-h-full items-center justify-center p-4 text-center">
											<Transition.Child
												as={Fragment}
												enter="ease-out duration-300"
												enterFrom="opacity-0 scale-95"
												enterTo="opacity-100 scale-100"
												leave="ease-in duration-200"
												leaveFrom="opacity-100 scale-100"
												leaveTo="opacity-0 scale-95"
											>
												<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-light dark:bg-dark p-6 text-left align-middle shadow-xl transition-all">
													<Dialog.Title
														as="h3"
														className="text-lg font-medium leading-6 text-dark dark:text-light"
													>
														<strong className="text-dark dark:text-light">
															{session.user
																.email ??
																session.user
																	.name}
														</strong>
													</Dialog.Title>
													<div className="mt-2">
														<p className="text-sm text-dark/60 dark:text-light/60">
															Voulez vous vous
															deconnecter ?
														</p>
													</div>

													<div className="mt-4">
														<button
															type="button"
															className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-light hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
															onClick={(e: {
																preventDefault: () => void;
															}) => {
																e.preventDefault();
																signOut();
															}}
														>
															Deconnexion
														</button>
													</div>
												</Dialog.Panel>
											</Transition.Child>
										</div>
									</div>
								</Dialog>
							</Transition>
						</>
					)}
				</>
			)}
		</>
	);
}
