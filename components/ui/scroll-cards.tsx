"use client";

import { FC } from "react";
import Image from "next/image";

// Types
export interface iCardItem {
	title: string;
	description: string;
	tag: string;
	src: string;
	link: string;
	color: string;
	textColor: string;
}

interface iCardProps extends Omit<iCardItem, "src" | "link" | "tag"> {
	i: number;
	src: string;
}

// Components
const Card: FC<iCardProps> = ({
	title,
	description,
	color,
	textColor,
	i,
	src,
}) => {
	return (
		<div
			className="h-screen flex items-center justify-center sticky top-0 md:p-0 px-4"
			style={{ zIndex: i + 1 }}
		>
			<div
				className="relative flex flex-col h-[300px] md:h-[500px] w-full max-w-[1100px] 
				items-stretch mx-auto shadow-2xl rounded-xl overflow-hidden"
			>
				{/* Full Image */}
				<div className="relative w-full h-full overflow-hidden" style={{ backgroundColor: '#000000' }}>
					<Image
						className="w-full h-full object-cover"
						src={src}
						alt={title}
						fill
						sizes="(max-width: 1100px) 100vw, 1100px"
						quality={92}
						priority={i === 0}
					/>
				</div>
			</div>
		</div>
	);
};

/**
 * CardSlide component displays a series of cards in a vertical scroll layout
 * Each card contains a title, description, and decorative elements
 */
interface iCardSlideProps {
	items: iCardItem[];
}

const CardsParallax: FC<iCardSlideProps> = ({ items }) => {
	return (
		<div className="relative">
			{items.map((project, i) => {
				return <Card key={`p_${i}`} {...project} i={i} />;
			})}
		</div>
	);
};

export { CardsParallax };

