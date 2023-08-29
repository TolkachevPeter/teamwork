import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { ButtonsProps } from '@/components/ui/button/button';
import { Modal, ModalProps } from '@/components/modal/modal';
import { updateAvatarSchema } from '@/core/validator';
import { Form } from '@/components/ui/form/form';
import { updateAvatar } from '@/store/auth/auth-slice';
import { InputsProps } from '@/components/ui/input/input';

const submitButton: ButtonsProps[] = [
	{
		name: 'update',
		children: 'Update',
	},
];

const avatarInputs: InputsProps[] = [
	{
		name: 'avatar',
		type: 'file',
		label: 'New Avatar',
		placeholder: '',
	},
];

type UpdateAvatarModalProps = Omit<ModalProps, 'children'>;

export const UpdateAvatarModal = (props: UpdateAvatarModalProps) => {
	const dispatch: AppDispatch = useDispatch();

	const onSubmit = async (data: unknown) => {
		props.toggle();
		await dispatch(updateAvatar(data as FormData)).unwrap();
	};

	return (
		<Modal isOpen={props.isOpen} toggle={props.toggle}>
			<Form
				name={'updatePassword'}
				title={'Update password'}
				inputs={avatarInputs}
				validationSchema={updateAvatarSchema}
				buttons={submitButton}
				callback={onSubmit}
				type="formData"
			/>
		</Modal>
	);
};