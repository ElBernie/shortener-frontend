import ShorteningInput from '@/components/ShorteningInput';
import style from './style.module.scss';
const CreatePage = () => {
	return (
		<>
			<h1>Add a link</h1>
			<div className={style.shortenerContainer}>
				<ShorteningInput />
			</div>
		</>
	);
};

export default CreatePage;
