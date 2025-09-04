export default function Hero({
	children,
	title,
	className,
	description,
}: {
	children: React.ReactNode;
	title: string;
	className?: string;
	description: string;
}) {
	return (
		<div className={`flex flex-col gap-4 w-full p-6 border rounded-2xl ${className}`}>
			<div className="flex flex-col gap-2">
				<h1 className="text-xl font-bold">{title}</h1>
				<p className="text-gray-500">{description}</p>
			</div>
			{children}
		</div>
	);
}
