export const randomColor = () => {
	const colors = ['#292F36', '#4ECDC4', '#F7FFF7', '#FF6B6B', '#FFE66D'];
	return colors[Math.floor(Math.random() * colors.length)];
};
