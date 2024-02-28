import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { isObjectEmpty } from '../../../utils/helpers';
import Button from '../../Atoms/Button/Button';
import FormInput from '../../Molecules/FormInput/FormInput';

const ContactDataForm = () => {
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        trigger,
    } = useFormContext();

    const handleClick = async () => {
        const isValid = await trigger();
        if (isValid) {
            navigate('/add-user/register');
        }
    };
    return (
        <>
            <FormInput
                label='Miasto'
                name='city'
                type='text'
                placeholder='Podaj miasto'
                register={register}
                required={true}
                error={errors.city}
            />

            <div className='flex justify-between gap-x-8'>
                <FormInput
                    label='Ulica'
                    name='street'
                    type='text'
                    placeholder='Podaj ulicę'
                    register={register}
                    required={true}
                    error={errors.street}
                />

                <FormInput
                    label='Numer budynku'
                    name='houseNumber'
                    type='number'
                    placeholder='Podaj numer budynku'
                    register={register}
                    required={true}
                    error={errors.houseNumber}
                />
            </div>

            <div className='flex justify-between gap-x-8'>
                <FormInput
                    label='Nr. mieszkania'
                    name='apartmentNumber'
                    type='number'
                    placeholder='Podaj numer mieszkania'
                    register={register}
                    required={true}
                    error={errors.apartmentNumber}
                />
                <FormInput
                    label='Telefon'
                    name='phoneNumber'
                    type='number'
                    placeholder='Podaj telefon'
                    register={register}
                    required={true}
                    error={errors.phoneNumber}
                />
            </div>
            <Button
                type='button'
                onClick={() => handleClick()}
                variant={isObjectEmpty(errors) ? 'success' : 'disabled'}
                className='mt-8'
            >
                Dalej
            </Button>
        </>
    );
};

export default ContactDataForm;
